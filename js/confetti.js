(function () {

  const canvas = document.getElementById('confettiCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let animId  = null;
  let phase   = 'idle';
  let bgAlpha = 0;
  let frame   = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  /* ─── MATRIX RAIN — "HAPPY BIRTHDAY" text ─── */
  const HB_TEXT = 'HAPPY BIRTHDAY ';
  const COL_W   = 14;
  const ROW_H   = 16;
  let cols = [];

  function initMatrix() {
    cols = [];
    const n = Math.ceil(W / COL_W);
    for (let i = 0; i < n; i++) {
      cols.push({
        x:          i * COL_W + 7,
        y:          rand(-H * 1.2, 0),
        speed:      rand(1.2, 3.5),
        len:        Math.floor(rand(10, 32)),
        charOffset: Math.floor(rand(0, HB_TEXT.length)),
        tick:       0,
      });
    }
  }

  function drawMatrix() {
    ctx.font = 'bold 12px monospace';
    cols.forEach(col => {
      col.y += col.speed; col.tick++;
      if (col.y - col.len * ROW_H > H) {
        col.y          = rand(-H * 0.6, -ROW_H * 2);
        col.speed      = rand(1.2, 3.5);
        col.len        = Math.floor(rand(10, 32));
        col.charOffset = Math.floor(rand(0, HB_TEXT.length));
      }
      for (let i = 0; i < col.len; i++) {
        const cy = col.y - i * ROW_H;
        if (cy < -ROW_H || cy > H + ROW_H) continue;
        const t   = 1 - i / col.len;
        const ch  = HB_TEXT[(col.charOffset + col.len - i) % HB_TEXT.length];
        ctx.globalAlpha = t * 0.55;
        ctx.fillStyle   = i === 0
          ? 'rgb(180,255,200)'
          : `rgb(0,${Math.floor(130 + t * 125)},45)`;
        ctx.fillText(ch, col.x, cy);
      }
    });
    ctx.globalAlpha = 1;
  }

  /* ─── SHAPE SAMPLER ─── */
  function sampleShape(drawFn, ow, oh, step) {
    const off = document.createElement('canvas');
    off.width = ow; off.height = oh;
    const oc  = off.getContext('2d');
    drawFn(oc, ow, oh);
    const d   = oc.getImageData(0, 0, ow, oh).data;
    const pts = [];
    for (let y = 0; y < oh; y += step)
      for (let x = 0; x < ow; x += step)
        if (d[(y * ow + x) * 4 + 3] > 100) pts.push({ x, y });
    return pts;
  }

  function buildTargets(shape) {
    const cx = W / 2, cy = H / 2;
    const step = 7;

    if (shape === 'cake') {
      const sw = Math.min(W * 0.55, 320), sh = Math.round(sw);
      const pts = sampleShape((oc, ow, oh) => {
        oc.fillStyle = '#fff';
        const s = ow * 0.78, ox = (ow-s)/2, oy = oh*0.13;
        oc.fillRect(ox+s*.15, oy,       s*.70, s*.20);
        oc.fillRect(ox+s*.06, oy+s*.23, s*.88, s*.22);
        oc.fillRect(ox,       oy+s*.48, s,     s*.26);
        [.30,.46,.62].forEach(xr => {
          oc.fillRect(ox+s*xr-s*.028, oy-s*.16, s*.056, s*.16);
          oc.beginPath(); oc.ellipse(ox+s*xr, oy-s*.18, s*.042, s*.072, 0, 0, Math.PI*2); oc.fill();
        });
      }, sw, sh, step);
      return pts.map(p => ({ x: p.x+cx-sw/2, y: p.y+cy-sh/2 }));
    }

    if (shape === 'clover') {
      const sw = Math.min(W * 0.50, 300), sh = Math.round(sw);
      const pts = sampleShape((oc, ow, oh) => {
        const fontSize = Math.floor(ow * 0.82);
        oc.font          = `${fontSize}px serif`;
        oc.textAlign     = 'center';
        oc.textBaseline  = 'middle';
        oc.fillText('🍀', ow / 2, oh / 2);
      }, sw, sh, step);
      return pts.map(p => ({ x: p.x+cx-sw/2, y: p.y+cy-sh/2 }));
    }

    const textMap = {
      happybirthday: 'HAPPY BIRTHDAY',
      name:          'TRAN KHANH LY',
      date:          '17.05.2006',
    };
    if (textMap[shape]) {
      const txt = textMap[shape];
      // safe width with horizontal padding so letters aren't clipped
      const pad = 40;
      const sw  = Math.min(W - pad * 2, 920);
      const sh  = 170;
      const pts = sampleShape((oc, ow, oh) => {
        // fit font so text never exceeds canvas width
        let fs = Math.floor(sw / (txt.length * 0.56));
        fs = Math.min(fs, 115);
        // measure and scale down if still too wide
        oc.font = `900 ${fs}px 'Black Ops One', Arial Black, sans-serif`;
        let measured = oc.measureText(txt).width;
        if (measured > ow - 10) {
          fs = Math.floor(fs * ((ow - 10) / measured));
          oc.font = `900 ${fs}px 'Black Ops One', Arial Black, sans-serif`;
        }
        oc.fillStyle     = '#fff';
        oc.textAlign     = 'center';
        oc.textBaseline  = 'middle';
        oc.fillText(txt, ow / 2, oh / 2);
      }, sw, sh, step);
      return pts.map(p => ({ x: p.x + cx - sw/2, y: p.y + cy - sh/2 }));
    }

    return [];
  }

  /* ─── SHAPE COLOR MAP ─── */
  const SHAPE_COLORS = {
    cake:          { r: 255, g: 200, b: 50  },
    happybirthday: { r: 255, g: 255, b: 255 },
    name:          { r: 255, g: 100, b: 200 },
    date:          { r:  80, g: 220, b: 255 },
    clover:        { r:  80, g: 255, b: 120 },
  };

  // current rendered color (lerps between shapes)
  let curR = 255, curG = 255, curB = 255;
  let tgtR = 255, tgtG = 255, tgtB = 255;

  function setTargetColor(shape) {
    const c = SHAPE_COLORS[shape] || { r:255, g:255, b:255 };
    tgtR = c.r; tgtG = c.g; tgtB = c.b;
  }

  function lerpColor() {
    const speed = 0.04;
    curR += (tgtR - curR) * speed;
    curG += (tgtG - curG) * speed;
    curB += (tgtB - curB) * speed;
  }

  function dotColor() {
    return `rgb(${Math.round(curR)},${Math.round(curG)},${Math.round(curB)})`;
  }

  /* ─── PARTICLE ─── */
  let particles = [];

  function makeParticle(x, y, tx, ty) {
    return { x, y, vx: 0, vy: 0, tx, ty, mode: 'homing', homingStr: 0 };
  }

  function scatterAll() {
    particles.forEach(p => {
      p.mode = 'free';
      const angle = rand(0, Math.PI * 2);
      const spd   = rand(3, 12);
      p.vx = Math.cos(angle) * spd;
      p.vy = Math.sin(angle) * spd - rand(1, 5);
    });
  }

  function homingAll(targets) {
    const extra = targets.length - particles.length;
    if (extra > 0) {
      for (let i = 0; i < extra; i++) {
        const src = particles[i % particles.length];
        particles.push(makeParticle(src.x, src.y, targets[particles.length].x, targets[particles.length].y));
      }
    } else if (extra < 0) {
      particles.length = targets.length;
    }
    particles.forEach((p, i) => {
      p.tx = targets[i].x; p.ty = targets[i].y;
      p.mode = 'homing'; p.homingStr = 0;
    });
  }

  function updateParticles() {
    lerpColor();
    const color = dotColor();
    particles.forEach(p => {
      if (p.mode === 'free') {
        p.vy += 0.22; p.vx *= 0.984; p.vy *= 0.984;
        p.x  += p.vx; p.y  += p.vy;
      } else {
        p.homingStr = Math.min(0.10, p.homingStr + 0.0016);
        const dx = p.tx - p.x, dy = p.ty - p.y;
        p.vx = p.vx * 0.80 + dx * p.homingStr;
        p.vy = p.vy * 0.80 + dy * p.homingStr;
        p.x += p.vx; p.y += p.vy;
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle   = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  /* ─── SEQUENCE ─── */
  const SHAPES   = ['cake', 'happybirthday', 'name', 'date', 'clover'];
  let shapeIdx   = 0;
  let seqState   = 'homing';
  let seqTimer   = 0;

  const T_HOMING  = 130;
  const T_HOLD    = 180;
  const T_SCATTER = 80;

  function startSequence() {
    shapeIdx = 0;
    setTargetColor(SHAPES[0]);
    const targets = buildTargets(SHAPES[0]);
    particles = targets.map(t => {
      const p = makeParticle(rand(0, W), rand(-100, H + 100), t.x, t.y);
      p.vx = rand(-3, 3); p.vy = rand(-3, 3);
      return p;
    });
    seqState = 'homing'; seqTimer = 0;
  }

  function tickSequence() {
    seqTimer++;
    if (seqState === 'homing') {
      if (seqTimer >= T_HOMING) { seqState = 'hold'; seqTimer = 0; }
    } else if (seqState === 'hold') {
      if (seqTimer >= T_HOLD) { seqState = 'scattering'; seqTimer = 0; scatterAll(); }
    } else if (seqState === 'scattering') {
      if (seqTimer >= T_SCATTER) {
        shapeIdx++;
        if (shapeIdx >= SHAPES.length) { endShow(); return; }
        setTargetColor(SHAPES[shapeIdx]);
        homingAll(buildTargets(SHAPES[shapeIdx]));
        seqState = 'homing'; seqTimer = 0;
      }
    }
  }

  /* ─── LOOP ─── */
  function loop() {
    animId = requestAnimationFrame(loop);
    frame++;
    bgAlpha = Math.min(0.93, bgAlpha + 0.025);
    ctx.globalAlpha = bgAlpha;
    ctx.fillStyle   = '#020010';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    if (phase === 'idle') return;
    drawMatrix();
    updateParticles();
    tickSequence();
  }

  function endShow() {
    phase = 'idle'; bgAlpha = 0; particles = [];
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, W, H);
    canvas.style.pointerEvents = 'none';
  }

  /* ─── PUBLIC ─── */
  window.launchConfetti     = function () {};
  window.launchFireworkShow = function () {
    if (phase === 'show') return;
    phase = 'show'; bgAlpha = 0; frame = 0;
    particles = [];
    const first = SHAPE_COLORS[SHAPES[0]];
    curR = first.r; curG = first.g; curB = first.b;
    canvas.style.pointerEvents = 'auto';
    cancelAnimationFrame(animId);
    initMatrix();
    startSequence();
    loop();
  };

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('confettiBtn');
    if (btn) btn.addEventListener('click', () => launchFireworkShow());
    canvas.addEventListener('click', () => { if (phase === 'show') endShow(); });
  });

})();
