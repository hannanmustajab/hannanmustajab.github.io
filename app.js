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
