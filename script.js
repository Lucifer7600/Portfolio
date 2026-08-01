const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));
document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  window.setTimeout(() => document.querySelector('.loader')?.classList.add('is-gone'), reduceMotion ? 0 : 1050);
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  reveals.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
    revealObserver.observe(item);
  });
} else {
  reveals.forEach((item) => item.classList.add('is-visible'));
}

const progress = document.querySelector('.scroll-progress');
const updateScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
};
addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
  const orb = document.querySelector('.cursor-orb');
  let ox = innerWidth / 2, oy = innerHeight / 2, tx = ox, ty = oy;
  addEventListener('pointermove', (event) => { tx = event.clientX; ty = event.clientY; }, { passive: true });
  const follow = () => {
    ox += (tx - ox) * .075; oy += (ty - oy) * .075;
    if (orb) orb.style.transform = `translate(${ox - 170}px,${oy - 170}px)`;
    requestAnimationFrame(follow);
  };
  follow();

  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px,${(event.clientY - rect.top - rect.height / 2) * .16}px)`;
    });
    button.addEventListener('pointerleave', () => button.style.transform = '');
  });

  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - .5) * -8;
      const ry = ((event.clientX - rect.left) / rect.width - .5) * 10;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}

const canvas = document.getElementById('atmosphere');
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * ratio; canvas.height = innerHeight * ratio;
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: Math.min(70, Math.floor(innerWidth / 18)) }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: Math.random() * 1.25 + .2, speed: Math.random() * .16 + .04,
      drift: (Math.random() - .5) * .08, alpha: Math.random() * .34 + .05
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach((p) => {
      p.y -= p.speed; p.x += p.drift;
      if (p.y < -4) { p.y = innerHeight + 4; p.x = Math.random() * innerWidth; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226,195,124,${p.alpha})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  resize(); draw(); addEventListener('resize', resize);
}
