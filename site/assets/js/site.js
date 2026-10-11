(() => {
  // Mobile nav + "More" dropdown
  const navEl = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  if (toggle && navEl) {
    toggle.addEventListener("click", () => {
      const open = navEl.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
  const more = document.querySelector(".nav__more");
  const moreBtn = document.querySelector(".nav__more-btn");
  if (more && moreBtn) {
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = more.classList.toggle("is-open");
      moreBtn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", () => {
      more.classList.remove("is-open");
      moreBtn.setAttribute("aria-expanded", "false");
    });
  }

  // One Book button at a time: hide the header button while any in-page book CTA is visible.
  const headerBtn = document.querySelector(".header-book");
  const ctas = [...document.querySelectorAll(".js-book-cta")];
  if (headerBtn && ctas.length && "IntersectionObserver" in window) {
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && e.target.offsetParent !== null) visible.add(e.target);
        else visible.delete(e.target);
      }
      headerBtn.classList.toggle("is-cta-hidden", visible.size > 0);
    });
    ctas.forEach((c) => io.observe(c));
  }

  // Reviews carousel: 3 at a time (1 on narrow screens), prev/next + "n / n"
  document.querySelectorAll(".carousel").forEach((car) => {
    const items = [...car.querySelectorAll(".review")];
    const count = car.querySelector(".carousel__count");
    let page = 0;
    const per = () => (window.matchMedia("(max-width: 56rem)").matches ? 1 : Number(car.dataset.per || 3));
    const render = () => {
      const p = per();
      const pages = Math.ceil(items.length / p);
      page = (page + pages) % pages;
      items.forEach((it, i) => (it.hidden = Math.floor(i / p) !== page));
      if (count) count.textContent = `${page + 1} / ${pages}`;
    };
    car.querySelectorAll(".carousel__btn").forEach((b) =>
      b.addEventListener("click", () => {
        page += Number(b.dataset.dir);
        render();
      }),
    );
    window.addEventListener("resize", render);
    render();
  });

  // Home hero: infinite 3D concave-arc carousel with snap-to-card settling
  const spot = document.getElementById("spot");
  if (spot) {
    const stage = document.getElementById("spot-stage");
    const ring = document.getElementById("spot-ring");
    const data = JSON.parse(document.getElementById("spot-data").textContent);
    const WORKS = data.works;
    const CFG = { slots: data.slots, cardScale: 1, cardRatio: 1.36, radiusK: 4.4, arcDepth: 0.48, perspective: 1.35, drag: 0.11, damp: 0.94 };
    const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pad2 = (n) => String(n).padStart(2, "0");
    const stepDeg = () => 360 / CFG.slots;
    const cards = [...ring.querySelectorAll(".card")];
    const dots = [...document.querySelectorAll("#spot-dots button")];
    const $ = (id) => document.getElementById(id);
    const ui = { cur: $("spot-cur"), title: $("spot-title"), meta: $("spot-meta"), link: $("spot-link"), ghost: $("spot-ghost") };

    const layout = () => {
      const vw = innerWidth;
      // phones get proportionally larger cards so the arc fills the screen
      const cw = (vw < 760 ? Math.min(230, vw * 0.5) : Math.min(238, Math.max(150, vw * 0.17))) * CFG.cardScale;
      const ch = cw * CFG.cardRatio, r = cw * CFG.radiusK;
      stage.style.setProperty("--cw", cw + "px");
      stage.style.setProperty("--ch", ch + "px");
      stage.style.setProperty("--r", r + "px");
      stage.style.setProperty("--push", r * (1 - CFG.arcDepth) + "px");
      stage.style.perspective = Math.max(700, vw * 0.8 * CFG.perspective) + "px";
    };

    let rot = 0, vel = 0, dragging = false, lastX = 0, downX = 0, moved = false, targetIndex = 0, settled = true, lastRot = NaN;
    let lastFrontSlot = 0, lastCard = 0;
    const applyRot = () => { if (rot !== lastRot) { ring.style.setProperty("--rot", rot + "deg"); lastRot = rot; } };
    const frontSlot = () => ((Math.round(-rot / stepDeg()) % CFG.slots) + CFG.slots) % CFG.slots;
    const render = () => {
      const fs = frontSlot();
      if (fs !== lastFrontSlot) { cards[lastFrontSlot].classList.remove("-front"); cards[fs].classList.add("-front"); lastFrontSlot = fs; }
      // pull in the images that are about to rotate into view
      for (let k = -5; k <= 5; k++) { const im = cards[(((fs + k) % CFG.slots) + CFG.slots) % CFG.slots].querySelector("img"); if (im.loading === "lazy") im.loading = "eager"; }
      const ci = fs % WORKS.length;
      if (ci !== lastCard) {
        const w = WORKS[ci];
        ui.title.textContent = w.title; ui.meta.textContent = w.meta; ui.link.href = w.href;
        ui.cur.textContent = ui.ghost.textContent = pad2(ci + 1);
        dots.forEach((d, i) => { d.classList.toggle("-on", i === ci); d.setAttribute("aria-selected", String(i === ci)); });
        lastCard = ci;
      }
    };
    const nearestCenter = () => Math.round(-rot / stepDeg());
    const go = (delta) => { targetIndex = nearestCenter() + delta; settled = true; vel = 0; };
    const focusBy = (i, n) => {
      const cs = nearestCenter();
      let d = (((i - (cs % n)) % n) + n) % n;
      if (d > n / 2) d -= n;
      targetIndex = cs + d; settled = true; vel = 0;
    };

    stage.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true; lastX = downX = e.clientX; moved = false; vel = 0; settled = false;
      stage.classList.add("-drag");
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      if (Math.abs(e.clientX - downX) > 6) moved = true;
      const d = -dx * CFG.drag; rot += d; vel = d;
    });
    stage.addEventListener("pointerup", (e) => {
      dragging = false; settled = false; stage.classList.remove("-drag");
      if (!moved) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const card = el && el.closest(".card");
        if (card) focusBy(+card.dataset.slot, CFG.slots);
      }
    });
    stage.addEventListener("pointercancel", () => { dragging = false; stage.classList.remove("-drag"); });
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    });
    $("spot-next").addEventListener("click", () => go(1));
    $("spot-prev").addEventListener("click", () => go(-1));
    dots.forEach((d, i) => d.addEventListener("click", () => focusBy(i, WORKS.length)));

    // Auto-run: the ring turns continuously (DRIFT deg/s), slowing to HOVER_SLOW on hover. Any
    // drag / arrow / button / dot interaction or keyboard focus hands control to snap-to-card
    // mode; the drift resumes IDLE_MS after the last interaction. Off for reduced-motion users.
    const DRIFT = 4.5, HOVER_SLOW = 0.3, IDLE_MS = 4000;
    let hovering = false, focused = false, inView = true, speed = 1;
    let lastInteract = -Infinity, lastT = performance.now();
    const interact = () => { lastInteract = performance.now(); };
    stage.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") hovering = true; });
    stage.addEventListener("pointerleave", () => { hovering = false; });
    stage.addEventListener("focus", () => { focused = true; interact(); });
    stage.addEventListener("blur", () => { focused = false; });
    ["pointerdown", "keydown"].forEach((t) => stage.addEventListener(t, interact));
    [$("spot-next"), $("spot-prev"), ...dots].forEach((b) => b.addEventListener("click", interact));
    if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(spot);

    const tick = (now = performance.now()) => {
      const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
      const drifting = !REDUCE && !dragging && !focused && inView && now - lastInteract > IDLE_MS && Math.abs(vel) < 0.05;
      if (drifting) {
        // ease the speed toward full (or hover-slow) so starts and slow-downs are smooth
        speed += ((hovering ? HOVER_SLOW : 1) - speed) * Math.min(1, dt * 3);
        rot -= DRIFT * speed * dt; settled = false;
      } else if (!dragging) {
        speed = 0;
        rot += vel; vel *= CFG.damp;
        if (Math.abs(vel) < 0.05) {
          if (!settled) { targetIndex = nearestCenter(); settled = true; }
          const diff = -targetIndex * stepDeg() - rot;
          if (Math.abs(diff) < 0.01) rot = -targetIndex * stepDeg();
          else rot += diff * (REDUCE ? 1 : 0.14);
        } else settled = false;
      }
      applyRot(); render();
      requestAnimationFrame(tick);
    };
    layout(); applyRot(); render(); tick();
    addEventListener("resize", layout);
  }

  // Promotion popup: first visit only, dismissable, Escape closes
  const promo = document.getElementById("promo");
  const KEY = "tcn-promo-dismissed";
  let seen = false;
  try { seen = localStorage.getItem(KEY) === "1"; } catch (_) {}
  if (promo && !seen) {
    let lastFocus = null;
    const close = () => {
      promo.hidden = true;
      try { localStorage.setItem(KEY, "1"); } catch (_) {}
      if (lastFocus) lastFocus.focus();
    };
    setTimeout(() => {
      lastFocus = document.activeElement;
      promo.hidden = false;
      promo.querySelector(".promo__close").focus();
    }, 2500);
    promo.querySelector(".promo__close").addEventListener("click", close);
    promo.addEventListener("click", (e) => { if (e.target === promo) close(); });
    promo.querySelector(".js-book-cta").addEventListener("click", () => { try { localStorage.setItem(KEY, "1"); } catch (_) {} });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !promo.hidden) close(); });
  }
})();
