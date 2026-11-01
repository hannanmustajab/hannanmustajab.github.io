// Interactive parts of the wave modelling project page.
(function () {
  function pulse(x, c, w, a) { var d = (x - c) / w; return a * Math.exp(-d * d * 2) * Math.cos(d * 3); }

  var slider = document.getElementById('wave-slider');
  var path = document.getElementById('wave-path');
  var label = document.getElementById('wave-t');
  var svg = document.getElementById('wave-svg');
  function drawWave() {
    var t = Number(slider.value);
    var c1 = t <= 50 ? 10 * t : null, c2 = t > 50 ? 500 + 6 * (t - 50) : null, cr = t > 50 ? 500 - 10 * (t - 50) : null;
    var pts = [];
    for (var x = 0; x <= 1000; x += 4) {
      var y = 0;
      if (c1 !== null) y += pulse(x, c1, 40, 60);
      if (c2 !== null && x >= 500) y += pulse(x, c2, 24, 48);
      if (cr !== null && x <= 500) y += pulse(x, cr, 40, -22);
      pts.push((x === 0 ? 'M' : 'L') + x + ' ' + (110 - y).toFixed(1));
    }
    path.setAttribute('d', pts.join(' '));
    label.textContent = (t / 100).toFixed(2);
    svg.setAttribute('aria-label', 'A wave pulse at time ' + (t / 100).toFixed(2) + (t > 50 ? ', partly transmitted into the slow layer and partly reflected' : ', travelling through the fast layer'));
  }
  slider.addEventListener('input', drawWave);
  drawWave();

  function btnStyle(on) {
    return 'font: inherit; font-size: 15px; padding: 10px 16px; min-height: 44px; border-radius: 22px; cursor: pointer; border: 2px solid #111111; font-weight: 600; ' + (on ? 'background: #111111; color: #FFFFFF' : 'background: #FFFFFF; color: #111111');
  }
  function buttons(holder, items, current, pick) {
    holder.innerHTML = '';
    items.forEach(function (it) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = it[1];
      b.setAttribute('aria-pressed', it[0] === current ? 'true' : 'false');
      b.setAttribute('style', btnStyle(it[0] === current));
      b.addEventListener('click', function () { pick(it[0]); });
      holder.appendChild(b);
    });
  }

  var data = {
    avg: { bars: [['Standard PINN', 20.71], ['Fourier-feature PINN', 18.25], ['PirateNet', 1.67]], note: 'Time-averaged relative L2 error on the filtered Marmousi2 model. Lower is better.' },
    final: { bars: [['Standard PINN', 45], ['Fourier-feature PINN', 35], ['PirateNet', 3.0]], note: 'Relative L2 error at the final time on the Marmousi2 crop. Lower is better.' }
  };
  function showBars(key) {
    buttons(document.getElementById('tabs'), [['avg', 'Average over time'], ['final', 'At the final time']], key, showBars);
    var cur = data[key], max = Math.max.apply(null, cur.bars.map(function (b) { return b[1]; }));
    var holder = document.getElementById('bars'); holder.innerHTML = '';
    cur.bars.forEach(function (b) {
      var row = document.createElement('div');
      row.setAttribute('style', 'display: grid; grid-template-columns: minmax(110px, 170px) minmax(0, 1fr) 64px; gap: 16px; align-items: center');
      row.innerHTML = '<span style="font-size: 15px; font-weight: 600"></span><span style="height: 22px; background: #FFFFFF; border: 2px solid #111111; overflow: hidden; display: block"><span style="display: block; height: 100%; width: ' + Math.max(2, b[1] / max * 100).toFixed(1) + '%; background: ' + (b[0] === 'PirateNet' ? '#2443E0' : '#B8B8B8') + '"></span></span><span style="font-family: \'JetBrains Mono\', monospace; font-size: 14px; text-align: right"></span>';
      row.children[0].textContent = b[0]; row.children[2].textContent = b[1] + '%';
      holder.appendChild(row);
    });
    document.getElementById('bar-note').textContent = cur.note;
  }
  showBars('avg');

  var figs = {
    wave: { label: 'Wavefields at t = 0.9', src: 'assets/marmousi-wavefields.png', alt: 'Marmousi2 elastic wavefields at time 0.9 comparing three PINNs with numerical references and their differences', caption: 'Wavefield comparison at t = 0.9. The PirateNet difference panels are the smallest.' },
    err: { label: 'Material and error', src: 'assets/marmousi-results.png', alt: 'Filtered Marmousi2 P-wave speed, training history and error over time for three PINNs', caption: 'Filtered Marmousi2 benchmark: material model, training history and error over simulated time.' }
  };
  function showFig(key) {
    buttons(document.getElementById('figtabs'), [['wave', figs.wave.label], ['err', figs.err.label]], key, showFig);
    var img = document.getElementById('fig-img');
    img.src = figs[key].src; img.alt = figs[key].alt;
    document.getElementById('fig-cap').textContent = figs[key].caption;
  }
  showFig('wave');
})();
