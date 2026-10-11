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
