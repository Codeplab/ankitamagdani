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



// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="utf-8">
//   <meta content="width=device-width, initial-scale=1.0" name="viewport">
//   <title>Index - Active Bootstrap Template</title>
//   <meta name="description" content="">
//   <meta name="keywords" content="">

//   <!-- Favicons -->
//   <link href="assets/img/favicon.png" rel="icon">
//   <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

//   <!-- Fonts -->
//   <link href="https://fonts.googleapis.com" rel="preconnect">
//   <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
//   <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">

//   <!-- Vendor CSS Files -->
//   <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
//   <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
//   <link href="assets/vendor/aos/aos.css" rel="stylesheet">
//   <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
//   <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">

//   <!-- Main CSS File -->
//   <link href="assets/css/main.css" rel="stylesheet">

//   <!-- =======================================================
//   * Template Name: Active
//   * Template URL: https://bootstrapmade.com/active-bootstrap-website-template/
//   * Updated: Aug 07 2024 with Bootstrap v5.3.3
//   * Author: BootstrapMade.com
//   * License: https://bootstrapmade.com/license/
//   ======================================================== -->
// </head>
// <body>

//   <header id="header" class="header d-flex align-items-center sticky-top">
//     <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

//       <a href="index.html" class="logo d-flex align-items-center">
//         <!-- Uncomment the line below if you also wish to use an image logo --> 
//         <!-- <img src="assets/img/logo.png" alt=""> -->
//         <h1 class="sitename"><img src="assets/img/MPT-ColorWhite-TP (1).png" alt=""></h1>
//       </a>

//       <nav id="navmenu" class="navmenu">
//         <ul>
//           <li><a href="index.html">Home</a></li>
//           <li><a href="about.html" class="active">About</a></li>
//           <li><a href="services.html">Services</a></li>
//           <li><a href="portfolio.html">Portfolio</a></li>
//           <li><a href="team.html">Team</a></li>
//           <li><a href="blog.html">Blog</a></li>
//           <li class="dropdown"><a href="#"><span>Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
//             <ul>
//               <li><a href="#">Dropdown 1</a></li>
//               <li class="dropdown"><a href="#"><span>Deep Dropdown</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
//                 <ul>
//                   <li><a href="#">Deep Dropdown 1</a></li>
//                   <li><a href="#">Deep Dropdown 2</a></li>
//                   <li><a href="#">Deep Dropdown 3</a></li>
//                   <li><a href="#">Deep Dropdown 4</a></li>
//                   <li><a href="#">Deep Dropdown 5</a></li>
//                 </ul>
//               </li>
//               <li><a href="#">Dropdown 2</a></li>
//               <li><a href="#">Dropdown 3</a></li>
//               <li><a href="#">Dropdown 4</a></li>
//             </ul>
//           </li>
//           <li><a href="contact.html">Contact</a></li>
//         </ul>
//         <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
//       </nav>

//     </div>
//   </header>

//     <!-- About Me Section -->
//     <section id="about" class="py-5">
//       <div class="container">
//           <h2 class="text-center mb-4">A Little About Me</h2>
//           <div class="row">
//               <div class="col-md-6">
//                   <img src="assets/img/jaan with kashmiri kid.jpeg" alt="Ankita's childhood" class="img-fluid rounded mb-3">
//               </div>
//               <div class="col-md-6">
//                   <p>I grew up in India, surrounded by the rich traditions of yoga, meditation, and hypnosis. My mom is a Reiki Master, and my uncles are Feng Shui and Yoga Masters. As a kid, I didn't really appreciate any of this. I actually thought it was all a bit of a scam!</p>
//                   <p>I'm here to help you unlock the power within you.</p>
//               </div>
//           </div>
//       </div>
//   </section>

//   <!-- Childhood Section -->
//   <section id="childhood" class="py-5 bg-light">
//       <div class="container">
//           <h2 class="text-center mb-4">Childhood</h2>
//           <div class="row">
//               <div class="col-md-6">
//                   <h3 class="text-center">Childhood Trauma</h3>
//                   <p>When I was six, my family experienced a traumatic event—a road accident that took my father's life. My mom had to "move on" quickly to support my sister and me. She got a job at a bank, earning just 2000 rupees a month (about $50 back then). We never really talked about our loss, which left us with a lot of unprocessed grief.</p>
//                   <p>Mom was super strict, especially about who we talked to. I became the "rebel" in the family, struggling in school and feeling like a lost cause. But then I discovered psychology, and it changed everything.</p>
//               </div>
//               <div class="col-md-6">
//                   <h3 class="text-center">Childhood Dream</h3>
//                   <p>I always wanted to be a flight attendant and see the world. But with no concept of pocket money, it was tough. My mom gave me 50 rupees every four days, which had to cover fuel for my scooter and maybe a snack if anything was left.</p>
//               </div>
//           </div>
//       </div>
//   </section>

//   <!-- Career Journey -->
//   <section id="career" class="py-5">
//       <div class="container">
//           <h2 class="text-center mb-4">Career Journey</h2>
//           <div class="timeline">
//               <div class="timeline-item">
//                   <h4>Early Jobs</h4>
//                   <p>I fell in love with psychology in college and started tutoring my peers for some extra cash. At 16, I began doing odd jobs like making greeting cards and henna designs.</p>
//               </div>
//               <div class="timeline-item">
//                   <h4>HR Consultant</h4>
//                   <p>By 17, I got a job as an HR consultant.</p>
//               </div>
//               <div class="timeline-item">
//                   <h4>Flight Attendant</h4>
//                   <p>At 18, I became a flight attendant with Jet Airways. I promised my mom I'd finish college, and I did!</p>
//               </div>
//               <div class="timeline-item">
//                   <h4>Emirates Airlines</h4>
//                   <p>In 2012, I took a job with Emirates Airlines in Dubai.</p>
//               </div>
//               <div class="timeline-item">
//                   <h4>Mental Health Therapist</h4>
//                   <p>In 2019, I changed careers and became a mental health therapist. I've helped over 1000 clients overcome anxiety, depression, grief, and more.</p>
//               </div>
//           </div>
//       </div>
//   </section>

//   <!-- Personal Life Section -->
//   <section id="personal-life" class="py-5 bg-light">
//       <div class="container">
//           <h2 class="text-center mb-4">Personal Life</h2>
//           <div class="row">
//               <div class="col-md-6">
//                   <h3 class="text-center">Family Dynamics</h3>
//                   <p>As we grew, my mom got more into religion and societal norms, and I drifted further apart. I found love and support outside, which was tough with family restrictions. Life got really complicated juggling my job, studies, and trying to find myself.</p>
//                   <p>Despite being financially independent, I was still accountable for every penny I spent and every person I spoke to. When Mom found out about my second boyfriend, she forced me to marry him. I changed my religion, name, and lifestyle, thinking I was starting fresh.</p>
//               </div>
//               <div class="col-md-6">
//                   <h3 class="text-center">Marriage and Divorce</h3>
//                   <p>Married life was a nightmare—abusive in every way. After five years, a miscarriage, and finding out about my husband's affair, I had enough. My relationship with Mom was bitter; I blamed her for my situation.</p>
//                   <p>In 2012, I moved to Dubai, hitting rock bottom again with my husband's harassment. But then I found the courage to end the marriage.</p>
//               </div>
//           </div>
//       </div>
//   </section>

//   <!-- Today Section -->
//   <section id="today" class="py-5">
//       <div class="container">
//           <h2 class="text-center mb-4">Today</h2>
//           <div class="row mt-4">
//             <div class="col-md-6">
//               <h3 class="text-center">My Mission</h3>
//               <p>To make mental health a top priority, one person at a time.</p>
//             </div>
//             <div class="col-md-6">
//               <h3 class="text-center">My Vision/Purpose</h3>
//               <p>To help individuals shift their perception of life so they can live with integrity, meaning, freedom, and choice.</p>
//             </div>
//             <p>I work as a Professional Development Coach at Zayed University, helping students with soft skills and mental health. I'm also the Lead Counsellor for a non-profit in the UAE, work with Plumm Health Platform in the UK, and review mental health articles for Myndstories. I conduct workshops for organizations like Byju's, Coca-Cola, ACWA Power, and Dubai Indian Ladies Group.</p>
//           </div>
//       </div>
//   </section>

//   <!-- Education and Qualifications -->
//   <section id="education" class="py-5 bg-light">
//       <div class="container">
//           <h2 class="text-center mb-4">Education and Qualifications</h2>
//           <ul class="list-group">
//               <li class="list-group-item"><i class="bi bi-mortarboard-fill me-2"></i>CDA Licensed Psychologist</li>
//               <li class="list-group-item"><i class="bi bi-mortarboard-fill me-2"></i>MSc. Business Psychology with Coaching</li>
//               <li class="list-group-item"><i class="bi bi-mortarboard-fill me-2"></i>Hon. in Abnormal Psychology and Sociology</li>
//               <li class="list-group-item"><i class="bi bi-mortarboard-fill me-2"></i>Diploma in Clinical Hypnotherapy and Psychotherapy</li>
//               <li class="list-group-item"><i class="bi bi-mortarboard-fill me-2"></i>Diploma in Cognitive Behavioral Therapy for Anxiety, Depression, & Grief</li>
//               <li class="list-group-item"><i class="bi bi-mortarboard-fill me-2"></i>NLP Master Coach</li>
//               <li class="list-group-item"><i class="bi bi-mortarboard-fill me-2"></i>BPS registered in Psychometrics Assessments</li>
//               <li class="list-group-item"><i class="bi bi-mortarboard-fill me-2"></i>PCC-Mindset coach</li>
//           </ul>
//       </div>
//   </section>

//   <!-- Call to Action -->
//   <section class="bg-primary text-white text-center py-5">
//       <div class="container">
//           <h2 class="mb-4">Ready to Change Your Life?</h2>
//           <p>If you relate to my story or know someone who's struggling, reach out. Together, we can make a difference.</p>
//           <a href="#contact" class="btn btn-light btn-lg">Contact Me</a>
//       </div>
//   </section>


//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
//   <!-- Scroll Top -->
//   <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

//   <!-- Preloader -->
//   <div id="preloader"></div>

//   <!-- Vendor JS Files -->
//   <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
//   <script src="assets/vendor/php-email-form/validate.js"></script>
//   <script src="assets/vendor/aos/aos.js"></script>
//   <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
//   <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
//   <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
//   <script src="assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
//   <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>

//   <!-- Main JS File -->
//   <script src="assets/js/main.js"></script>

// </body>

// </html>