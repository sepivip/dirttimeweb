/**
 * DIRTTIME - App Landing Page
 */

(function() {
  'use strict';

  // ============================================
  // SPA Router
  // ============================================

  const pages = {
    home: document.getElementById('page-home'),
    support: document.getElementById('page-support'),
    feedback: document.getElementById('page-feedback'),
    privacy: document.getElementById('page-privacy'),
    terms: document.getElementById('page-terms')
  };

  function getPageFromHash() {
    const hash = window.location.hash.slice(1);
    if (hash && pages[hash]) {
      return hash;
    }
    // Check for #features or other home page anchors
    if (hash === 'features' || hash === '') {
      return 'home';
    }
    return 'home';
  }

  function navigateTo(pageName, scrollToTop = true) {
    // Hide all pages
    Object.values(pages).forEach(page => {
      if (page) page.classList.remove('active');
    });

    // Show the target page
    if (pages[pageName]) {
      pages[pageName].classList.add('active');
    }

    // Update active nav links
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.removeAttribute('aria-current');
      if (link.getAttribute('data-nav') === pageName) {
        link.setAttribute('aria-current', 'page');
      }
    });

    // Scroll to top for page changes
    if (scrollToTop && pageName !== 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Update document title
    const titles = {
      home: 'DIRTTIME - Dirt Bike Maintenance Tracker',
      support: 'Support - DIRTTIME',
      feedback: 'Feedback - DIRTTIME',
      privacy: 'Privacy Policy - DIRTTIME',
      terms: 'Terms of Service - DIRTTIME'
    };
    document.title = titles[pageName] || titles.home;
  }

  // Handle hash changes
  window.addEventListener('hashchange', () => {
    const page = getPageFromHash();
    navigateTo(page);
  });

  // Initial page load
  navigateTo(getPageFromHash(), false);

  // Handle navigation clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-nav]');
    if (link) {
      const navTarget = link.getAttribute('data-nav');
      if (pages[navTarget]) {
        e.preventDefault();
        window.location.hash = navTarget === 'home' ? '' : navTarget;
        navigateTo(navTarget);
      }
    }
  });

  // ============================================
  // Mobile Navigation
  // ============================================

  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');
      mobileMenu.setAttribute('aria-hidden', isExpanded);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        navToggle.focus();
      }
    });
  }

  // ============================================
  // Smooth Scroll (for in-page anchors like #features)
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      // Skip if this is a nav link (handled above)
      if (this.hasAttribute('data-nav')) return;

      const targetId = href.slice(1);

      // If it's a page anchor, let the router handle it
      if (pages[targetId]) return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // FAQ Accordion
  // ============================================

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        const faqAnswer = faq.querySelector('.faq-answer');
        if (faqAnswer) faqAnswer.setAttribute('hidden', '');
      });

      // Toggle current item
      if (!isExpanded) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
      }
    });
  });

  // ============================================
  // Screenshot Slider (duplicate for infinite scroll)
  // ============================================

  const slider = document.querySelector('.screenshots-slider');
  if (slider) {
    slider.innerHTML = slider.innerHTML + slider.innerHTML;
  }

  // ============================================
  // WebGL Background
  // ============================================

  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(st);
        st *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      float aspect = uResolution.x / uResolution.y;
      vec2 centered = (uv - 0.5) * vec2(aspect, 1.0);

      float t = uTime * 0.1;
      float n = fbm(centered * 2.0 + t);

      float gradient = 1.0 - length(centered) * 0.7;
      float pattern = gradient * 0.25 + n * 0.12;

      vec3 dark = vec3(0.039);
      vec3 mid = vec3(0.065);
      vec3 color = mix(dark, mid, clamp(pattern, 0.0, 1.0));

      // Subtle KTM Orange accent glow
      float glow = smoothstep(0.6, 0.0, length(centered - vec2(0.2, 0.1))) * 0.02;
      color = mix(color, vec3(1.0, 0.4, 0.0), glow);

      // Grain
      float grain = random(gl_FragCoord.xy + uTime * 100.0) * 0.025;
      color += grain - 0.0125;

      // Vignette
      color *= 1.0 - length(uv - 0.5) * 0.4;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  };

  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
  const geometry = new THREE.PlaneGeometry(2, 2);
  scene.add(new THREE.Mesh(geometry, material));

  let mouseX = 0.5, mouseY = 0.5;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = 1.0 - e.clientY / window.innerHeight;
  });

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    uniforms.uTime.value = performance.now() * 0.001;
    uniforms.uMouse.value.x += (mouseX - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (mouseY - uniforms.uMouse.value.y) * 0.05;
    renderer.render(scene, camera);
  }

  animate();

})();
