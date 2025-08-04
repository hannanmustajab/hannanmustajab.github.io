---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* Ph.D in Computational Geophysics, Christian-Albrechts-Universität zu Kiel, 2024 (expected)
* M.S. in Artificial Intelligence, University of Genoa, 2022
* B.S. in Mathematics, Aligarh Muslim University, 2020

Work experience
======
* 2022 - Present: PhD Researcher
  * Institute for Geosciences, Christian-Albrechts-Universität zu Kiel
  * Duties include: Developing physics-informed neural networks (PINNs) for elastic wave modeling and full-waveform inversion problems
  * Supervisor: [To be filled]

* 2022 - Present: IoT Developer
  * Kumva IoT
  * Duties include: Building remote monitoring systems for geophysical applications
  * Focus: Edge sensing and IoT solutions for geophysical monitoring

* 2020 - 2022: Research Assistant
  * University of Genoa
  * Duties included: Research in artificial intelligence and machine learning applications
  * Supervisor: [To be filled]
  
Skills
======
* **Programming Languages**: Python, MATLAB, C++, JavaScript
* **Machine Learning & AI**: 
  * Scientific Machine Learning
  * Physics-Informed Neural Networks (PINNs)
  * Deep Learning frameworks (PyTorch, TensorFlow)
  * Operator Learning
* **Geophysics & Numerical Methods**:
  * Wave propagation modeling
  * Full-waveform inversion
  * Elastic wave modeling
  * Numerical simulations
* **Tools & Technologies**:
  * Git & GitHub
  * Jupyter Notebooks
  * Docker
  * IoT platforms and edge computing
* **Domain Knowledge**:
  * Remote sensing
  * Structural health monitoring
  * Subsurface applications
  * Geophysical monitoring

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Open-source contributor on GitHub
* Member of geophysical and machine learning research communities
* Collaborator on interdisciplinary projects at the intersection of geophysics, ML, and IoT
