/* =============================================
   MEGATONS SAÚDE — Script
   ============================================= */

/* ---------- Config ---------- */
const whatsappPhone = '559282310021';
const whatsappDefaultMsg = 'Olá! Gostaria de saber mais sobre os produtos da Megatons Saúde.';

/* ---------- Navbar scroll ---------- */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function onScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  toggleBackToTop();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run on load

/* ---------- Mobile menu ---------- */
let mobileMenu = null;

function buildMobileMenu() {
  if (mobileMenu) return;
  mobileMenu = document.createElement('div');
  mobileMenu.className = 'navbar__mobile-menu';
  mobileMenu.id = 'mobileMenu';

  const links = [
    { href: '#sobre',        label: 'Sobre' },
    { href: '#diferenciais', label: 'Diferenciais' },
    { href: '#parceiros',    label: 'Parceiros' },
    { href: '#produtos',     label: 'Produtos' },
    { href: '#clientes',     label: 'Clientes' },
    { href: '#redes',        label: 'Redes Sociais' },
    { href: '#contato',      label: 'Contato' },
  ];

  links.forEach(({ href, label }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    a.addEventListener('click', closeMobileMenu);
    mobileMenu.appendChild(a);
  });

  const waLink = document.createElement('a');
  waLink.href = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappDefaultMsg)}`;
  waLink.target = '_blank';
  waLink.rel = 'noopener noreferrer';
  waLink.className = 'btn btn--whatsapp';
  waLink.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    Fale Conosco
  `;
  mobileMenu.appendChild(waLink);

  navbar.appendChild(mobileMenu);
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  buildMobileMenu();
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/* Close menu when clicking outside */
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    if (!navbar.contains(e.target)) closeMobileMenu();
  }
});

/* ---------- Back to top ---------- */
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Scroll animations (fade-in) ---------- */
function setupFadeIn() {
  const targets = document.querySelectorAll(
    '.value-card, .partner-card, .contact-item, .card, .section__header, .contact-cta'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

if ('IntersectionObserver' in window) {
  setupFadeIn();
}

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = navbar ? navbar.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- Logo image fallback ---------- */
document.querySelectorAll('img[src="assets/logo.png"]').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const fallback = this.nextElementSibling;
    if (fallback && fallback.classList.contains('navbar__logo-fallback')) {
      fallback.style.display = 'block';
    }
  });
});
