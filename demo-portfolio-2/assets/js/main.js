/**
* Template Name: Active
* Template URL: https://bootstrapmade.com/active-bootstrap-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
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

  // Add this script to your HTML or external JS file
  window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
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
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper tabs sliders
   */
  function initSwiperTabs() {
    document
      .querySelectorAll(".init-swiper-tabs")
      .forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        const dotsContainer = swiperElement
          .closest("section")
          .querySelector(".js-custom-dots");
        if (!dotsContainer) return;

        const customDots = dotsContainer.querySelectorAll("a");

        // Remove the default pagination setting
        delete config.pagination;

        const swiperInstance = new Swiper(swiperElement, config);

        swiperInstance.on("slideChange", function() {
          updateSwiperTabsPagination(swiperInstance, customDots);
        });

        customDots.forEach((dot, index) => {
          dot.addEventListener("click", function(e) {
            e.preventDefault();
            swiperInstance.slideToLoop(index);
            updateSwiperTabsPagination(swiperInstance, customDots);
          });
        });

        updateSwiperTabsPagination(swiperInstance, customDots);
      });
  }

  function updateSwiperTabsPagination(swiperInstance, customDots) {
    const activeIndex = swiperInstance.realIndex;
    customDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", initSwiperTabs);

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

})();





// <!-- About Section -->
// <section id="about" class="about section " style="background-image: url('assets/img/Ankita Logo.jpeg'); background-size:cover; background-position: center; background-repeat: no-repeat; ">

//   <div class="container">
//     <div class="row align-items-center justify-content-between">
//       <div class="col-lg-7 mb-5 mb-lg-0 order-lg-2" data-aos="fade-up" data-aos-delay="400">
//         <div class="swiper init-swiper">
//           <script type="application/json" class="swiper-config">
//             {
//               "loop": true,
//               "speed": 600,
//               "autoplay": {
//                 "delay": 5000
//               },
//               "slidesPerView": "auto",
//               "pagination": {
//                 "el": ".swiper-pagination",
//                 "type": "bullets",
//                 "clickable": true
//               },
//               "breakpoints": {
//                 "320": {
//                   "slidesPerView": 1,
//                   "spaceBetween": 40
//                 },
//                 "1200": {
//                   "slidesPerView": 1,
//                   "spaceBetween": 1
//                 }
//               }
//             }
//           </script>
//           <!-- <div class="swiper-wrapper">
//             <div class="swiper-slide">
//               <img src="assets/img/Ankita Logo.jpeg" alt="Image" class="img-fluid">
//             </div>
//             <div class="swiper-slide">
//               <img src="assets/img/jaan with kashmiri kid.jpeg" alt="Image" class="img-fluid">
//             </div>
//             <div class="swiper-slide">
//               <img src="assets/img/Image 11-04-2022 at 6.14 PM.jpeg" alt="Image" class="img-fluid">
//             </div>
//           </div> -->
//           <div class="swiper-pagination"></div>
//         </div>
//       </div>
//       <div class="col-lg-7 col-12">
//         <div class="hero-text">
//           <h2 class="mb-4"><a class="custom-btn btn custom-link" style="font-size: larger;" disabled><i>Ankita Magdani</i></a></h2>
//           <p class="mb-4"><a class="custom-btn btn custom-link"disabled>Life Coach</a></p>
//           <p class="mb-5"><a class="custom-btn btn custom-link" style="background-color: var(--accent-color);" disabled><i>The Power Is Yours</i></a></p>
//         </div>
//       </div>
//       <!-- <div class="col-lg-6 order-lg-1">
//         <h1 class="mb-4 btn " data-aos="fade-up">
//           Welcome to AMT: Ankita’s Mapping Thoughts</h1>
//         <p data-aos="fade-up">
//           Hey there! I’m Ankita Magdani, your Mental Health Therapist and Career & Mindset Coach based in Dubai, UAE. I’m here to help you unlock the power within you.
//         </p>
//         <p class="mt-5" data-aos="fade-up">
//           <a href="#" class="btn btn-get-started">Get Started</a>
//         </p>
//       </div> -->
//     </div>
//   </div>
// </section><!-- /About Section -->


// --h1-font-size:                 62px;
// --h2-font-size:                 48px;
// --h3-font-size:                 36px;
// --h4-font-size:                 32px;
// --h5-font-size:                 24px;
// --h6-font-size:                 22px;
// --p-font-size:                  18px;
// --menu-font-size:               12px;
// --copyright-font-size:          14px;

// --border-radius-large:          100px;
// --border-radius-medium:         20px;
// --border-radius-small:          10px;

// --font-weight-normal:           400;
// --font-weight-medium:           500;
// --font-weight-bold:             700;


// .custom-btn,
// .navbar .custom-btn {
//   font-size: var(--p-font-size);
//   font-weight: var(--font-weight-bold);
// }

// .navbar .custom-btn {
//   background: var(--background-color);
//   border-width: 2px;
//   border-style: solid;
//   border-color: var(--default-color);
//   color: var(--default-color);
//   padding: 8px 22px;
// }



// .navbar .custom-btn:hover {
//   background: var(--default-color);
//   border-color: transparent;
//   color: var(--background-color);
// }

// .custom-btn {
//   background: var(--background-color);
//   border-radius: var(--border-radius-large);
//   color: var(--default-color);
//   font-weight: var(--font-weight-bold);
//   padding: 12px 24px;
// }

// .custom-btn:hover {
//   background: var(--background-color);
//   box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
//   color: var(--default-color);
// }

// .custom-link {
// 	background-color: var(--background-color);
// }
