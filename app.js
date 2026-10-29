// Show the four latest news items, with a button to reveal the rest.
// Without JavaScript every item stays visible.
(function () {
  var list = document.getElementById('news-list');
  var button = document.getElementById('news-toggle');
  if (list && button) {
    var extra = Array.prototype.slice.call(list.children, 4);
    if (extra.length) {
      var open = false;
      var update = function () {
        extra.forEach(function (item) { item.classList.toggle('is-hidden', !open); });
        button.textContent = open ? 'Show fewer' : 'Show all news';
        button.setAttribute('aria-expanded', String(open));
      };
      button.hidden = false;
      button.addEventListener('click', function () { open = !open; update(); });
      update();
    }
  }
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

// Full publication list, kept up to date by the weekly "Update publications"
// workflow. If the file cannot be loaded, the list written in index.html stays.
(function () {
  var list = document.getElementById('pub-list');
  if (!list || !window.fetch) return;
  var ownName = /(A\. ?H\. Mustajab|Abdul[- ]Hannan Mustajab|Hannan Mustajab|Mustajab, A\. ?H\.)/;

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  function authorLine(p) {
    var line = el('span', 'muted small');
    var authors = p.authors || '';
    var match = authors.match(ownName);
    if (match) {
      line.appendChild(document.createTextNode(authors.slice(0, match.index)));
      line.appendChild(el('strong', '', match[0]));
      line.appendChild(document.createTextNode(authors.slice(match.index + match[0].length)));
    } else {
      line.appendChild(document.createTextNode(authors));
    }
    if (p.venue) line.appendChild(document.createTextNode((authors ? '. ' : '') + p.venue + '.'));
    return line;
  }

  fetch('data/publications.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (pubs) {
      var shown = pubs.filter(function (p) { return p.title && !p.hidden; });
      if (!shown.length) return;
      list.replaceChildren();
      shown.forEach(function (p) {
        var item = el('li');
        item.appendChild(el('span', 'date', p.year ? String(p.year) : ''));
        var body = el('span');
        var title = p.url ? el('a', '', p.title) : el('span', '', p.title);
        if (p.url && /^https:\/\//.test(p.url)) title.href = p.url;
        body.appendChild(title);
        body.appendChild(document.createElement('br'));
        body.appendChild(authorLine(p));
        item.appendChild(body);
        list.appendChild(item);
      });
    })
    .catch(function () {});
})();
