// gsap animation
function textRevealAnimation(
  target,
  {
    delay = 0,
    duration = 1.5,
    stagger = 0.08,
    effect = "rotate",
    ease = "power3.out",
  } = {}
) {
  gsap.set(target, { opacity: 1 }); // Ensure text is visible before animation

  let elements = document.querySelectorAll(target);

  elements.forEach((el) => {
    let letters = el.textContent.split("");
    el.innerHTML = letters
      .map((letter) => `<span class='char'>${letter}</span>`)
      .join("");

    let chars = el.querySelectorAll(".char");
    gsap.set(chars, { opacity: 0, rotate: -90, transformOrigin: "50% 50%" });

    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(chars, {
              opacity: 1,
              rotate: 0,
              duration: duration,
              ease: ease,
              stagger: stagger,
              delay: delay,
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  textRevealAnimation(".my-text", {
    delay: 0.5, // Start animation after 0.5s
    duration: 1.2, // Each word animates for 1.2s
    stagger: 0.1, // Delay between each word animation
    effect: "fade", // Effect type (can be customized)
  });
});

// Initialize Bootstrap components
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
// counter
var counted = 0;
$(window).scroll(function () {
  if ($(".counter").length > 0) {
    // Calculate the point at which the counter should start
    var oTop = $(".counter").offset().top - window.innerHeight;
    if (counted === 0 && $(window).scrollTop() > oTop) {
      $(".count").each(function () {
        var $this = $(this),
          // Convert the target value to a float
          countTo = parseFloat($this.attr("data-count")),
          // Determine if the target is a decimal (has a remainder) or a whole number
          isDecimal = countTo % 1 !== 0;

        // Animate from the current number (ensure it's numeric) to the target value
        $({ countNum: parseFloat($this.text()) }).animate(
          { countNum: countTo },
          {
            duration: 2000,
            easing: "swing",
            step: function () {
              if (isDecimal) {
                // For decimals: display one decimal place
                $this.text(this.countNum.toFixed(1));
              } else {
                // For whole numbers: display an integer
                $this.text(Math.floor(this.countNum));
              }
            },
            complete: function () {
              // Ensure the final value is formatted properly
              if (isDecimal) {
                $this.text(this.countNum.toFixed(1));
              } else {
                $this.text(this.countNum);
              }
            },
          }
        );
      });
      counted = 1;
    }
  }
});
// show nav and hide topbar

$(document).ready(function () {
  new WOW().init(); // Initialize WOW.js

  const topbar = $(".topbar");
  const navbar = $(".navbar");
  const spacer = $(".spacer");
  let lastScrollTop = 0;

  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();

    // Scroll Down: Hide topbar, fix navbar
    if (scrollTop > 450 && scrollTop > lastScrollTop) {
      topbar.addClass("animated fadeOutUp").removeClass("fadeInDown"); // Hide topbar
      navbar.addClass("fixed-nav animated fadeInDown").removeClass("fadeOutUp");
      spacer.show();
    }
    // Scroll Up: Show both navbar and topbar with animation
    else if (scrollTop < lastScrollTop) {
      topbar.addClass("animated fadeInDown").removeClass("fadeOutUp"); // Show topbar
      navbar.addClass("fixed-nav animated fadeInDown").removeClass("fadeOutUp");
      spacer.hide();
    }

    // At the top of the page: Show both topbar & navbar with animation
    if (scrollTop <= 0) {
      topbar.addClass("animated fadeInDown").removeClass("fadeOutUp"); // Animate topbar
      navbar.removeClass("fixed-nav fadeOutUp").addClass("animated fadeInDown"); // Animate navbar
      spacer.hide();
    }

    lastScrollTop = scrollTop; // Update lastScrollTop
  });
});

// owl carousel
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});
// scrollto top button
document.addEventListener("DOMContentLoaded", function () {
  const progressWrap = document.querySelector(".progress-wrap");
  const goTopBtn = document.getElementById("goTopBtn");
  const offset = 50; // When to show the progress circle

  function updateProgress() {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scroll / height) * 100;
    progressWrap.style.setProperty("--scroll", `${progress}%`);
  }

  window.addEventListener("scroll", function () {
    updateProgress(); // Update circular progress fill

    if (window.scrollY > offset) {
      progressWrap.classList.add("active-progress"); // Show progress wrap
      goTopBtn.classList.add("show"); // Show button
    } else {
      progressWrap.classList.remove("active-progress");
      goTopBtn.classList.remove("show");
    }
  });

  goTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateProgress(); // Initialize on page load
});

// Function to scroll to section and update the active class
function scrollToSection(sectionId, offset = 0, event = null) {
  if (event) event.preventDefault(); // Prevent default anchor behavior

  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    // Calculate the position relative to the top of the document (not the viewport)
    const rect = sectionElement.getBoundingClientRect();
    const topPosition = rect.top + window.scrollY - offset;

    // Scroll to the section with the desired offset
    window.scrollTo({ top: topPosition, behavior: "smooth" });

    // Update the URL (optional)
    history.pushState(null, null, `#${sectionId}`);

    // Close the navbar if it’s a mobile view
    setTimeout(() => {
      document.getElementById("toggles")?.click();
    }, 1000);

    // Update active class on navbar
    updateActiveClass(sectionId);
  }
}

// Function to update the active class
function updateActiveClass(sectionId) {
  // Remove 'active' class from all nav items
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));

  // Add 'active' class to the current section
  const activeNavItem = document.getElementById(`nav-${sectionId}`);
  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }
}

// Optional: Highlight the active section on scroll
window.addEventListener("scroll", () => {
  const sections = ["index", "about", "services", "gallery", "contact"];
  let currentSection = null;

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (
      section &&
      section.getBoundingClientRect().top <= window.innerHeight / 2
    ) {
      currentSection = sectionId;
    }
  });

  // Ensure that the "Home" section is active when at the top of the page
  if (window.scrollY === 0) {
    currentSection = "home"; // Set 'index' (Home) as active if at the top
  }

  if (currentSection) {
    updateActiveClass(currentSection);
  }
});

// Attach event listeners to nav links
document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function (event) {
    // Add the offset you want here, such as 60px to adjust the scroll position
    scrollToSection(this.getAttribute("href").substring(1), 60, event);
  });
});
// tab section prevent scrolling
$(document).ready(function () {
  $("#serviceTab a").on("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    $(this).tab("show"); // Show the clicked tab
    // console.log("hello");

    // Prevent adding hash to URL
    history.replaceState(null, null, window.location.pathname);
  });
});
