// ===== ELECTION ROVER REEL ENGINE =====
// Auto-playing cinematic timeline for screen recording

(function () {
  const TOTAL_DURATION = 75000; // 75 seconds
  let playing = true;
  let startTime = null;
  let elapsed = 0;
  let timers = [];

  const $ = (id) => document.getElementById(id);
  const show = (el, cls = 'show') => { if (el) el.classList.add(cls); };
  const scenes = ['scene1','scene2','scene3a','scene3b','scene3c','scene4','scene5','scene6'];

  function activateScene(id) {
    scenes.forEach(s => {
      const el = $(s);
      if (el) el.classList.toggle('active', s === id);
    });
  }

  // Delayed action helper
  function at(ms, fn) {
    const t = setTimeout(fn, ms);
    timers.push(t);
    return t;
  }

  // Animate counter from 0 to target
  function animateCount(el, target, duration) {
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Typewriter effect
  function typewrite(el, text, speed, cb) {
    let i = 0;
    function t() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        timers.push(setTimeout(t, speed));
      } else if (cb) cb();
    }
    t();
  }

  // Language cycling animation
  function cycleLangs() {
    const langs = document.querySelectorAll('.s3-lang');
    let idx = 0;
    function next() {
      langs.forEach(l => l.classList.remove('active'));
      langs[idx].classList.add('active');
      idx = (idx + 1) % langs.length;
      if (idx !== 0) timers.push(setTimeout(next, 400));
    }
    next();
  }

  // Pipeline animation
  function runPipeline() {
    const steps = ['ps1','ps2','ps3','ps4','ps5'];
    steps.forEach((s, i) => {
      at(i * 800, () => {
        if (i > 0) $(steps[i-1]).classList.replace('active','done');
        $(s).classList.add('active');
      });
    });
    at(steps.length * 800, () => {
      $(steps[steps.length-1]).classList.replace('active','done');
      $('verdict-result').style.opacity = '1';
    });
  }

  // Progress bar updater
  function updateProgress() {
    if (!playing || !startTime) return;
    elapsed = Date.now() - startTime;
    const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
    $('progress').style.width = pct + '%';
    if (pct < 100) requestAnimationFrame(updateProgress);
  }

  // ===== MAIN TIMELINE =====
  function startReel() {
    // Reset
    timers.forEach(clearTimeout);
    timers = [];
    scenes.forEach(s => { const el = $(s); if (el) el.classList.remove('active'); });
    $('progress').style.width = '0%';

    // Reset all show states
    document.querySelectorAll('.show').forEach(el => el.classList.remove('show'));
    $('s1-count').textContent = '0';
    $('typewriter').textContent = '';
    $('verdict-result').style.opacity = '0';
    $('s3a-text').style.opacity = '0';
    document.querySelectorAll('.pipeline-step').forEach(el => {
      el.classList.remove('done','active');
    });
    document.querySelectorAll('.s3-lang').forEach((l,i) => {
      l.classList.toggle('active', i === 0);
    });
    const s3p = $('s3-progress');
    if (s3p) s3p.style.width = '0%';

    startTime = Date.now();
    playing = true;
    $('playPause').textContent = '||';
    requestAnimationFrame(updateProgress);

    // ---------- SCENE 1: HOOK (0s - 6s) ----------
    activateScene('scene1');

    at(400, () => show($('s1-bubble')));
    at(1500, () => {
      show($('s1-counter'));
      animateCount($('s1-count'), 15600, 2000);
    });
    at(3800, () => {
      $('glitch').classList.add('flash');
      setTimeout(() => $('glitch').classList.remove('flash'), 400);
    });
    at(4200, () => show($('s1-verdict')));

    // ---------- SCENE 2: PROBLEM (6s - 15s) ----------
    at(6000, () => activateScene('scene2'));
    at(6400, () => show($('s2c1')));
    at(7400, () => show($('s2c2')));
    at(8400, () => show($('s2c3')));
    at(10000, () => show($('s2q')));

    // ---------- SCENE 3A: DASHBOARD (15s - 22s) ----------
    at(15000, () => {
      activateScene('scene3a');
      show($('s3shatter'));
    });
    at(15800, () => show($('s3f1')));
    at(17000, () => {
      const s3p = $('s3-progress');
      if (s3p) s3p.style.width = '100%';
    });
    at(19000, () => {
      $('s3a-text').style.opacity = '1';
      $('s3a-text').style.transition = 'opacity 0.6s ease';
    });

    // ---------- SCENE 3B: LANGUAGE + CHAT (22s - 32s) ----------
    at(22000, () => activateScene('scene3b'));
    at(22400, () => show($('s3f2')));
    at(23000, () => cycleLangs());
    at(27000, () => show($('s3f3')));
    at(27800, () => {
      const lang = document.getElementById('reel').dataset.lang || 'en';
      const translations = window.REEL_TRANSLATIONS || {};
      const t = (translations[lang] || translations['en'] || {});
      const twText = t.typewriter || 'To register, submit Form 6 online at nvsp.in or at your nearest ERO office. You need: Proof of age, address proof, and a passport photo.';
      typewrite($('typewriter'), twText, 30);
    });

    // ---------- SCENE 3C: MISINFO SIMULATOR (32s - 40s) ----------
    at(32000, () => activateScene('scene3c'));
    at(32400, () => show($('s3f4')));
    at(33000, () => runPipeline());

    // ---------- SCENE 4: TECH FLEX (40s - 52s) ----------
    at(40000, () => activateScene('scene4'));
    at(40400, () => show($('s4stack')));

    // ---------- SCENE 5: EMOTIONAL CLOSE (52s - 62s) ----------
    at(52000, () => activateScene('scene5'));
    at(52600, () => show($('s5tag')));
    at(55000, () => show($('s5sub')));
    at(56500, () => show($('s5sub2')));

    // ---------- SCENE 6: LOGO CARD (62s - 75s) ----------
    at(62000, () => activateScene('scene6'));
    at(62400, () => show($('s6logo')));
    at(63200, () => show($('s6name')));
    at(64500, () => show($('s6cta')));
    at(65500, () => show($('s6github')));
    at(66500, () => show($('s6badge')));
  }

  // Controls
  $('playPause').addEventListener('click', () => {
    if (playing) {
      playing = false;
      $('playPause').textContent = '\u25B6';
      timers.forEach(clearTimeout);
    } else {
      // Simple restart on resume
      startReel();
    }
  });

  $('restart').addEventListener('click', () => startReel());

  // Auto-start after 1 second
  setTimeout(startReel, 1000);
})();
