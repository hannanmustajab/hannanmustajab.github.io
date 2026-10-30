// Photo gallery. To add a photo, put the file in assets/photos/ and add an entry below:
// { src: 'assets/photos/name.jpg', alt: 'What the photo shows', place: 'Place', year: '2026', tag: 'Hiking', shape: '3 / 2' }
// shape is the photo's width / height, for example '3 / 2', '4 / 5' or '1 / 1'.
var PHOTOS = [
  { tag: 'Travelling', place: '[PLACE]', year: '[YEAR]', shape: '4 / 5' },
  { tag: 'Hiking', place: '[PLACE]', year: '[YEAR]', shape: '3 / 2' },
  { tag: 'Travelling', place: '[PLACE]', year: '[YEAR]', shape: '1 / 1' },
  { tag: 'Hiking', place: '[PLACE]', year: '[YEAR]', shape: '3 / 2' },
  { tag: 'Travelling', place: '[PLACE]', year: '[YEAR]', shape: '4 / 5' },
  { tag: 'Hiking', place: '[PLACE]', year: '[YEAR]', shape: '1 / 1' }
];

(function () {
  var filter = 'All', open = -1, shown = [], lastFocus = null;
  var tilts = [-1.2, 0.8, -0.5, 1, -0.8, 0.5];
  var grid = document.getElementById('grid'), filters = document.getElementById('filters');
  var box = document.getElementById('lightbox');

  function btnStyle(on) {
    return 'font: inherit; font-size: 15px; font-weight: 600; padding: 8px 16px; min-height: 44px; border-radius: 22px; cursor: pointer; border: 2px solid #111111; ' + (on ? 'background: #111111; color: #FFFFFF' : 'background: #FFFFFF; color: #111111');
  }
  function media(p, i, big) {
    if (p.src) {
      var img = document.createElement('img');
      img.src = p.src; img.alt = p.alt || ''; img.loading = 'lazy';
      img.setAttribute('style', big ? 'max-width: min(1000px, 100%); max-height: 75vh; object-fit: contain; border: 2px solid #FFFFFF; display: block' : 'width: 100%; aspect-ratio: ' + p.shape + '; object-fit: cover; display: block');
      return img;
    }
    var s = document.createElement('span');
    s.textContent = '[PHOTO ' + (i + 1) + ']';
    s.setAttribute('style', big ? 'width: min(1000px, 100%); aspect-ratio: 3 / 2; background: #2A2A2A; border: 2px solid #FFFFFF; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-family: JetBrains Mono, monospace; font-size: 14px' : 'display: flex; align-items: center; justify-content: center; width: 100%; aspect-ratio: ' + p.shape + '; background: #F3F8F5; border: 2px dashed #111111; font-family: JetBrains Mono, monospace; font-size: 12px');
    return s;
  }
  function render() {
    var tags = ['All'];
    PHOTOS.forEach(function (p) { if (tags.indexOf(p.tag) < 0) tags.push(p.tag); });
    filters.innerHTML = '';
    tags.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = t;
      b.setAttribute('aria-pressed', t === filter ? 'true' : 'false');
      b.setAttribute('style', btnStyle(t === filter));
      b.addEventListener('click', function () { filter = t; render(); });
      filters.appendChild(b);
    });
    shown = PHOTOS.filter(function (p) { return filter === 'All' || p.tag === filter; });
    document.getElementById('count').textContent = shown.length + (shown.length === 1 ? ' PHOTO' : ' PHOTOS');
    grid.innerHTML = '';
    shown.forEach(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'ph';
      b.setAttribute('aria-label', 'Open photo ' + (i + 1) + ', ' + p.place);
      b.setAttribute('style', 'font: inherit; color: #111111; cursor: zoom-in; background: #FFFFFF; border: none; padding: 14px 14px 16px; box-shadow: 0 8px 22px rgba(0,0,0,0.14); display: flex; flex-direction: column; gap: 10px; align-self: start; transform: rotate(' + tilts[i % tilts.length] + 'deg)');
      b.appendChild(media(p, i, false));
      var cap = document.createElement('span');
      cap.setAttribute('style', 'display: flex; justify-content: space-between; gap: 12px; font-family: JetBrains Mono, monospace; font-size: 12px; text-align: left');
      cap.innerHTML = '<span></span><span></span>';
      cap.children[0].textContent = p.place; cap.children[1].textContent = p.year;
      b.appendChild(cap);
      b.addEventListener('click', function () { lastFocus = b; show(i); });
      grid.appendChild(b);
    });
  }
  function show(i) {
    open = (i + shown.length) % shown.length;
    var p = shown[open], holder = document.getElementById('lb-img');
    holder.innerHTML = '';
    holder.appendChild(media(p, open, true));
    document.getElementById('lb-place').textContent = p.place;
    document.getElementById('lb-meta').textContent = p.year + ', ' + p.tag.toUpperCase() + ', FUJIFILM X-M5, ' + (open + 1) + ' OF ' + shown.length;
    box.hidden = false;
    document.getElementById('lb-close').focus();
  }
  function close() { box.hidden = true; open = -1; if (lastFocus) lastFocus.focus(); }
  document.getElementById('lb-prev').addEventListener('click', function () { show(open - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(open + 1); });
  document.getElementById('lb-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(open - 1);
    if (e.key === 'ArrowRight') show(open + 1);
  });
  render();
})();
