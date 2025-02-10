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
// jquery
// Navbar scroll effect
// $(window).scroll(function () {
//   if ($(this).scrollTop() > 50) {
//     $(".navbar").addClass("scrolled");
//   } else {
//     $(".navbar").removeClass("scrolled");
//   }
// });

// Smooth scroll for navigation links
// $(".nav-link").on("click", function (e) {
//   e.preventDefault();
//   const hash = this.hash;
//   $("html, body").animate(
//     {
//       scrollTop: $(hash).offset().top - 70,
//     },
//     800
//   );
// });

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

// // navbar scrolling
$(document).ready(() => {
  const topbar = $(".topbar");
  const navbar = $(".navbar");
  const spacer = $(".spacer");
  let lastScrollTop = 0;

  $(window).on("scroll", () => {
    let scrollTop = $(this).scrollTop();
    let topbarHeight = topbar.outerHeight();

    if (scrollTop > 50) {
      topbar.css("transform", "translateY(-100%)"); // Hide topbar smoothly
      navbar.addClass("fixed-nav");
      spacer.show();
    } else {
      topbar.css("transform", "translateY(0)"); // Show topbar smoothly
      navbar.removeClass("fixed-nav");
      spacer.hide();
    }

    lastScrollTop = scrollTop;
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

document.addEventListener("DOMContentLoaded", function () {
  let goTopBtn = document.getElementById("goTopBtn");

  window.onscroll = function () {
    if (window.scrollY > 300) {
      goTopBtn.classList.add("show");
    } else {
      goTopBtn.classList.remove("show");
    }
  };

  goTopBtn.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
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
    currentSection = "index"; // Set 'index' (Home) as active if at the top
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
