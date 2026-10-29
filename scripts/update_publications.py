"""Collect Hannan's publications and add new ones to data/publications.json.

Sources, in order: Google Scholar, ORCID and OpenAlex. Google Scholar has no
official API and often blocks automated requests, so ORCID and OpenAlex are
there as reliable backups. Existing entries are never removed or changed;
only works that are not already in the file are added. Edit the JSON by hand
to fix or hide an entry (set "hidden": true).

Run: python scripts/update_publications.py
"""
import json
import os
import re
import signal
import sys
import urllib.request

SCHOLAR_ID = "uDsLqqAAAAAJ"
ORCID = "0009-0000-9337-7410"
DATA = os.path.join(os.path.dirname(__file__), "..", "data", "publications.json")
TIMEOUT = 30


def key(title):
    """Normalised title used to spot duplicates."""
    return re.sub(r"[^a-z0-9]", "", (title or "").lower())[:80]


def get_json(url):
    req = urllib.request.Request(url, headers={"Accept": "application/json", "User-Agent": "hannanmustajab.github.io publication updater"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return json.load(r)


def from_scholar():
    from scholarly import scholarly  # installed in the workflow

    def stop(*_):
        raise TimeoutError("Google Scholar took too long")

    signal.signal(signal.SIGALRM, stop)
    signal.alarm(180)
    try:
        author = scholarly.fill(scholarly.search_author_id(SCHOLAR_ID), sections=["publications"])
        works = []
        for pub in author.get("publications", []):
            bib = pub.get("bib", {})
            works.append({
                "title": bib.get("title", ""),
                "authors": "",
                "year": int(bib["pub_year"]) if str(bib.get("pub_year", "")).isdigit() else None,
                "venue": bib.get("citation", ""),
                "url": f"https://scholar.google.com/citations?view_op=view_citation&user={SCHOLAR_ID}&citation_for_view={pub.get('author_pub_id', '')}",
                "doi": "",
                "source": "google-scholar",
            })
        return works
    finally:
        signal.alarm(0)


def from_orcid():
    data = get_json(f"https://pub.orcid.org/v3.0/{ORCID}/works")
    works = []
    for group in data.get("group", []):
        s = group["work-summary"][0]
        doi = ""
        for ext in (s.get("external-ids") or {}).get("external-id", []):
            if ext.get("external-id-type") == "doi":
                doi = ext.get("external-id-value", "").lower()
        year = ((s.get("publication-date") or {}).get("year") or {}).get("value")
        works.append({
            "title": ((s.get("title") or {}).get("title") or {}).get("value", ""),
            "authors": "",
            "year": int(year) if year else None,
            "venue": (s.get("journal-title") or {}).get("value", "") if s.get("journal-title") else "",
            "url": f"https://doi.org/{doi}" if doi else ((s.get("url") or {}).get("value", "") if s.get("url") else ""),
            "doi": doi,
            "source": "orcid",
        })
    return works


def from_openalex():
    data = get_json(f"https://api.openalex.org/works?filter=author.orcid:{ORCID}&per-page=100")
    works = []
    for w in data.get("results", []):
        doi = (w.get("doi") or "").replace("https://doi.org/", "").lower()
        source = ((w.get("primary_location") or {}).get("source") or {})
        works.append({
            "title": w.get("title") or "",
            "authors": ", ".join(a["author"]["display_name"] for a in w.get("authorships", [])),
            "year": w.get("publication_year"),
            "venue": source.get("display_name") or "",
            "url": f"https://doi.org/{doi}" if doi else (w.get("id") or ""),
            "doi": doi,
            "source": "openalex",
        })
    return works


def main():
    with open(DATA, encoding="utf8") as f:
        current = json.load(f)
    known_titles = set()
    known_dois = set()
    for p in current:
        known_titles.add(key(p.get("title")))
        for alias in p.get("aliases", []):
            known_titles.add(key(alias))
        if p.get("doi"):
            known_dois.add(p["doi"].lower())

    found = []
    for name, fetch in (("Google Scholar", from_scholar), ("ORCID", from_orcid), ("OpenAlex", from_openalex)):
        try:
            works = fetch()
            print(f"{name}: {len(works)} works")
            found.extend(works)
        except Exception as e:  # one source failing must not stop the others
            print(f"{name}: skipped ({e})", file=sys.stderr)

    added = []
    for w in found:
        k = key(w["title"])
        if not k or k in known_titles or (w["doi"] and w["doi"] in known_dois):
            continue
        known_titles.add(k)
        if w["doi"]:
            known_dois.add(w["doi"])
        added.append(w)

    if not added:
        print("No new publications.")
        return
    for w in added:
        print(f"Adding: {w['year']} {w['title']} ({w['source']})")
    merged = current + added
    merged.sort(key=lambda p: p.get("year") or 0, reverse=True)
    with open(DATA, "w", encoding="utf8") as f:
        json.dump(merged, f, indent=2, ensure_ascii=False)
        f.write("\n")


if __name__ == "__main__":
    main()
