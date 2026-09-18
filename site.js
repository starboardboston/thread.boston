// Shared site behavior for all pages (index + threshold1–5).
// Minimal vanilla JS: the native <dialog> handles Esc and the Close buttons
// (via method="dialog"); we only wire up "open" and backdrop-click-to-close.
// Every block feature-detects its elements, so pages without a citations
// dialog or lightbox (e.g. index.html) run the same file unchanged.

// Menu dialog: full-screen nav takeover opened from the header hamburger
// and the threshold pages' "Explore all thresholds" CTA. Closing is native:
// the X (form method="dialog"), the active link, and Esc. The hamburger's
// aria-expanded tracks the dialog's open state for assistive tech.
const menu = document.getElementById('menu');
if (menu) {
  const menuButtons = document.querySelectorAll('[data-opens-menu]');
  const setExpanded = (open) =>
    menuButtons.forEach((el) => el.setAttribute('aria-expanded', String(open)));
  menuButtons.forEach((el) =>
    el.addEventListener('click', () => {
      menu.showModal();
      setExpanded(true);
    })
  );
  menu.addEventListener('close', () => setExpanded(false));
}

// Citations dialog: opened from the footer link and the story's [1]/[2] markers.
const citations = document.getElementById('citations');
if (citations) {
  document.querySelectorAll('[data-opens-citations]').forEach((el) =>
    el.addEventListener('click', () => citations.showModal())
  );
  citations.addEventListener('click', (e) => {
    if (e.target === citations) citations.close();
  });
}

// Image lightbox: each [data-lightbox] button wraps a story photo and opens
// a larger view in its own <dialog>. Clicking the padded area around the
// photo (or the backdrop) closes it; Esc and the close button are native.
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach((el) => {
    const img = el.matches('img') ? el : el.querySelector('img');
    if (!img) return;
    const open = () => {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.showModal();
    };
    el.addEventListener('click', open);
    // The plus-circle icon on the photo's bottom edge opens the same view.
    const zoom = el.parentElement.querySelector('[data-lightbox-zoom]');
    if (zoom) zoom.addEventListener('click', open);
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
}

// Scroll reveal: fade each child of the .reveal container in once, the
// first time it enters the viewport. The .js tag on <html> arms the
// hidden state in CSS.
document.documentElement.classList.add('js');
const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      reveal.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal > *').forEach((el) => reveal.observe(el));

// Hero parallax: the hero photo drifts downward at 40% of scroll speed,
// capped at one viewport of scroll (the hero is off-screen past that).
// Skipped for reduced motion.
const heroPhoto = document.querySelector('[data-parallax]');
if (heroPhoto && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  let pending = false;
  const drift = () => {
    heroPhoto.style.transform =
      `translateY(${Math.min(window.scrollY, window.innerHeight) * 0.4}px)`;
    pending = false;
  };
  window.addEventListener('scroll', () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(drift);
    }
  }, { passive: true });
}
