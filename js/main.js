// ============================================================
//  Boot orchestration, event wiring, render loop.
//  Plain classic script: it reads globals from the files loaded above it.
//  Load order is fixed by index.html and must not change.
// ============================================================

// Main Boot Orchestration
const selectEl = s => document.querySelector(s);

function boot() {
  const introEl = selectEl("#intro");
  const countEl = selectEl("#count");
  const startBtn = selectEl("#start");
  const glCanvas = selectEl("#gl");
  const soundBtn = selectEl("#sound");
  const nextBtn = selectEl("#next");
  const barEl = selectEl("#bar");
  const modalEl = selectEl("#modal");
  
  // Custom Cursor
  const cursorDot = selectEl("#cursor-dot");
  const cursorRing = selectEl("#cursor-ring");
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  addEventListener("pointermove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    }
    const isInteractive = !!e.target.closest("button, a, input, textarea, .gallery-card, .cert-card, .domain-pill");
    document.body.classList.toggle("hovering", isInteractive);
  });
  
  const tickCursor = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    if (cursorRing) {
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
    }
    requestAnimationFrame(tickCursor);
  };
  tickCursor();
  
  // Audio Engine
  const soundEngine = new zy();
  soundBtn.onclick = () => {
    const isOn = soundEngine.toggle();
    soundBtn.setAttribute("aria-pressed", String(isOn));
  };
  
  // Three.js Setup
  const scenePack = xy(glCanvas);
  if (!scenePack) {
    introEl.remove();
    return;
  }
  
  const stationController = new My();
  const env = Ly(scenePack, stationController);
  const modalManager = setupModal(modalEl, soundEngine, env);
  
  const updatePanels = setupPanels(selectEl("#stations"), selectEl("#dots"), selectEl("#navbar"), idx => {
    stationController.goTo(idx);
    soundEngine.clickChime();
  });
  
  stationController.onStation = idx => {
    updatePanels(idx);
    soundEngine.chime(idx);
  };
  
  nextBtn.onclick = () => {
    stationController.goTo((stationController.nearest + 1) % stationController.count);
    soundEngine.clickChime();
  };
  
  // Render Project Cards & Cert Cards
  setTimeout(() => {
    const galleryRoot = selectEl("#gallery-root");
    if (galleryRoot) renderProjectsGrid(galleryRoot, idx => modalManager.showProject(idx));
    
    const certsRoot = selectEl("#certs-root");
    if (certsRoot) renderCertsGrid(certsRoot, idx => modalManager.showCert(idx));
    
    // Domain Pill Interactions
    document.querySelectorAll(".domain-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const id = pill.dataset.domain;
        const dom = worldDomains.find(d => d.id === id);
        const detailEl = selectEl("#domain-detail");
        if (dom && detailEl) {
          detailEl.innerHTML = `
            <b style="color: var(--pink-glow); font-size: 1rem;">${dom.icon} ${dom.title} — ${dom.tagline}</b>
            <p style="margin-top: 6px; font-size: 0.92rem; color: var(--text-warm);">${dom.desc}</p>
            <ul class="chips" style="margin-top: 8px;">${dom.tags.map(t => `<li>${t}</li>`).join("")}</ul>`;
        }
        document.querySelectorAll(".domain-pill").forEach(p => p.classList.toggle("active", p === pill));
        soundEngine.clickChime();
      });
    });
    
    // Skill Filter Tabs
    document.querySelectorAll(".skill-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".skill-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.cat;
        document.querySelectorAll(".skill-category-block").forEach(block => {
          if (cat === "all" || block.dataset.cat === cat) {
            block.style.display = "block";
          } else {
            block.style.display = "none";
          }
        });
        soundEngine.clickChime();
      });
    });
    
    // Hero CTAs
    const ctaExplore = selectEl("#cta-explore");
    if (ctaExplore) ctaExplore.onclick = () => { stationController.goTo(1); soundEngine.clickChime(); };
    
    const ctaWork = selectEl("#cta-work");
    if (ctaWork) ctaWork.onclick = () => { stationController.goTo(4); soundEngine.clickChime(); };
    
    // Contact Form Submission
    // This is a static page with no backend, so the form composes a real
    // mailto: with everything the visitor typed and hands it to their own
    // mail client. That actually delivers mail, unlike the old no-op that
    // just pretended a message had been sent.
    const contactForm = selectEl("#contact-form");
    if (contactForm) {
      const fName = selectEl("#c-name");
      const fEmail = selectEl("#c-email");
      const fMsg = selectEl("#c-msg");
      const fFeedback = selectEl("#c-feedback");

      contactForm.onsubmit = e => {
        e.preventDefault();

        const name = fName.value.trim();
        const email = fEmail.value.trim();
        const msg = fMsg.value.trim();
        const fail = text => {
          fFeedback.textContent = text;
          fFeedback.style.display = "block";
        };

        if (!name) { fail("Please add your name or company so I know who I'm replying to."); fName.focus(); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          fail("That email address doesn't look right — please check it.");
          fEmail.focus();
          return;
        }
        if (msg.length < 10) { fail("A little more detail helps me reply usefully. Please add a message."); fMsg.focus(); return; }

        const subject = `Portfolio enquiry from ${name}`;
        const body = [
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          "Message:",
          msg
        ].join("\n");

        const href = `mailto:${personalData.email}` +
          `?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(body)}`;

        window.location.href = href;

        fFeedback.textContent =
          "Your email app is opening with the message ready to send — just press send. If nothing happens, email me directly at " +
          personalData.email + ".";
        fFeedback.style.display = "block";
        soundEngine.chime(5);
        contactForm.reset();
      };
    }
  }, 100);
  
  // Render Loop
  const pointerNorm = new et();
  addEventListener("pointermove", e => {
    pointerNorm.set(
      (e.clientX / innerWidth) * 2 - 1,
      -(e.clientY / innerHeight) * 2 + 1
    );
  });
  
  const { camera, composer } = scenePack;
  const camPos = new D();
  const camLook = new D();
  const initOffset = { v: 1 };
  let lastTime = performance.now() / 1000;
  
  scenePack.renderer.setAnimationLoop(() => {
    if (document.hidden) return;
    const now = performance.now() / 1000;
    const dt = _s ? 0 : Math.min(now - lastTime, 0.05);
    lastTime = now;
    
    stationController.update();
    const p = stationController.progress;
    
    stationController.curve.getPoint(p, camPos);
    stationController.curve.getPoint(Math.min(p + 0.04, 1), camLook).setZ(camLook.z - 8);
    
    camera.position.copy(camPos).add(new D(
      pointerNorm.x * 1.2,
      -pointerNorm.y * 0.8 - initOffset.v * 8,
      initOffset.v * 14
    ));
    camera.lookAt(camLook);
    camera.updateProjectionMatrix();
    
    env.update(dt, now, pointerNorm);
    barEl.style.transform = `scaleX(${p})`;
    composer.render();
  });
  
  // Intro Loading Sequence
  const counterObj = { v: 0 };
  Zn.to(counterObj, {
    v: 100,
    duration: 1.6,
    ease: "power2.out",
    onUpdate: () => {
      countEl.textContent = String(Math.round(counterObj.v)).padStart(3, "0");
    },
    onComplete: () => {
      startBtn.hidden = false;
      introEl.classList.add("ready");
    }
  });
  
  startBtn.addEventListener("click", () => {
    soundBtn.setAttribute("aria-pressed", String(soundEngine.restore()));
    Zn.to(introEl, {
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => introEl.remove()
    });
    Zn.to(initOffset, {
      v: 0,
      duration: _s ? 0 : 2.4,
      ease: "power3.out"
    });
    soundEngine.chime(0);
  }, { once: true });
}

addEventListener("DOMContentLoaded", boot);


