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
    var oTop = $(".counter").offset().top - window.innerHeight;
    if (counted == 0 && $(window).scrollTop() > oTop) {
      $(".count").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
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

// // fireworks blasting
// var myIndex = 0;
// const container = document.querySelector(".fireworks-example");
// console.log(container);
// console.log(Fireworks);
// const fireworks = new Fireworks(container, {
//   rocketsPoint: 50,
//   hue: { min: 0, max: 360 },
//   delay: { min: 15, max: 30 },
//   speed: 2,
//   acceleration: 1.05,
//   friction: 0.95,
//   gravity: 1.5,
//   particles: 50,
//   trace: 3,
//   explosion: 5,
//   autoresize: true,
//   brightness: {
//     min: 50,
//     max: 80,
//     decay: { min: 0.015, max: 0.03 },
//   },
//   boundaries: {
//     x: 50,
//     y: 50,
//     width: container.clientWidth,
//     height: container.clientHeight,
//   },
//   sound: {
//     enable: true,
//     files: ["explosion0.mp3", "explosion1.html", "explosion2.html"],
//     volume: { min: 1, max: 2 },
//   },
// });
// fireworks.start();
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
