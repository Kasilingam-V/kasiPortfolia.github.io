/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// 🎮 Game-style media gallery
(function () {
  const mainContainer = document.querySelector('.media-main');
  const thumbs = document.querySelectorAll('.media-thumbs .thumb');
  const lightboxTrigger = document.getElementById('lightboxTrigger');

  if (!mainContainer || !thumbs.length) return;

  function setActiveThumb(el) {
    thumbs.forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  function renderMedia(type, src) {
    mainContainer.innerHTML = `
      ${type === 'video'
        ? `<video id="mainMedia" class="w-100 rounded shadow" controls autoplay>
             <source src="${src}" type="video/mp4">
           </video>`
        : `<img id="mainMedia" src="${src}" class="w-100 rounded shadow" alt="Preview">`
      }
      <a id="lightboxTrigger"
         href="${src}"
         class="glightbox position-absolute top-0 end-0 m-2 text-white">
        <i class="bi bi-arrows-fullscreen fs-4"></i>
      </a>
    `;

    // Re-init lightbox for new element
    GLightbox({ selector: '.glightbox' });
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const type = thumb.dataset.type;
      const src = thumb.dataset.src;

      setActiveThumb(thumb);
      renderMedia(type, src);
    });
  });

  // ⌨️ Keyboard navigation (left/right)
  document.addEventListener('keydown', (e) => {
    const current = document.querySelector('.thumb.active');
    if (!current) return;

    const list = Array.from(thumbs);
    let idx = list.indexOf(current);

    if (e.key === 'ArrowRight') idx = (idx + 1) % list.length;
    if (e.key === 'ArrowLeft') idx = (idx - 1 + list.length) % list.length;

    const next = list[idx];
    if (next) next.click();
  });
})();


// 🎮 Game-style hover preview
(function () {
  let video = document.getElementById('mainMedia');
  let progress = document.querySelector('.video-progress');
  let timeLabel = document.querySelector('.video-time');

  if (!video) return;

  let hovering = false;
    
  if (type === 'video') {
  mainContainer.innerHTML = `
    <video id="mainMedia" class="w-100 rounded shadow"
      src="${src}" muted preload="metadata" playsinline controls></video>
    <div class="video-progress"></div>
    <div class="video-time">0:00</div>
    <a href="${src}" class="glightbox position-absolute top-0 end-0 m-2 text-white">
      <i class="bi bi-arrows-fullscreen fs-4"></i>
    </a>
  `;

  const video = document.getElementById('mainMedia');
  video.play().catch(() => {}); // autoplay attempt
}

  function formatTime(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  video.addEventListener('mouseenter', () => {
    hovering = true;
    video.pause();
  });

  video.addEventListener('mouseleave', () => {
    hovering = false;
    video.currentTime = 0;
    if (progress) progress.style.width = "0%";
  });

  video.addEventListener('mousemove', (e) => {
    if (!hovering || !video.duration) return;

    const rect = video.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;

    video.currentTime = percent * video.duration;

    if (progress) {
      progress.style.width = (percent * 100) + "%";
    }

    if (timeLabel) {
      timeLabel.textContent = formatTime(video.currentTime);
    }
  });
})();

