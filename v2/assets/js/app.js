/* Sessions & Lessons v2 — interactions */
(() => {
  "use strict";
  const root = document.documentElement;

  /* Theme */
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("sl-theme", next); } catch (e) {}
    });
  }

  /* Reveal with stagger */
  const reveals = document.querySelectorAll("[data-reveal]");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const sibs = e.target.parentElement?.querySelectorAll(":scope > [data-reveal]");
        const i = sibs ? Array.prototype.indexOf.call(sibs, e.target) : 0;
        e.target.style.setProperty("--d", `${Math.min(i, 6) * 70}ms`);
        e.target.classList.add("in");
        obs.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((el) => io.observe(el));
  }

  /* Modal (dialog) open/close */
  document.querySelectorAll("[data-open-modal]").forEach((b) => {
    b.addEventListener("click", () => {
      const dlg = document.querySelector(b.dataset.openModal);
      if (dlg?.showModal) dlg.showModal();
    });
  });
  document.querySelectorAll("dialog [data-close]").forEach((b) => {
    b.addEventListener("click", () => b.closest("dialog").close());
  });

  /* Deep-link: #ask opens the modal */
  if (location.hash === "#ask") {
    const d = document.querySelector("#ask");
    if (d && d.showModal) d.showModal();
  }

  /* Year */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
