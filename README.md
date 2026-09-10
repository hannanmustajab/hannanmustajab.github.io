# Hannan Mustajab — personal website

A responsive static portfolio and research notebook. No build step or package installation is needed.

## Preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` in this directory, then open http://localhost:8000.

## Edit

- `index.html`: biography, project cards, notebook previews, and contact links.
- `beyond-work.html`: personal notes about travel and time outdoors.
- `app.js`: the research-note dialog and illustrative wave animation.
- `styles.css`: responsive layout, typography, and colors.

The current notebook entry is explicitly a draft outline, not a published post or measured result. Edit both the preview in `index.html` and its corresponding entry in `app.js` when publishing it. A Markdown publishing system with individual article URLs and RSS is a useful next step once the first real posts are ready.

## Content provenance

Verified September 9, 2026:

- University affiliation, research interests, publication, and research email: https://www.geotechnics.ifg.uni-kiel.de/en/team/abdul-hannan-mustajab-m-sc
- Research interests, public personal contact, ORCID, and repositories: https://github.com/hannanmustajab
- Power monitoring description: https://github.com/hannanmustajab/Power-Monitoring-System
- Vaccine facility monitor: https://github.com/hannanmustajab/VaccineFacilityMonitor
- Degree, Kumva IoT work in East Africa, Ubidots, SEA-EU funded BIP in Norway, and ECCOMAS attendance in Split in 2025: supplied by the owner. The BIP title and location, and ECCOMAS conference dates and topic, have since been checked against the owner’s LinkedIn posts. Exact BIP dates and case-study outcomes remain to be supplied.
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

The homepage now leads with About and current research, followed by Notebook, Selected Projects, Work Experience, Education, and Talks & Programmes. The doctoral role appears under employment responsibilities and under doctoral studies; no unverified employment or degree dates were added.

The owner clarified that their current focus is SciML for PDEs, specifically PINNs for elastic wave equations in concrete NDT and SHM. The inline SVG illustrates measurement, physics-informed modelling, and iterative FWI. It is a conceptual diagram, not a numerical simulation or reconstruction. The animated concrete inspection hero is conceptual and does not solve an elastic PDE.

Scientific context checked against:
- StructMonitor description: https://www.geotechnics.ifg.uni-kiel.de/en/projects
- Elastic modelling and NDT imaging: https://doi.org/10.1016/j.cemconcomp.2006.02.010
- Elastic FWI for property estimation: https://arxiv.org/abs/1504.08340

## Concrete inspection hero

The hero now uses a concrete cross-section animation with a source, receiver array, incident rings, defect-scattered rings, and a schematic receiver trace. The defect toggle removes the illustrative scattered arrival. Wavefronts and analytic pulses are drawn from geometric paths; this is not a numerical elastic-wave solver or an FWI reconstruction. The plot omits boundary reflections, P/S mode conversion, attenuation, and specimen calibration. Reduced-motion preferences pause playback, and a manual pause control is available.

## Education and publication sources

Education: owner-provided Hannan_CV_2025.pdf confirms AMU BSc Mathematics with Honours (2018–2021), MSc completion (March 2024), and doctoral studies beginning April 2024. The public LinkedIn education listing confirms MSc years 2021–2024; the start month is not established. The CV remains outside the public site. No personal phone number or referee contact information was copied.

Google Scholar profile reviewed through browser: https://scholar.google.com/citations?user=uDsLqqAAAAAJ&hl=en. Nine records were listed. The 2024 arXiv version is consolidated with its journal article; the abbreviated PirateNet record is consolidated with the complete 2026 chapter. Seven distinct works are represented, including the featured journal paper, two talks, and thesis metadata.

Published highlight values: Mustajab et al. (2024), Applied Sciences 14(8), 3204, DOI https://doi.org/10.3390/app14083204. Table 1: relative L2 error at oscillator parameter omega=40 is 0.037% (transfer) versus 0.80% (Adam). Section 3.2 / Figure 9g: wave c=1.5, loss order 1e-5 at 600 versus 1,000 epochs. Section 3.2: c=1 baseline relative L2 error 0.05%. These are numerical benchmarks, not measured concrete NDT results. Publisher PDF: https://mdpi-res.com/d_attachment/applsci/applsci-14-03204/article_deploy/applsci-14-03204.pdf?version=1712808195

Additional publication metadata checked with Springer’s ICIACS 2026 Volume 2 contents, the Sensors article record (DOI 10.3390/s23115210), the Research Square DOI record listed by Sciety (10.21203/rs.3.rs-8006794/v1), and the university profile. The preprint is not labelled peer-reviewed.

The thesis and its presentation are now represented on the publications page. Thesis highlights include a 4.50% L2 relative error in the best homogeneous setup, 17.7% in the best reported layered-velocity setup, and a presentation-reported approximately 10-hour 2+1D layered-model run on an RTX 4090. The thesis also documents that boundary treatment, source placement, model width, point allocation, and smoothing of velocity transitions materially affected convergence. The presentation describes the same progression from a damped oscillator to 1D and 2+1D wave equations, including temporal loss weighting and transfer learning. These values are thesis benchmarks, not field measurements or validated concrete damage-localization accuracy.

Logo assets are unmodified official images used to identify education institutions in the local preview:
- assets/amu.png: https://www.amu.ac.in/assets/images/final-logo-2.png
- assets/unige.png: https://id.unige.it/sites/id.unige.it/files/2022-02/logo_orizzontale_COLORE.png?itok=RVe_3yOE
- assets/cau.svg: https://www.uni-kiel.de/ps/cgi-bin/logos/files/cau/norm-en/cau-norm-en-lilagrey-rgb.svg

The professional portrait is sourced from the owner's official Kiel University profile and resized for the web: https://www.geotechnics.ifg.uni-kiel.de/en/team/abdul-hannan-mustajab-m-sc/hannan-1
University logo-use guidance should be checked before public launch; Kiel and Genoa publish permission requirements. No institutional endorsement is claimed.
