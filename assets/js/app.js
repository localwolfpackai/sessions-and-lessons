/* Sessions & Lessons — interactions
   Theme toggle · scroll reveals · session filters · audience switch */

(() => {
  "use strict";

  /* ---- Theme toggle (no-flash setter runs inline in <head>) ---- */
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("sl-theme", next); } catch (e) { /* private mode */ }
    });
  }

  /* ---- Scroll reveal with stagger ---- */
  const reveals = document.querySelectorAll("[data-reveal]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const group = el.parentElement?.querySelectorAll(":scope > [data-reveal]");
          const index = group ? Array.prototype.indexOf.call(group, el) : 0;
          el.style.setProperty("--delay", `${Math.min(index, 6) * 90}ms`);
          el.classList.add("is-in");
          obs.unobserve(el);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---- Session filters ---- */
  const filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    const cards = document.querySelectorAll("[data-category]");
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".pill");
      if (!btn) return;
      const cat = btn.dataset.filter;
      filterBar.querySelectorAll(".pill").forEach((p) =>
        p.setAttribute("aria-pressed", String(p === btn))
      );
      cards.forEach((card) => {
        const show = cat === "all" || card.dataset.category === cat;
        card.style.display = show ? "" : "none";
      });
    });
  }

  /* ---- Audience switch (contact) ---- */
  const audience = document.querySelector("[data-audience]");
  if (audience) {
    const panels = document.querySelectorAll("[data-panel]");
    audience.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const target = btn.dataset.view;
      audience.querySelectorAll("button").forEach((b) =>
        b.setAttribute("aria-pressed", String(b === btn))
      );
      panels.forEach((p) =>
        p.classList.toggle("is-active", p.dataset.panel === target)
      );
    });
  }

  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
