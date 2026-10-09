// ============================================================
//  Three.js renderer, station controller, audio synth, sakura world, update loop.
//  Plain classic script: it reads globals from the files loaded above it.
//  Load order is fixed by index.html and must not change.
// ============================================================

// Three.js Renderer and Postprocessing Setup
function xy(canvas) {
  let renderer;
  try {
    renderer = new Kv({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch (e) {
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, pr.maxDpr));
  
  const scene = new jv();
  scene.fog = new cc(Cd.sky[0], 12, 75);
  
  const camera = new Ze(60, 1, 0.1, 300);
  const composer = new py(renderer);
  composer.addPass(new my(scene, camera));
  
  // Threshold sits high on purpose: a pale daytime sky is already near
  // white, and a low threshold makes the whole frame bloom into a flat
  // wash that swallows the blossoms and clouds.
  const bloomPass = new Or(new et(innerWidth, innerHeight), 0.32, 0.7, 0.97);
  bloomPass.enabled = !Rd;
  composer.addPass(bloomPass);
  
  composer.addPass(new vy()); // OutputPass
  
  const onResize = () => {
    renderer.setSize(innerWidth, innerHeight, false);
    composer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  };
  addEventListener("resize", onResize);
  onResize();
  
  return { renderer, scene, camera, composer, bloomPass };
}

// Station Controller along Curve
class My {
  constructor() {
    Sn(this, "curve", new yf(Ba.map(([t, e, n]) => new D(t, e, n))));
    Sn(this, "count", Ba.length);
    Sn(this, "progress", 0);
    Sn(this, "onStation", () => {});
    Sn(this, "state", { target: 0 });
    Sn(this, "active", -1);
    Sn(this, "snapTimer", 0);
    this.bindInput();
  }
  
  stationT(t) {
    return t / (this.count - 1);
  }
  
  get nearest() {
    return Math.round(this.state.target * (this.count - 1));
  }
  
  goTo(t) {
    const targetT = this.stationT(Qc.clamp(t, 0, this.count - 1));
    Zn.to(this.state, {
      target: targetT,
      duration: _s ? 0 : pr.travelSeconds,
      ease: "power3.inOut",
      overwrite: true
    });
  }
  
  update() {
    this.progress += (this.state.target - this.progress) * (_s ? 1 : pr.damping);
    const stationIdx = Math.round(this.progress * (this.count - 1));
    if (stationIdx !== this.active) {
      this.active = stationIdx;
      this.onStation(stationIdx);
    }
  }
  
  push(delta) {
    Zn.killTweensOf(this.state);
    this.state.target = Qc.clamp(this.state.target + delta, 0, 1);
    clearTimeout(this.snapTimer);
    this.snapTimer = window.setTimeout(() => this.goTo(this.nearest), pr.snapDelayMs);
  }
  
  bindInput() {
    const isInside = (e, sel) => !!e.target.closest(sel);
    const isScrollableCard = e => {
      const card = e.target.closest(".card, #gallery-root, #certs-root, .certs-grid");
      return !!card && (card.scrollHeight > card.clientHeight || card.scrollWidth > card.clientWidth);
    };
    
    addEventListener("wheel", e => {
      if (isInside(e, "dialog") || isScrollableCard(e)) return;
      this.push(e.deltaY * pr.wheelSpeed);
    }, { passive: true });
    
    let startY = null;
    addEventListener("pointerdown", e => {
      if (isInside(e, "dialog, button, a, input, textarea")) return;
      startY = e.clientY;
    });
    
    addEventListener("pointermove", e => {
      if (startY !== null) {
        this.push((startY - e.clientY) * pr.dragSpeed);
        startY = e.clientY;
      }
    });
    
    addEventListener("pointerup", () => { startY = null; });
    addEventListener("pointercancel", () => { startY = null; });
    
    addEventListener("keydown", e => {
      // Never hijack keys aimed at a form field or an open dialog.
      if (isInside(e, "dialog, input, textarea, select")) return;
      // Space and Enter belong to whatever is focused. Swallowing them here
      // would stop Tab-to-button activation, so hand those back first.
      const onControl = e.target.closest("button, a, [role='button']");
      if (onControl && (e.key === " " || e.key === "Enter")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        this.goTo(this.nearest + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        this.goTo(this.nearest - 1);
      } else if (/^[1-7]$/.test(e.key)) {
        this.goTo(parseInt(e.key, 10) - 1);
      }
    });
  }
}

// Audio Synthesizer (Ambient Drone + Chimes)
class zy {
  constructor() {
    Sn(this, "on", false);
    Sn(this, "nodes", null);
  }
  
  get audio() {
    return this.nodes ?? (this.nodes = this.build());
  }
  
  build() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    
    // Delay effect
    const delay = ctx.createDelay(0.6);
    const feedback = ctx.createGain();
    const delayFilter = ctx.createBiquadFilter();
    delay.delayTime.value = 0.32;
    feedback.gain.value = 0.25;
    delayFilter.type = "lowpass";
    delayFilter.frequency.value = 2000;
    master.connect(delay);
    delay.connect(delayFilter);
    delayFilter.connect(feedback);
    feedback.connect(delay);
    delay.connect(ctx.destination);
    
    // Ambient Pad Oscillators
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();
    osc1.type = "triangle";
    osc1.frequency.value = 174.61; // F3
    filter1.type = "lowpass";
    filter1.frequency.value = 720;
    gain1.gain.value = 0.035;
    osc1.connect(filter1).connect(gain1).connect(master);
    osc1.start();
    
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = 220.00; // A3
    gain2.gain.value = 0.025;
    osc2.connect(gain2).connect(master);
    osc2.start();
    
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = "sine";
    osc3.frequency.value = 261.63; // C4
    gain3.gain.value = 0.02;
    osc3.connect(gain3).connect(master);
    osc3.start();
    
    // Subtle LFO Detune
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.12;
    lfoGain.gain.value = 4;
    lfo.connect(lfoGain).connect(osc1.detune);
    lfo.start();
    
    return { ctx, master };
  }
  
  toggle(state) {
    const { ctx, master } = this.audio;
    this.on = state ?? !this.on;
    if (ctx.state === "suspended") ctx.resume();
    master.gain.setTargetAtTime(this.on ? 0.7 : 0, ctx.currentTime, 0.8);
    try { localStorage.setItem("eya-sound", this.on ? "1" : "0"); } catch (e) {}
    return this.on;
  }
  
  restore() {
    try {
      if (localStorage.getItem("eya-sound") === "1") return this.toggle(true);
    } catch (e) {}
    return false;
  }
  
  chime(stationIdx = 0) {
    if (!this.on) return;
    const { ctx, master } = this.audio;
    const now = ctx.currentTime;
    const notes = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25]; // D, E, G, A, B, D5, E5
    const baseFreq = notes[stationIdx % notes.length];
    
    [1, 2.01, 3.96].forEach((mult, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = idx === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(baseFreq * mult, now);
      filter.type = "lowpass";
      filter.frequency.value = 3400;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(idx === 0 ? 0.14 : 0.04, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2 + idx * 0.4);
      osc.connect(filter).connect(gain).connect(master);
      osc.start(now);
      osc.stop(now + 3.0);
    });
  }
  
  clickChime() {
    if (!this.on) return;
    const { ctx, master } = this.audio;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.04, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    osc.connect(gain).connect(master);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

// 3D Environment Choreography & Station Landmarks
function Ly({ scene, camera, bloomPass }, stationController) {
  // Lights
  scene.add(camera);
  const ambient = new Vx(0xffd6eb, 0.9);
  scene.add(ambient);
  
  const dirLight = new kx(0xffffff, 0.7);
  dirLight.position.set(5, 8, 6);
  scene.add(dirLight);
  
  const pointLight = new Bx(0xff2d87, 1.4, 50);
  camera.add(pointLight);
  
  // ── Sky Sun: bright at chapter 0, low and warm by the finale ──
  const sunTexture = skTex(256, r => {
    const g = r.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "#fffdf5");
    g.addColorStop(0.22, "#ffe9a8");
    g.addColorStop(0.5, "#ffb27a");
    g.addColorStop(1, "rgba(255,140,120,0)");
    r.fillStyle = g;
    r.fillRect(0, 0, 64, 64);
  });
  const sunSprite = new vf(new uc({ map: sunTexture, fog: false, depthWrite: false, blending: gs, transparent: true, opacity: 0.4 }));
  sunSprite.scale.setScalar(12);
  sunSprite.position.set(-14, 16, -90);
  camera.add(sunSprite);

  // Warm horizon glow that intensifies as the day darkens.
  const horizonGlow = new vf(new uc({
    map: skTex(256, r => {
      const g = r.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,190,140,0.85)");
      g.addColorStop(0.45, "rgba(255,110,170,0.35)");
      g.addColorStop(1, "rgba(160,40,120,0)");
      r.fillStyle = g;
      r.fillRect(0, 0, 64, 64);
    }),
    fog: false,
    depthWrite: false,
    blending: gs,
    transparent: true
  }));
  horizonGlow.scale.set(90, 34, 1);
  horizonGlow.position.set(0, -26, -80);
  camera.add(horizonGlow);

  // ── Sakura Blossoms: anchored near-camera + scattered depth ──
  const blossomTex = BlossomTex();
  const blossoms = [];
  const blossomCount = Rd ? 12 : 22;

  // Layer 1 — large blossoms drifting past the frame edges.
  for (let i = 0; i < blossomCount; i++) {
    const mat = new uc({
      map: blossomTex,
      transparent: true,
      depthWrite: false,
      fog: false,
      rotation: Math.random() * Math.PI * 2,
      opacity: 0.8 + Math.random() * 0.2
    });
    const s = new vf(mat);
    s.scale.setScalar(1 + Math.random() * 1.5);
    s.position.set(
      (Math.random() < 0.5 ? -1 : 1) * (5 + Math.random() * 12),
      (Math.random() - 0.5) * 30,
      -9 - Math.random() * 15
    );
    s.userData = {
      baseX: s.position.x,
      baseY: s.position.y,
      phase: Math.random() * Math.PI * 2,
      speed: 0.25 + Math.random() * 0.5,
      spin: (Math.random() - 0.5) * 0.14
    };
    camera.add(s);
    blossoms.push(s);
  }

  // Layer 2 — mid/far blossoms in world space for parallax depth.
  const farBlossoms = [];
  for (let i = 0; i < (Rd ? 14 : 24); i++) {
    const s = new vf(new uc({
      map: blossomTex,
      transparent: true,
      depthWrite: false,
      fog: false,
      rotation: Math.random() * Math.PI * 2,
      opacity: 0.45 + Math.random() * 0.35
    }));
    s.scale.setScalar(0.8 + Math.random() * 1.5);
    s.position.set(
      (Math.random() - 0.5) * 30,
      Math.random() * ql,
      10 - Math.random() * 34
    );
    s.userData = {
      baseY: s.position.y,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.4,
      spin: (Math.random() - 0.5) * 0.1
    };
    scene.add(s);
    farBlossoms.push(s);
  }

  // NOTE: no cloud-bank layers here. The old foreground/mid puffs sat at
  // 8-38 units wide and tinted 0xa87aad, which read as floating soap bubbles
  // across the intro card. Blossoms and petal drift carry the atmosphere now.

  // ── Sakura Petal Drift ──
  const petalTex = PetalTex();
  const petalCount = Rd ? 150 : 340;
  const petalPos = new Float32Array(petalCount * 3);
  const petals = [];
  // Petals live in a band around the camera so the drift never
  // runs out over the long 0 → 102 corridor.
  const BAND_UP = 26, BAND_DOWN = -22;
  for (let i = 0; i < petalCount; i++) {
    const near = Math.random() < 0.45;
    petalPos.set([
      (Math.random() - 0.5) * (near ? 24 : 40),
      BAND_DOWN + Math.random() * (BAND_UP - BAND_DOWN),
      near ? -2 - Math.random() * 10 : 6 - Math.random() * 24
    ], i * 3);
    petals.push({
      fall: (near ? 0.7 : 0.3) + Math.random() * 0.8,
      sway: 0.4 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2
    });
  }
  const petalGeom = new Se();
  petalGeom.setAttribute("position", new ze(petalPos, 3));
  const petalMat = new hc({
    map: petalTex,
    size: 0.5,
    sizeAttenuation: true,
    transparent: true,
    depthWrite: false,
    alphaTest: 0.04,
    opacity: 0.9,
    color: 0xffd9e6
  });
  const petalPoints = new Mf(petalGeom, petalMat);
  scene.add(petalPoints);

  // Background Aurora Glow Sprite
  const auroraSprite = new vf(new uc({ map: Ld(), fog: false, depthWrite: false, opacity: 0.22 }));
  auroraSprite.position.set(-16, 18, -60);
  auroraSprite.scale.setScalar(26);
  camera.add(auroraSprite);
  
  // 1. Station 0 is intentionally left to the sky itself — blossoms,
  //    petals and cloud banks. The former hero technosphere spawned a
  //    huge faceted shape directly behind the intro card, which fought
  //    the soft sakura composition, so it no longer exists.
  
  // 2. World Interactive Domain Landmarks (Station 1)
  const worldGroup = new li();
  worldGroup.position.set(Ba[1][0] + 4.2, Ba[1][1] - 0.2, Ba[1][2] - 3.5);
  
  const domainTokens = [];
  worldDomains.forEach((domain, idx) => {
    const tokenGroup = new li();
    const angle = (idx / worldDomains.length) * Math.PI * 1.6 - Math.PI * 0.8;
    tokenGroup.position.set(Math.cos(angle) * 3.6, Math.sin(angle) * 2.2, (Math.random() - 0.5) * 1.5);
    
    // Blossom marker instead of the old faceted purple sphere.
    const tokenMesh = new vf(new uc({
      map: blossomTex,
      transparent: true,
      depthWrite: false,
      fog: false,
      rotation: Math.random() * Math.PI * 2,
      opacity: 0
    }));
    tokenMesh.scale.setScalar(1.9);
    tokenMesh.userData = { spin: (Math.random() - 0.5) * 0.5, baseY: tokenGroup.position.y };
    tokenGroup.add(tokenMesh);
    
    // Invisible hit sphere for raycasting
    const hitSphere = new Pe(new vc(0.85, 8, 8), new Ms({ visible: false }));
    hitSphere.userData = { type: "domain", id: domain.id, index: idx };
    tokenGroup.add(hitSphere);
    
    worldGroup.add(tokenGroup);
    domainTokens.push({
      group: tokenGroup,
      hit: hitSphere,
      mesh: tokenMesh,
      id: domain.id,
      baseY: tokenGroup.position.y,
      phase: idx
    });
  });
  scene.add(worldGroup);
  
  // 3. Journey Glowing Pathway Ribbon (Station 2)
  const journeyGroup = new li();
  const journeyCurvePoints = [
    new D(Ba[2][0] + 3.5, Ba[2][1] - 8, Ba[2][2] - 4),
    new D(Ba[2][0] + 4.2, Ba[2][1], Ba[2][2] - 2),
    new D(Ba[2][0] + 3.0, Ba[2][1] + 8, Ba[2][2] - 5)
  ];
  const journeyCurve = new yf(journeyCurvePoints);
  const journeyPoints = journeyCurve.getPoints(50);
  const journeyGeom = new Se().setFromPoints(journeyPoints);
  const journeyLine = new ix(journeyGeom, new xf({ color: 0xff2d87, linewidth: 3 }));
  journeyGroup.add(journeyLine);
  
  // Milestone markers — sakura blossoms riding the pathway instead of
  // the old glowing spheres, which read as floating soap bubbles.
  const journeyBlossoms = [];
  [0.1, 0.35, 0.65, 0.9].forEach((t, i) => {
    const pt = journeyCurve.getPoint(t);
    const mat = new uc({
      map: blossomTex,
      transparent: true,
      depthWrite: false,
      fog: false,
      rotation: Math.random() * Math.PI * 2,
      opacity: 0.9
    });
    const s = new vf(mat);
    s.scale.setScalar(1.6 + (i % 2) * 0.5);
    s.position.copy(pt);
    s.userData = { baseY: pt.y, phase: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.5 };
    journeyGroup.add(s);
    journeyBlossoms.push(s);
  });
  scene.add(journeyGroup);
  
  // 4. Skills Orbital Constellation (Station 3)
  const skillsGroup = new li();
  skillsGroup.position.set(Ba[3][0] + 4.5, Ba[3][1], Ba[3][2] - 3.5);
  
  // A blossom anchors the constellation where the solid core sphere was.
  const skillCore = new vf(new uc({
    map: blossomTex,
    transparent: true,
    depthWrite: false,
    fog: false,
    rotation: Math.random() * Math.PI * 2,
    opacity: 0.95
  }));
  skillCore.scale.setScalar(3.2);
  skillsGroup.add(skillCore);
  
  // One orbiting blossom per discipline instead of a faceted ball.
  const skillSatellites = [];
  const catKeys = Object.keys(skillsCatalog);
  catKeys.forEach((cat, idx) => {
    const angle = (idx / catKeys.length) * Math.PI * 2;
    const m = new vf(new uc({
      map: blossomTex,
      transparent: true,
      depthWrite: false,
      fog: false,
      rotation: Math.random() * Math.PI * 2,
      opacity: 0.8
    }));
    m.scale.setScalar(1.1 + Math.random() * 0.5);
    m.position.set(Math.cos(angle) * 3.4, Math.sin(angle) * 2.2, 0);
    m.userData = { phase: angle, spin: (Math.random() - 0.5) * 0.6 };
    skillsGroup.add(m);
    skillSatellites.push({ m, cat, angle });
  });
  scene.add(skillsGroup);
  
  // 5. Projects Interactive Tokens & Posidonia Seagrass Biome (Station 4)
  const projectGroup = new li();
  projectGroup.position.set(Ba[4][0] + 4.0, Ba[4][1], Ba[4][2] - 4.0);
  
  const seagrassRibbons = [];
  for (let i = 0; i < 18; i++) {
    const ribbonGeom = new Ha(0.22, 3.2 + Math.random() * 1.5, 1, 6);
    const ribbonMat = new Pf({
      color: 0x2dd4bf,
      roughness: 0.3,
      metalness: 0.2,
      emissive: 0x059669,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.75,
      side: 2
    });
    const ribbon = new Pe(ribbonGeom, ribbonMat);
    ribbon.position.set((Math.random() - 0.5) * 6, -1.8 + Math.random() * 1.4, (Math.random() - 0.5) * 4);
    ribbon.rotation.y = Math.random() * Math.PI;
    ribbon.userData = { phase: Math.random() * Math.PI * 2, speed: 1.2 + Math.random() * 1.5 };
    // Seagrass belongs to the underwater dive only — outside it these
    // read as stray grey shards against the sakura sky.
    ribbonMat.opacity = 0;
    projectGroup.add(ribbon);
    seagrassRibbons.push(ribbon);
  }
  scene.add(projectGroup);
  
  // 6. Cosmic Stardust Particle Cloud
  const particleCount = Rd ? 160 : 340;
  const pPos = new Float32Array(particleCount * 3);
  const pSpeeds = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    pPos.set([
      (Math.random() - 0.5) * 38,
      Math.random() * (ql + 24) - 6,
      12 - Math.random() * 32
    ], i * 3);
    pSpeeds[i] = 0.35 + Math.random() * 1.1;
  }
  const stardustGeom = new Se();
  stardustGeom.setAttribute("position", new ze(pPos, 3));
  const stardustMat = new hc({
    map: yy(),
    size: 0.28,
    sizeAttenuation: true,
    transparent: true,
    depthWrite: false,
    alphaTest: 0.02,
    opacity: 0.85,
    blending: gs,
    color: 0xe84393
  });
  const stardustPoints = new Mf(stardustGeom, stardustMat);
  scene.add(stardustPoints);
  
  // Sky Color Palette Lerp Helper
  const skyColors = Cd.sky.map(c => new wt(c));
  const currentSky = new wt();
  const getSkyColor = p => {
    const seg = p * (skyColors.length - 1);
    const idx = Math.min(Math.floor(seg), skyColors.length - 2);
    return currentSky.copy(skyColors[idx]).lerp(skyColors[idx + 1], seg - idx);
  };
  
  // Raycaster for 3D clicks
  const raycaster = new Gx();
  const allHitObjects = [...domainTokens.map(d => d.hit)];
  
  let isUnderwaterMode = false;
  const underwaterSky = new wt("#072029");
  const WHITE = new wt(0xffffff);
  let lastUi = null;
  
  return {
    setUnderwater(active) {
      isUnderwaterMode = active;
      pointLight.color.setHex(active ? 0x06b6d4 : 0xff2d87);
      petalMat.color.setHex(active ? 0x8ff0e0 : 0xffd9e6);
    },
    update(delta, time, pointer) {
      // Sky & Fog — plus the matching CSS surface ramp
      const baseSky = getSkyColor(stationController.progress);
      const targetSky = isUnderwaterMode ? underwaterSky : baseSky;
      scene.background = targetSky;
      scene.fog.color.copy(targetSky);

      // Day → dusk surfaces follow the same scroll progress.
      // Driven by scroll only — the dive tints the 3D sky, not the UI,
      // so opening a case study never yanks the palette back to daylight.
      const toneP = stationController.progress;

      // The glass UI swaps between two fully-contrasted palettes at the
      // halfway point, so text never fades into its own background.
      const ui = toneP >= Cd.uiFlip ? "dusk" : "day";
      if (ui !== lastUi) {
        lastUi = ui;
        document.body.dataset.ui = ui;
      }

      // Sun sinks and warms; horizon glow swells as dusk arrives
      sunSprite.position.y = 16 - toneP * 30;
      // It also swells, so the finale reads as a low sunrise disc.
      const sunScale = 13 + toneP * 9;
      sunSprite.scale.setScalar(sunScale);
      sunSprite.material.opacity = 0.4 + toneP * 0.12;
      sunSprite.material.color.setHSL(0.11 - toneP * 0.05, 0.75, 0.62 + toneP * 0.06);
      horizonGlow.material.opacity = 0.07 + toneP * 0.72;
      horizonGlow.position.y = -30 + toneP * 10;
      if (bloomPass) bloomPass.strength = 0.2 + toneP * 0.26;

      // Ambient light follows the hour of day
      ambient.color.copy(targetSky).lerp(WHITE, 0.55);
      ambient.intensity = 0.9 - toneP * 0.3;
      dirLight.color.setHSL(0.11 - toneP * 0.05, 0.4 + toneP * 0.35, 0.72 - toneP * 0.28);
      
      // Sakura blossoms: gentle bob, sway and slow tumble.
      // On station 0 the petal drift is switched off (below), so the
      // blossoms hold the whole composition alone: they are pushed a little
      // further toward the frame edges to keep the name card clear, and
      // slowed right down so the hero reads as calm rather than busy.
      const helloCalm = 1 - Qc.clamp(stationController.progress / 0.05, 0, 1);
      blossoms.forEach(s => {
        const u = s.userData;
        s.position.x = u.baseX * (1 + helloCalm * 0.35)
          + Math.sin(time * u.speed * 0.7 + u.phase) * 0.9 * (1 - helloCalm * 0.7);
        s.position.y = u.baseY + Math.sin(time * u.speed + u.phase) * 1.1 * (1 - helloCalm * 0.7);
        s.material.rotation += u.spin * delta * (1 - helloCalm * 0.7);
      });
      farBlossoms.forEach(s => {
        const u = s.userData;
        s.position.y = u.baseY + Math.sin(time * u.speed + u.phase) * 1.6 * (1 - helloCalm * 0.7);
        s.material.rotation += u.spin * delta * (1 - helloCalm * 0.7);
      });

      // Petals brighten slightly as the sky darkens so they read against dusk
      // — but they fade out entirely over the opening chapter, where the
      // brief is an uncluttered hero. The drifting specks sat on top of the
      // name card and read as dust. `petalFade` ramps back in as soon as the
      // camera leaves station 0, so the rest of the corridor keeps its drift.
      const petalFade = Qc.clamp((stationController.progress - 0.015) / 0.06, 0, 1);
      petalMat.opacity = (0.85 + toneP * 0.15) * petalFade;
      petalPoints.visible = petalFade > 0.01;

      // Petals fall with lateral sway, wrapping around the camera's
      // altitude so the drift follows the whole corridor.
      const camY = camera.position.y;
      const wrapLow = camY + BAND_DOWN, wrapHigh = camY + BAND_UP;
      for (let i = 0; i < petalCount; i++) {
        const idx = i * 3;
        const p = petals[i];
        petalPos[idx + 1] -= p.fall * delta;
        petalPos[idx] += Math.sin(time * p.sway + p.phase) * delta * 0.9;
        if (petalPos[idx + 1] < wrapLow) petalPos[idx + 1] = wrapHigh;
      }
      petalGeom.attributes.position.needsUpdate = true;
      
      // World Domain Tokens — they fade up as the camera arrives, so the
      // intro chapter shows only sky rather than the next station's props.
      const tokenFade = Qc.clamp((stationController.progress - 0.04) / 0.1, 0, 1);
      worldGroup.visible = tokenFade > 0.01;
      domainTokens.forEach(tok => {
        tok.mesh.material.opacity = tokenFade;
        tok.mesh.material.rotation += delta * tok.mesh.userData.spin;
        // Absolute offset from the stored base, not += , so the markers
        // drift instead of wandering off over time.
        tok.group.position.y = tok.baseY + Math.sin(time * 1.5 + tok.phase) * 0.15;
      });
      
      // Skills Blossom Orbit — gentle drift, no spinning ball
      skillsGroup.rotation.y += delta * 0.3;
      skillCore.material.rotation += delta * 0.25;
      skillSatellites.forEach(s => {
        s.m.material.rotation += delta * s.m.userData.spin;
        s.m.position.y += Math.sin(time * 1.2 + s.m.userData.phase) * 0.004;
      });
      journeyBlossoms.forEach(s => {
        s.material.rotation += delta * s.userData.spin;
        s.position.y = s.userData.baseY + Math.sin(time * 1.4 + s.userData.phase) * 0.25;
      });
      
      // Seagrass waves — faded in only during the underwater dive
      const weedTarget = isUnderwaterMode ? 0.75 : 0;
      seagrassRibbons.forEach(rib => {
        const m = rib.material;
        m.opacity += (weedTarget - m.opacity) * Math.min(delta * 5, 1);
        rib.visible = m.opacity > 0.01;
        rib.rotation.z = Math.sin(time * rib.userData.speed + rib.userData.phase) * 0.35;
        rib.rotation.x = Math.cos(time * rib.userData.speed * 0.8 + rib.userData.phase) * 0.1;
      });
      
      // Stardust drift
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        pPos[idx + 1] += pSpeeds[i] * delta * (isUnderwaterMode ? 1.2 : 0.45);
        pPos[idx] += Math.sin(time * 0.5 + i) * delta * 0.15;
        if (pPos[idx + 1] > ql + 16) pPos[idx + 1] = -6;
      }
      stardustGeom.attributes.position.needsUpdate = true;
      
      // Raycasting
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(allHitObjects);
      return intersects.length ? intersects[0].object.userData : null;
    }
  };
}

