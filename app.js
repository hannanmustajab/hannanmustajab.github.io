const notes = {
  pinns: { title: 'Making PINNs faster: where to start', intro: 'A proposed structure for the first technical note on accelerating PINNs. Measurements and code will be added before publication.', items: ['Define the PDE, domain, boundary conditions, precision, and hardware.', 'Profile the baseline: separate sampling, automatic differentiation, and optimizer time.', 'Compare one change at a time, including transfer learning and sampling strategies.', 'Report wall-clock time alongside solution error, multiple seeds, and a reproducible configuration.'], link: 'https://doi.org/10.3390/app14083204', linkText: 'Related published work: PINNs using transfer learning ↗' },
};
const dialog = document.querySelector('#note-dialog');
let lastTrigger;
function openNote(key, trigger) {
  const note = notes[key];
  if (!note) return;
  lastTrigger = trigger;
  document.querySelector('#dialog-title').textContent = note.title;
  const body = document.querySelector('#dialog-body');
  body.replaceChildren();
  const intro = document.createElement('p'); intro.textContent = note.intro; body.append(intro);
  const list = document.createElement('ol');
  note.items.forEach(text => { const item = document.createElement('li'); item.textContent = text; list.append(item); }); body.append(list);
  if (note.link) { const link = document.createElement('a'); link.href = note.link; link.textContent = note.linkText; link.className = 'text-link'; body.append(link); }
  dialog.showModal();
}
document.querySelectorAll('.note-open').forEach(button => button.addEventListener('click', () => openNote(button.dataset.note, button)));
document.querySelectorAll('.dialog-close,.dialog-dismiss').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => lastTrigger?.focus());
document.querySelector('#year').textContent = new Date().getFullYear();
const canvas = document.querySelector('#wave');
const context = canvas.getContext('2d');
const motion = document.querySelector('#motion');
const defectToggle = document.querySelector('#defect-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches, defect = true, elapsed = 1.9, previous = 0, inView = true;
function syncMotion() {
  motion.textContent = paused ? 'Play motion ▷' : 'Pause motion Ⅱ';
  motion.setAttribute('aria-pressed', String(paused));
}
syncMotion();
motion.addEventListener('click', () => { paused = !paused; syncMotion(); });
reducedMotion.addEventListener('change', event => { paused = event.matches; syncMotion(); });
defectToggle.addEventListener('click', () => {
  defect = !defect;
  defectToggle.setAttribute('aria-pressed', String(defect));
  defectToggle.textContent = defect ? 'Defect included' : 'No defect';
  document.querySelector('#inspection-status').textContent = defect
    ? 'A defect scatters the wave, adding a later arrival at the receiver.'
    : 'Without the illustrated defect, the extra scattered arrival disappears.';
  canvas.setAttribute('aria-label', defect
    ? 'Concrete cross-section with incident waves, an internal defect, scattered waves, and a conceptual receiver trace.'
    : 'Concrete cross-section without a defect, showing incident waves and a conceptual direct-arrival receiver trace.');
  draw();
});
function resize() {
  if (!context) return;
  const scale = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(canvas.clientWidth * scale);
  canvas.height = Math.round(canvas.clientHeight * scale);
  context.setTransform(scale, 0, 0, scale, 0, 0);
  draw();
}
function draw() {
  if (!context) return;
  const width = canvas.clientWidth, height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);
  // Fixed schematic coordinates keep the source, wavefronts, and trace aligned.
  context.save(); context.scale(width / 520, height / 360);
  const ctx = context;
  const source = {x:80,y:58}, target = {x:270,y:167}, receiver = {x:425,y:58};
  const speed = 170, period = 4.6, time = elapsed % period;
  const scatterStart = Math.hypot(target.x-source.x,target.y-source.y) / speed;
  ctx.fillStyle='#dce2d5';ctx.fillRect(30,58,460,193);
  ctx.strokeStyle='#819375';ctx.lineWidth=1;ctx.strokeRect(30,58,460,193);
  ctx.save();ctx.beginPath();ctx.rect(30,58,460,193);ctx.clip();
  // Deterministic aggregate texture; no specimen data is represented.
  for(let i=0;i<170;i++) {
    const x=32+(i*71%454), y=62+(i*47%184);
    ctx.fillStyle=i%3 ? '#c4ccb9' : '#b6c2ad';ctx.beginPath();ctx.ellipse(x,y,2+i%3,1.5+i%2,i*.8,0,Math.PI*2);ctx.fill();
  }
  function rings(x,y,r,color) {
    if(r<=0)return;
    for(let k=0;k<5;k++) {
      const radius=r-k*8;if(radius<=0)continue;
      ctx.strokeStyle=color;ctx.globalAlpha=(1-k/6)*.65;ctx.lineWidth=2-k*.18;
      ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);ctx.stroke();
    }
    ctx.globalAlpha=1;
  }
  rings(source.x,source.y,time*speed,'#52734a');
  if(defect) {
    rings(target.x,target.y,(time-scatterStart)*speed,'#b87549');
    ctx.strokeStyle='#815135';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(267,139);ctx.lineTo(277,153);ctx.lineTo(265,169);ctx.lineTo(279,186);ctx.lineTo(271,198);ctx.stroke();
  }
  ctx.restore();
  ctx.font='11px monospace';ctx.fillStyle='#36553d';ctx.fillText('SOURCE',54,31);ctx.fillText('RECEIVERS',367,31);
  ctx.fillStyle='#365c42';ctx.fillRect(72,47,16,13);
  [365,395,425,455].forEach(x=>{ctx.fillStyle=x===425?'#9d693d':'#718965';ctx.fillRect(x-5,48,10,12);});
  ctx.fillStyle='#65745c';ctx.font='10px monospace';ctx.fillText('CONCRETE',43,235);
  if(defect){ctx.fillStyle='#815135';ctx.fillText('DEFECT',298,184);ctx.strokeStyle='#a78160';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(282,171);ctx.lineTo(295,179);ctx.stroke();}
  ctx.fillStyle='#526449';ctx.font='10px monospace';ctx.fillText('RECEIVER TRACE · ILLUSTRATIVE',30,278);
  const left=30,right=490,base=319;
  ctx.strokeStyle='#c8d1be';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(left,base);ctx.lineTo(right,base);ctx.stroke();
  const directArrival=Math.hypot(receiver.x-source.x,receiver.y-source.y)/speed;
  const scatteredArrival=scatterStart+Math.hypot(receiver.x-target.x,receiver.y-target.y)/speed;
  function pulse(t,arrival){const q=(t-arrival)*16;return Math.exp(-q*q*.22)*Math.sin(q*2);}
  // Analytic pulses illustrate arrival paths, not simulated measurement data.
  function trace(scattered,color){ctx.strokeStyle=color;ctx.lineWidth=1.6;ctx.beginPath();for(let x=left;x<=right;x++){const t=(x-left)/(right-left)*period;const value=scattered?pulse(t,scatteredArrival)*15:pulse(t,directArrival)*24;const y=base-value;x===left?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}
  trace(false,'#52734a');if(defect)trace(true,'#b87549');
  const cursor=left+time/period*(right-left);ctx.strokeStyle='#7a856e';ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(cursor,289);ctx.lineTo(cursor,344);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#74816b';ctx.font='9px monospace';ctx.fillText('0',left,354);ctx.fillText('time →',right-40,354);
  ctx.restore();
}
if(context) {
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries => { inView=entries[0].isIntersecting; }).observe(canvas);
  resize();
  function animate(now) {
    const delta=previous ? Math.min((now-previous)/1000,.08) : 0;previous=now;
    if(!paused && inView && !document.hidden){elapsed+=delta;draw();}
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
