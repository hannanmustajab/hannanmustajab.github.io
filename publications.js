// Renders data/publications.json, which a weekly GitHub Action keeps up to date.
(function () {
  var list = document.getElementById('pub-list');
  var own = /(A\. ?H\. Mustajab|Abdul[- ]Hannan Mustajab|Hannan Mustajab|Mustajab, A\. ?H\.)/;
  fetch('data/publications.json').then(function (r) { return r.json(); }).then(function (works) {
    works.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
    works.forEach(function (w, i) {
      var li = document.createElement('li');
      li.setAttribute('style', 'padding: 18px 0; border-top: ' + (i === 0 ? '2px solid #111111' : '1px solid #CCCCCC') + '; display: flex; flex-direction: column; gap: 4px');
      var meta = document.createElement('span');
      meta.setAttribute('style', "font-family: 'JetBrains Mono', monospace; font-size: 12px");
      meta.textContent = [w.year, w.venue].filter(Boolean).join(', ').toUpperCase();
      var title = document.createElement(w.url || w.doi ? 'a' : 'span');
      if (w.url || w.doi) title.href = w.url || ('https://doi.org/' + w.doi);
      title.setAttribute('style', 'color: #111111; font-weight: 600; font-size: 18px');
      title.textContent = w.title;
      var authors = document.createElement('span');
      authors.setAttribute('style', 'font-size: 15px; color: #333333');
      (w.authors || '').split(own).forEach(function (part) {
        var el = document.createElement(own.test(part) ? 'strong' : 'span');
        el.textContent = part; authors.appendChild(el);
      });
      li.appendChild(meta); li.appendChild(title); li.appendChild(authors);
      list.appendChild(li);
    });
  }).catch(function () {
    list.innerHTML = '<li>The list could not be loaded. See Google Scholar instead.</li>';
  });
})();
