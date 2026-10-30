# Hannan Mustajab — personal website

A responsive static portfolio and research notebook. No build step or package installation is needed.

## Preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` in this directory, then open http://localhost:8000.

## Edit

- `index.html`: homepage. Intro, what I work on, projects, log, papers, contact and office address.
- `project-wave-modelling.html` with `project.js`: the wave modelling and inversion project page (wave slider, results chart, figures).
- `photos.html` with `photos.js`: the photo gallery. To add a photo, put it in `assets/photos/` and add an entry to the `PHOTOS` list at the top of `photos.js`. Filter buttons are made from the tags.
- `publications.html` with `publications.js`: the full publication list, read from `data/publications.json`.
- `site.css`: shared base styles. Most styling is inline, copied from the design canvas.
- `404.html`: shown for old or missing addresses. `beyond-work.html` now forwards to the photos page.

`data/publications.json` holds the full publication list. The GitHub Actions workflow `.github/workflows/update-publications.yml` runs every Monday (or by hand from the Actions tab), runs `scripts/update_publications.py`, and commits any new works it finds on Google Scholar, ORCID or OpenAlex. It only adds works, never removes them. To fix an entry, edit the JSON; to hide one, add `"hidden": true`. Google Scholar often blocks automated requests, so ORCID and OpenAlex act as backups: keeping the ORCID profile up to date makes this most reliable. Scheduled workflows only run on the repository's default branch.

## Search engines

Each page has its own title, description, canonical address, sharing tags and structured data (schema.org Person on the homepage). `sitemap.xml` lists the pages and `robots.txt` points to it. When a page is added, add it to `sitemap.xml`. The share image is `assets/og-image.png` (1200 x 630).

## Design

"Editorial notebook": grid-paper header, big Archivo headlines, highlighter marks, tilted note cards, and a seismogram line. Type is Archivo, Inter and JetBrains Mono. Colours: ink #111111, blue #2443E0, orange #E2491A, note colours #FFF6C7, #DDF0FF, #E4F5E0, #FFE1D8. The project card figures are drawn illustrations, not model output. The source design lives on the Claude design canvas.

Office address (supplied by Naila, October 30, 2026): Kiel University, Institute of Geosciences, Marine and Land Geomechanics and Geotechnics, Hermann-Rodewald-Str. 8, Room 4002, 24118 Kiel, Germany.

Frozen soil project text is based on the owner's "Neural operator for frozen soil" slides (graph neural operator, about 1.5% error on new grain layouts).

BIP dates (online March 27 and May 4, 2026; in Bodø April 13 to 17, 2026): https://www.ffst.unist.hr/_news/46009/Teaching%20and%20Learning%20in%20HE%20for%20PhD%20students.pdf

## Content provenance

Verified September 9, 2026:

- University affiliation, research interests, publication, and research email: https://www.geotechnics.ifg.uni-kiel.de/en/team/abdul-hannan-mustajab-m-sc
- Research interests, public personal contact, ORCID, and repositories: https://github.com/hannanmustajab
- Power monitoring description: https://github.com/hannanmustajab/Power-Monitoring-System
- Vaccine facility monitor: https://github.com/hannanmustajab/VaccineFacilityMonitor
- Degree, Kumva IoT work in East Africa, Ubidots, SEA-EU funded BIP in Norway, and ECCOMAS attendance in Split in 2025: supplied by the owner. The BIP title and location, and ECCOMAS conference dates and topic, have since been checked against the owner’s LinkedIn posts. Case-study outcomes remain to be supplied.
- LinkedIn was accessed through the browser, including the authenticated profile. The About section confirms StructMonitor work and the MSc AI specialization. The public certification section lists the KTH PINN summer school (July 2024). Only professional profile content was used; account analytics were not retained.
- ECCOMAS MSF 2025, June 25–27, Split; PINNs/PirateNets presentation: https://www.linkedin.com/feed/update/urn:li:activity:7346126122931163136/
- BIP title and Bodø location: https://www.linkedin.com/feed/update/urn:li:activity:7449894398756040704/
- NATO SPS workshop presentation, Thessaloniki, 2025: https://www.linkedin.com/feed/update/urn:li:activity:7412158765333950466/

The wave visualization and notebook artwork are illustrative, not experimental output. No client metrics, endorsements, or unpublished scientific results have been invented. Conference presentation descriptions are based on the owner’s linked posts.

## Hosting

The site is published through GitHub Pages from the `main` branch. It has no backend, analytics, or contact form; contact links open the visitor’s email application. Google Fonts is the only remote asset dependency, with local fallback fonts.

## Before publication

Confirm the preferred freelance contact address, supply an initial post and approved project images/outcomes, and confirm the event details. For this commercial-facing site, decide on the appropriate legal notice and privacy content before launch.

## Research-focused structure

The homepage leads with the introduction and research areas, followed by News, Selected publications, Talks and programmes, Projects and notes, and Experience and education. The doctoral role appears under employment responsibilities and under doctoral studies; no unverified employment or degree dates were added.

The owner clarified that their current focus is SciML for PDEs, specifically PINNs for elastic wave equations in concrete NDT and SHM.

Scientific context checked against:
- StructMonitor description: https://www.geotechnics.ifg.uni-kiel.de/en/projects
- Elastic modelling and NDT imaging: https://doi.org/10.1016/j.cemconcomp.2006.02.010
- Elastic FWI for property estimation: https://arxiv.org/abs/1504.08340


## Education and publication sources

Education: owner-provided Hannan_CV_2025.pdf confirms AMU BSc Mathematics with Honours (2018–2021), MSc completion (March 2024), and doctoral studies beginning April 2024. The public LinkedIn education listing confirms MSc years 2021–2024; the start month is not established. The CV remains outside the public site. No personal phone number or referee contact information was copied.

Google Scholar profile reviewed through browser: https://scholar.google.com/citations?user=uDsLqqAAAAAJ&hl=en. Nine records were listed. The 2024 arXiv version is consolidated with its journal article; the abbreviated PirateNet record is consolidated with the complete 2026 chapter. Seven distinct works are represented, including the featured journal paper, two talks, and thesis metadata.

Published highlight values: Mustajab et al. (2024), Applied Sciences 14(8), 3204, DOI https://doi.org/10.3390/app14083204. Table 1: relative L2 error at oscillator parameter omega=40 is 0.037% (transfer) versus 0.80% (Adam). Section 3.2 / Figure 9g: wave c=1.5, loss order 1e-5 at 600 versus 1,000 epochs. Section 3.2: c=1 baseline relative L2 error 0.05%. These are numerical benchmarks, not measured concrete NDT results. Publisher PDF: https://mdpi-res.com/d_attachment/applsci/applsci-14-03204/article_deploy/applsci-14-03204.pdf?version=1712808195

Additional publication metadata checked with Springer’s ICIACS 2026 Volume 2 contents, the Sensors article record (DOI 10.3390/s23115210), the Research Square DOI record listed by Sciety (10.21203/rs.3.rs-8006794/v1), and the university profile. The preprint is not labelled peer-reviewed.

The publications page also includes the owner's submitted manuscript, *Adaptive Physics-Informed Neural Networks for Elastic Wave Propagation in Heterogeneous Media* (October 2026). The page presents a small selection of numerical benchmark results from the supplied final manuscript: 1.67% time-averaged relative L2 error for PirateNet 3 × 128 on the filtered Marmousi2 crop, versus 20.71% for Vanilla and 18.25% for Fourier-feature PINNs; 0.40% on the six-layer benchmark for PirateNet 2 × 128 versus 4.12% and 5.50%; and 3.0% relative L2 error at the end of the Marmousi2 interval versus 45% and 35%. Figures 12 and 13 from the owner-supplied manuscript are included as web-sized images. This is a submitted manuscript, not a published or peer-reviewed article; the older Research Square DOI remains an earlier preprint link.

The thesis and its presentation are now represented on the publications page. Thesis highlights include a 4.50% L2 relative error in the best homogeneous setup, 17.7% in the best reported layered-velocity setup, and a presentation-reported approximately 10-hour 2+1D layered-model run on an RTX 4090. The thesis also documents that boundary treatment, source placement, model width, point allocation, and smoothing of velocity transitions materially affected convergence. The presentation describes the same progression from a damped oscillator to 1D and 2+1D wave equations, including temporal loss weighting and transfer learning. These values are thesis benchmarks, not field measurements or validated concrete damage-localization accuracy.


The professional portrait is sourced from the owner's official Kiel University profile and resized for the web: https://www.geotechnics.ifg.uni-kiel.de/en/team/abdul-hannan-mustajab-m-sc/hannan-1
No institutional endorsement is claimed.
