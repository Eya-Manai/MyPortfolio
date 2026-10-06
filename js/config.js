// ============================================================
//  Tuning constants, station coordinates, sky palette, procedural sprite textures.
//  Plain classic script: it reads globals from the files loaded above it.
//  Load order is fixed by index.html and must not change.
// ============================================================

// 3D Engine Setup
let pr = {
  damping: 0.05,
  wheelSpeed: 0.00035,
  dragSpeed: 0.0007,
  snapDelayMs: 350,
  travelSeconds: 1.6,
  maxDpr: 2
};

// 7 Spline coordinates for the camera curve
let Ba = [
  [0, 0, 9],       // 0: Hero / Hello
  [4.8, 15, 2],    // 1: About / My World
  [-5.2, 32, -6],  // 2: Journey / Path
  [5.2, 50, -2],   // 3: Skills Ecosystem
  [-5.0, 68, -6],  // 4: Projects Gallery
  [4.8, 86, -3],   // 5: Certifications Vault
  [0, 102, 1]      // 6: Contact Finale
];
let ql = Ba[Ba.length - 1][1];
// Device + motion flags. These previously existed only inside a stale
// config block baked into the vendor bundle, which made them load-bearing
// by accident. They are declared here so nothing depends on vendor internals.
const _s = matchMedia("(prefers-reduced-motion: reduce)").matches;
const Rd = matchMedia("(max-width: 700px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;

// 3D Engine Tuning


// ──────────────────────────────────────────────
// DAY → DUSK SUNRISE PROGRESSION
// Chapter 0 opens in bright sunshine; each stop
// deepens the sky until Chapter 6 sits at a dark
// magenta sunrise with a glowing horizon.
// ──────────────────────────────────────────────
let Cd = {
  sky: [
    "#ffe8f0", // 0 Hero:   bright morning sunshine
    "#ffe2ea", // 1 World:  warm golden hour
    "#fdd2e0", // 2 Journey: apricot mid-sky
    "#eeaed2", // 3 Skills:  rose dusk
    "#d489c8", // 4 Work:    violet twilight
    "#8a4a99", // 5 Certs:   plum nightfall
    "#2e1046"  // 6 Contact: dark sunrise horizon
  ],
  // Scroll progress at which the glass UI flips to the dark palette.
  // Stations sit at i / 6, so 4/6 lands exactly on Projects: Skills (3/6)
  // stays fully in the light palette instead of straddling the swap.
  uiFlip: 4 / 6
};

// Procedural Sprite Canvas Helpers
const Dd = r => {
  const t = document.createElement("canvas");
  t.width = t.height = 64;
  r(t.getContext("2d"));
  return new sx(t);
};

// Higher-resolution variant for sprites that scale up close to camera.
const skTex = (size, r) => {
  const t = document.createElement("canvas");
  t.width = t.height = size;
  const g = t.getContext("2d");
  g.scale(size / 64, size / 64);
  r(g);
  const tex = new sx(t);
  tex.anisotropy = 4;
  return tex;
};

const yy = () => Dd(r => {
  r.fillStyle = "#fff";
  r.shadowColor = "#ff2d87";
  r.shadowBlur = 10;
  r.beginPath();
  for (let t = 0; t < 8; t++) {
    const e = t * Math.PI / 4 - Math.PI / 2;
    const n = t % 2 ? 6 : 28;
    r.lineTo(32 + Math.cos(e) * n, 32 + Math.sin(e) * n);
  }
  r.fill();
});

const Ld = () => Dd(r => {
  const t = r.createRadialGradient(32, 32, 0, 32, 32, 32);
  t.addColorStop(0, "#ffffff");
  t.addColorStop(0.3, "#ff5ca0");
  t.addColorStop(0.65, "#8b3dff");
  t.addColorStop(1, "rgba(255, 45, 135, 0)");
  r.fillStyle = t;
  r.fillRect(0, 0, 64, 64);
});

// ══════════════════════════════════════════════════
// SAKURA ATMOSPHERE
// Procedural blossom, petal and cloud sprites that
// persist behind the 3D journey for every chapter.
// ══════════════════════════════════════════════════

// Five-petal sakura blossom with the characteristic notched petal tip.
const BlossomTex = () => skTex(256, r => {
  const c = 32;
  for (let t = 0; t < 5; t++) {
    r.save();
    r.translate(c, c);
    r.rotate((t / 5) * Math.PI * 2 - Math.PI / 2);
    const g = r.createLinearGradient(0, -4, 0, -30);
    g.addColorStop(0, "#ffe0ee");
    g.addColorStop(0.4, "#ffa3c6");
    g.addColorStop(1, "#ef5d8f");
    r.fillStyle = g;
    r.beginPath();
    // One closed path: base → left flank → notched tip → right flank.
    r.moveTo(0, -5);
    r.bezierCurveTo(-11, -12, -14, -24, -5.5, -30);
    r.lineTo(0, -25);
    r.lineTo(5.5, -30);
    r.bezierCurveTo(14, -24, 11, -12, 0, -5);
    r.closePath();
    r.fill();
    r.restore();
  }
  // Soft core + radiating stamens
  const core = r.createRadialGradient(c, c, 0, c, c, 9);
  core.addColorStop(0, "rgba(255,255,255,0.95)");
  core.addColorStop(1, "rgba(255,255,255,0)");
  r.fillStyle = core;
  r.beginPath();
  r.arc(c, c, 9, 0, Math.PI * 2);
  r.fill();
  r.strokeStyle = "rgba(214,51,132,0.4)";
  r.lineWidth = 0.9;
  for (let t = 0; t < 9; t++) {
    const e = (t / 9) * Math.PI * 2;
    r.beginPath();
    r.moveTo(c + Math.cos(e) * 3, c + Math.sin(e) * 3);
    r.lineTo(c + Math.cos(e) * 11, c + Math.sin(e) * 11);
    r.stroke();
  }
});

// Single cherry petal, teardrop shaped with a soft base.
const PetalTex = () => skTex(128, r => {
  const g = r.createLinearGradient(32, 4, 32, 60);
  g.addColorStop(0, "#fff2f8");
  g.addColorStop(0.5, "#ffb3d1");
  g.addColorStop(1, "#f06292");
  r.fillStyle = g;
  r.beginPath();
  r.moveTo(32, 3);
  r.bezierCurveTo(52, 18, 56, 44, 32, 60);
  r.bezierCurveTo(8, 44, 12, 18, 32, 3);
  r.closePath();
  r.fill();
});

// NOTE: the drifting "cloud bank" sprites (CloudTex + the addCloud layers)
// were removed — tinted mauve and scaled up to 38 units they read as hard
// soap bubbles rather than soft sky, so the sky is now gradient + sun glow
// + blossoms + petal drift only.

