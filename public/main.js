/**
 * DIRTTIME website interactions
 */

(function() {
  'use strict';

  // ============================================
  // App Store click tracking for the live site.
  // Keep the public X Pixel and event IDs used by the existing campaign.
  if (window.location.hostname === 'dirttime.xyz') {
    if (!window.twq) {
      const twq = (...args) => {
        if (twq.exe) twq.exe(...args);
        else twq.queue.push(args);
      };
      twq.version = '1.1';
      twq.queue = [];
      window.twq = twq;
      const pixel = document.createElement('script');
      pixel.async = true;
      pixel.src = 'https://static.ads-twitter.com/uwt.js';
      document.head.append(pixel);
    }

    window.twq('config', 'rc2z0');
    document.addEventListener('click', (event) => {
      if (event.target.closest('a[data-app-store]')) {
        window.twq('event', 'tw-rc2z0-rc307', {});
      }
    });
  }

  // ============================================
  // Mobile Navigation
  // ============================================

  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', (e) => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');
      mobileMenu.setAttribute('aria-hidden', isExpanded);
      if (e.pointerType === 'touch' || e.pointerType === 'mouse') {
        navToggle.blur();
      }
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
  // Screenshot Slider (duplicate for infinite scroll)
  // ============================================

  const slider = document.querySelector('.screenshots-slider');
  if (slider && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const copies = Array.from(slider.children, (screenshot) => {
      const copy = screenshot.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      return copy;
    });
    slider.append(...copies);
  }

  // ============================================
  // WebGL Background — desktop only, respects reduced motion
  // ============================================

  const canvas = document.getElementById('webgl-canvas');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isNarrowViewport = window.innerWidth < 768;

  if (!canvas || prefersReducedMotion || isNarrowViewport) return;

  const threeScript = document.createElement('script');
  threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  threeScript.async = true;
  threeScript.onload = initWebGL;
  document.head.appendChild(threeScript);

  function initWebGL() {
    if (typeof THREE === 'undefined') return;

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

        float glow = smoothstep(0.6, 0.0, length(centered - vec2(0.2, 0.1))) * 0.02;
        color = mix(color, vec3(1.0, 0.4, 0.0), glow);

        float grain = random(gl_FragCoord.xy + uTime * 100.0) * 0.025;
        color += grain - 0.0125;

        color *= 1.0 - length(uv - 0.5) * 0.4;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    });

    let rafId = null;
    function animate() {
      rafId = requestAnimationFrame(animate);
      uniforms.uTime.value = performance.now() * 0.001;
      renderer.render(scene, camera);
    }
    animate();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      } else if (rafId === null) {
        animate();
      }
    });
  }

})();
