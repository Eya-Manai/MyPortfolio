// ============================================================
//  Panel rendering, project and cert grids, case-study modal.
//  Plain classic script: it reads globals from the files loaded above it.
//  Load order is fixed by index.html and must not change.
// ============================================================

// UI Station Setup & Nav Builders
function setupPanels(container, navContainer, barContainer, onSelect) {
  container.innerHTML = chapters.map(ch => `<section class="panel" aria-label="${ch.label}">${ch.html}</section>`).join("");
  const panels = [...container.children];
  
  // Progress dots (right edge)
  navContainer.innerHTML = "";
  const navButtons = chapters.map((ch, idx) => {
    const btn = document.createElement("button");
    btn.dataset.t = ch.label;
    btn.setAttribute("aria-label", `Go to chapter ${ch.label} - ${ch.title}`);
    btn.onclick = () => onSelect(idx);
    navContainer.appendChild(btn);
    return btn;
  });

  // Labelled section navbar (top centre) — direct jumps for recruiters
  barContainer.innerHTML = "";
  const barButtons = chapters.map((ch, idx) => {
    const btn = document.createElement("button");
    btn.textContent = ch.title;
    btn.dataset.t = ch.label;
    btn.setAttribute("aria-label", `Go to ${ch.title}`);
    btn.onclick = () => onSelect(idx);
    barContainer.appendChild(btn);
    return btn;
  });
  
  return stationIdx => {
    panels.forEach((p, i) => p.classList.toggle("active", i === stationIdx));
    navButtons.forEach((b, i) => {
      b.classList.toggle("on", i === stationIdx);
      b.toggleAttribute("aria-current", i === stationIdx);
    });
    barButtons.forEach((b, i) => {
      const on = i === stationIdx;
      b.classList.toggle("on", on);
      if (on) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
      // Keep the active chip in view on narrow screens.
      if (on) b.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    });
  };
}

// Build Projects Grid
function renderProjectsGrid(container, onSelect) {
  const grid = document.createElement("div");
  grid.className = "gallery-grid";
  // Compact cards: cover, year, role and exactly 3 tech chips.
  grid.innerHTML = projectsData.map((p, idx) => `
    <button class="gallery-card ${p.featured ? 'featured' : ''}" data-idx="${idx}"
      aria-label="Open case study: ${p.title}">
      <div class="card-cover" style="background-image: url('${p.image}')">
        <span class="cover-year">${p.year}</span>
        ${p.video ? '<span class="cover-video-tag" aria-hidden="true">▶ Demo</span>' : ""}
        <span class="cover-arrow" aria-hidden="true">↗</span>
      </div>
      <div class="card-info">
        <div class="card-title">${p.title}</div>
        <div class="card-role">${p.role}</div>
        <ul class="card-chips">
          ${p.stack.slice(0, 3).map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
    </button>`).join("");
    
  container.appendChild(grid);
  [...grid.children].forEach((card, idx) => {
    card.addEventListener("click", () => onSelect(idx));
  });
}

// Build Certifications Grid
function renderCertsGrid(container, onSelect) {
  const grid = document.createElement("div");
  grid.className = "certs-grid";
  grid.innerHTML = certificationsData.map((c, idx) => `
    <div class="cert-card">
      <div class="cert-org-badge">${c.organization}</div>
      <h3 class="cert-title">${c.title}</h3>
      <div class="cert-meta">
        <span><b>Issued</b>${c.date}</span>
        <span><b>Format</b>${c.duration}</span>
      </div>
      <ul class="chips">${c.skills.slice(0, 2).map(s => `<li>${s}</li>`).join("")}</ul>
      <div class="cert-footer">
        <span class="cert-cred-id">${c.credentialId}</span>
        <button class="btn btn-secondary btn-small cert-inspect-btn" data-idx="${idx}">Inspect PDF ↗</button>
      </div>
    </div>`).join("");
    
  container.appendChild(grid);
  container.querySelectorAll(".cert-inspect-btn").forEach(btn => {
    btn.addEventListener("click", () => onSelect(parseInt(btn.dataset.idx, 10)));
  });
}

// Case Study & Credential Modal Controller
function setupModal(dialog, soundEngine, env) {
  const closeModal = () => {
    // A demo clip left playing would keep audible over the ambient drone.
    dialog.querySelectorAll("video").forEach(v => { v.pause(); });
    dialog.close();
    document.body.classList.remove("focus");
    env.setUnderwater(false);
  };
  
  dialog.addEventListener("click", e => {
    if (e.target === dialog) closeModal();
  });

  // Esc closes the dialog natively, bypassing closeModal.
  dialog.addEventListener("close", () => {
    dialog.querySelectorAll("video").forEach(v => { v.pause(); });
    document.body.classList.remove("focus");
    env.setUnderwater(false);
  });

  return {
    showProject(idx) {
      const p = projectsData[idx];
      if (p.hasUnderwaterMode) env.setUnderwater(true);

      // All key facts surfaced as scannable chips, no prose walls.
      const facts = [
        { label: "Role", value: p.role },
        { label: "Organization", value: p.at },
        { label: "Timeline", value: p.year }
      ];
      
      const shotsHtml = (p.screenshots || []).map((s, i) => `
        <figure><img src="${s}" alt="${p.title} visual ${i + 1}" loading="lazy"></figure>`).join("");

      // Video demo block. The <video> is hidden until its source proves
      // loadable, so a missing clip degrades to the placeholder panel
      // instead of leaving an empty black rectangle in the case study.
      const videoHtml = p.video ? `
        <p class="kicker">VIDEO DEMO</p>
        <div class="case-video">
          <div class="case-video-frame">
            <video controls preload="none" playsinline
              poster="${p.video.poster || p.image}"
              src="${p.video.src}"
              aria-label="${p.video.label || p.title + ' video demo'}"></video>
           
          </div>
          <div class="case-video-note">
            <b>${p.video.label || "Demo"}</b>
            <span>${p.video.note || ""}</span>
          </div>
        </div>` : "";

      const phoneHtml = (p.phoneShots || []).length ? `
        <p class="kicker">APP SCREENSHOTS</p>
        <div class="case-gallery case-gallery--phone">
          ${p.phoneShots.map((s, i) => `
            <figure data-shot-src="${s.src}">
              <img src="${s.src}" alt="${p.title} app screen ${i + 1}${s.caption ? " — " + s.caption : ""}" loading="lazy">
              <div class="case-shot-empty" hidden>
                <span aria-hidden="true">◫</span>
                <span>Screen pending</span>
              </div>
              ${s.caption ? `<figcaption>${s.caption}</figcaption>` : ""}
            </figure>`).join("")}
        </div>` : "";

      dialog.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" aria-label="Close case study">✕</button>

          <div class="case-head">
            <div class="case-title-block">
              <p class="kicker">CASE STUDY</p>
              <h2>${p.title}</h2>
              <p class="case-sub">${p.subtitle}</p>
              <div class="modal-meta-grid" style="margin: 0 0 1.2rem; padding: 0; border: none;">
                ${facts.map(f => `<div class="modal-meta-item"><span>${f.label}</span><b>${f.value}</b></div>`).join("")}
              </div>
              <ul class="chips" style="margin-bottom: 0;">${p.stack.map(s => `<li>${s}</li>`).join("")}</ul>
            </div>
            <div class="case-cover">
              <span class="case-year">${p.year}</span>
              <img src="${p.image}" alt="${p.title} cover" loading="lazy">
            </div>
          </div>

          <div class="case-sections">
            <div class="case-block">
              <h3>◈ The Challenge</h3>
              <p>${p.problem}</p>
            </div>
            <div class="case-block">
              <h3>✦ The Solution</h3>
              <p>${p.solution}</p>
            </div>
          </div>

          <div class="case-block" style="margin-bottom: clamp(20px, 3vw, 32px);">
            <h3>❋ My Role &amp; Engineering</h3>
            <p>${p.story}</p>
          </div>

          ${videoHtml}
          ${phoneHtml}

          <p class="kicker">VISUAL GALLERY</p>
          <div class="case-gallery">${shotsHtml || '<p class="mut">No visuals yet.</p>'}</div>

          <div class="case-cta">
            ${(p.links || []).map(l => `
              <a class="btn btn-secondary case-link-btn" href="${l.href}" target="_blank" rel="noopener"
                title="${l.note || ""}">${l.icon || "↗"} ${l.label}</a>`).join("")}
            <a class="btn" href="mailto:${personalData.email}?subject=Inquiry%20regarding%20${encodeURIComponent(p.title)}">Discuss This Project →</a>
            <button class="btn btn-secondary modal-done-btn">Back to Universe</button>
            <span class="case-hint">Press <b>Esc</b> to close</span>
          </div>
        </div>`;
        
      dialog.querySelector(".modal-close").addEventListener("click", closeModal);
      dialog.querySelector(".modal-done-btn").addEventListener("click", closeModal);

      // Swap the demo player for the placeholder if the clip is missing.
      const vid = dialog.querySelector(".case-video-frame video");
      if (vid) {
        const showPlaceholder = () => {
          vid.hidden = true;
          const ph = dialog.querySelector(".case-video-empty");
          if (ph) ph.hidden = false;
        };
        // preload="none" means no fetch until play, so probe the source
        // explicitly and let a 404 fall through to the placeholder.
        // The probe is skipped on file:// because fetch() cannot read local
        // files there and would always reject, hiding a perfectly valid clip.
        vid.addEventListener("error", showPlaceholder);
        if (location.protocol === "http:" || location.protocol === "https:") {
          fetch(vid.getAttribute("src"), { method: "HEAD" })
            .then(r => { if (!r.ok) showPlaceholder(); })
            .catch(showPlaceholder);
        }
      }

      // Same graceful fallback for handset shots that have not been added.
      dialog.querySelectorAll(".case-gallery--phone figure").forEach(fig => {
        const img = fig.querySelector("img");
        const ph = fig.querySelector(".case-shot-empty");
        const swap = () => {
          if (img) img.hidden = true;
          if (ph) ph.hidden = false;
        };
        if (!img) return;
        if (img.complete && img.naturalWidth === 0) swap();
        else img.addEventListener("error", swap);
      });

      document.body.classList.add("focus");
      dialog.showModal();
      dialog.scrollTop = 0;
      // Keep focus on the close button so Esc/Enter always work.
      dialog.querySelector(".modal-close").focus();
      soundEngine.clickChime();
    },
    
    showCert(idx) {
      const c = certificationsData[idx];
      dialog.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" aria-label="Close dialog">✕</button>
          <div class="modal-header">
            <div class="cert-org-badge">${c.organization}</div>
            <h2 style="margin-top: 12px;">${c.title}</h2>
            <p class="mut">${c.category} · ${c.duration}</p>
          </div>
          
          <div class="modal-meta-grid">
            <div class="modal-meta-item"><span>Issued By</span><b>${c.organization}</b></div>
            <div class="modal-meta-item"><span>Date</span><b>${c.date}</b></div>
            <div class="modal-meta-item"><span>Credential ID</span><b>${c.credentialId}</b></div>
          </div>
          
          <h3 style="color: var(--pink-soft);">Skills Verified:</h3>
          <ul class="chips">${c.skills.map(s => `<li>${s}</li>`).join("")}</ul>
          
          <p style="margin: 1.5rem 0;">This certification is a genuine, verified credential earned by Eya Manai as part of her engineering and AI curriculum.</p>
          
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a class="btn" href="${c.pdfFile}" target="_blank" rel="noopener">Open Official PDF ↗</a>
            <button class="btn btn-secondary modal-done-btn">Close</button>
          </div>
          <div class="cert-pdf-missing" hidden>
            <b>PDF not uploaded yet</b>
            <span>Drop the scan at <code>${c.pdfFile}</code> and this button will open it.</span>
          </div>
        </div>`;
        
      dialog.querySelector(".modal-close").addEventListener("click", closeModal);
      dialog.querySelector(".modal-done-btn").addEventListener("click", closeModal);

      // Same graceful degradation as the video block above: probe the file
      // and swap in a notice when it is absent, so a credential without its
      // scan never leaves a button that opens a broken tab.
      const pdfLink = dialog.querySelector('.modal-content a[href$=".pdf"], .modal-content a[href$=".PDF"]');
      const pdfNote = dialog.querySelector(".cert-pdf-missing");
      if (pdfLink && pdfNote) {
        const markMissing = () => { pdfLink.hidden = true; pdfNote.hidden = false; };
        // Skipped on file:// — fetch() cannot read local files there and
        // would always reject, hiding a perfectly valid PDF.
        if (location.protocol === "http:" || location.protocol === "https:") {
          fetch(pdfLink.getAttribute("href"), { method: "HEAD" })
            .then(r => { if (!r.ok) markMissing(); })
            .catch(markMissing);
        }
      }

      document.body.classList.add("focus");
      dialog.showModal();
      dialog.scrollTop = 0;
      soundEngine.clickChime();
    }
  };
}

