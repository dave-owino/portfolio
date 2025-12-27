/* Main JS File */
/* ------------------------------------------------------------------
  [Table of Contents]

  1. Mobile Detect
  2. Full Height
  3. Counter
  4. Animations
  5. Burger Menu
  6. Click outside of offcanvass
  7. Smooth Scrolling
  8. Reflect Scrolling in Navigation
  9. Slider Main
 10. Typed Initiate
 11. Sticky Function
 12. Owl Crousel Feature Slide

------------------------------------------------------------------- */
/* start main js */
(function () {
  "use strict";

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };

  var counter = function () {
    $(".js-counter").countTo({
      formatter: function (value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };

  var counterWayPoint = function () {
    if ($("#daviefolio-counter").length > 0) {
      $("#daviefolio-counter").waypoint(
        function (direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" }
      );
    }
  };

  // Animations
  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated");
                  } else {
                    el.addClass("fadeInUp animated");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };

  var burgerMenu = function () {
    $(".js-daviefolio-nav-toggle").on("click", function (event) {
      event.preventDefault();
      var $this = $(this);

      if ($("body").hasClass("offcanvas")) {
        $this.removeClass("active");
        $("body").removeClass("offcanvas");
      } else {
        $this.addClass("active");
        $("body").addClass("offcanvas");
      }
    });
  };

  // Click outside of offcanvass
  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#daviefolio-aside, .js-daviefolio-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-daviefolio-nav-toggle").removeClass("active");
        }
      }
    });

    $(window).scroll(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-daviefolio-nav-toggle").removeClass("active");
      }
    });
  };

  var clickMenu = function () {
    $('#navbar a:not([class="external"])').click(function (event) {
      var section = $(this).data("nav-section"),
        navbar = $("#navbar");

      if ($('[data-section="' + section + '"]').length) {
        $("html, body").animate(
          {
            // Updated offset to 60 for better spacing with 48px header
            scrollTop: $('[data-section="' + section + '"]').offset().top - 60,
          },
          500
        );
      }

      if (navbar.is(":visible")) {
        navbar.removeClass("in");
        navbar.attr("aria-expanded", "false");
        $(".js-daviefolio-nav-toggle").removeClass("active");
      }

      event.preventDefault();
      return false;
    });
  };

  // Reflect scrolling in navigation
  var navActive = function (section) {
    var $el = $("#navbar > ul");
    $el.find("li").removeClass("active");
    $el.each(function () {
      $(this)
        .find('a[data-nav-section="' + section + '"]')
        .closest("li")
        .addClass("active");
    });
  };

  var navigationSection = function () {
    var $section = $("section[data-section]");

    $section.waypoint(
      function (direction) {
        if (direction === "down") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: "150px",
      }
    );

    $section.waypoint(
      function (direction) {
        if (direction === "up") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: function () {
          // Syncs the highlighting as you scroll back up past the header
          return -$(this.element).height() + 155;
        },
      }
    );
  };

  var sliderMain = function () {
    $("#daviefolio-hero .flexslider").flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
    });
  };

  // Typed Initiate
  if ($('#daviefolio-hero .typed-output').length) {
    var typed_strings = $('#daviefolio-hero .typed-text').text().trim().split('|');

    $('.typed-output').text('');

    var typed = new Typed('#daviefolio-hero .typed-output', {
      strings: typed_strings,
      typeSpeed: 100,
      backSpeed: 30,
      backDelay: 500,
      smartBackspace: false,
      loop: true,
    });
  }

  var stickyFunction = function () {
    var h = $(".image-content").outerHeight(); 

    function setupSticky() {
      if ($(window).width() <= 992) {
        $("#sticky_item").trigger("sticky_kit:detach");
      } else {
        $(".sticky-parent").css("height", h);
        $("#sticky_item").stick_in_parent();
      }
    }

    setupSticky();

    $(window).resize(function () {
      var h = $(".image-content").outerHeight(); 
      $(".sticky-parent").css("height", h);
      setupSticky();
    });
  };

  var owlCrouselFeatureSlide = function () {
    $(".owl-carousel").owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      autoplay: true,
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoHeight: true,
      items: 1,
      navText: [
        "<i class='icon-arrow-left3 owl-direction'></i>",
        "<i class='icon-arrow-right3 owl-direction'></i>",
      ],
    });
  };

  // Document on load.
  $(function () {
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();

    clickMenu();
    navigationSection();

    mobileMenuOutsideClick();
    sliderMain();
    stickyFunction();
    owlCrouselFeatureSlide();
  });
})();
/* End of Main JS File */