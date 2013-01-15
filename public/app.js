/*jshint strict:true jquery:true browser:true es5:true
onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true unused:true undef:true */
$(function () {
  "use strict";

  // http://stackoverflow.com/questions/4198041/jquery-smooth-scroll-to-an-anchor
  $("a.js-scroll").on('click', function (ev) {
    // prevent the default 'jump' to
    ev.preventDefault();
    //ev.stopPropagation();

    //calculate destination place
    var dest = 0
      , hash = this.hash
      , sel = '[name=' + this.hash.replace('#', '') + ']'
      , $el = $(sel)
      ;

    if ($el.offset().top > $(document).height() - $(window).height()) {
      dest = $(document).height() - $(window).height();
    } else {
      dest = $el.offset().top;
    }

    //go to destination
    $('html,body').animate({ scrollTop: dest }, 300, 'swing', function () {
      window.location.hash = hash;
    });
  });

  function initNavScroll() {
    var $el = $('.js-nav-wrapper')
      , origTop = $el.offset().top
      ;

    $(window).scroll(function () {
      if ($el.hasClass('css-nav-wrapper-fixed')) {
        if (origTop > window.pageYOffset) {
          $el.removeClass('css-nav-wrapper-fixed');
          $('.css-header-wrapper').removeClass('css-header-wrapper-padded');
        }
      } else {
        if (origTop < window.pageYOffset) {
          $el.addClass('css-nav-wrapper-fixed');
          $('.css-header-wrapper').addClass('css-header-wrapper-padded');
        }
      }

      var elPrev
        , elCur
        , elNext
        , hash
        ;

      if (window.pageYOffset === 0) {
        location.hash = '';
      }

      [].slice.call($('section a[name]')).every(function (el, i, arr) {
        if (window.pageYOffset >= $(el).offset().top) {
          return true;
        }
        elPrev = $(arr[i - 2] || "").attr('name');
        elCur = $(arr[i - 1] || "").attr('name');
        elNext = $(arr[i] || "").attr('name');
        return false;
      });

      elPrev = elPrev || "";
      elCur = elCur || "";
      elNext = elNext || "";
      hash = location.hash.substr(1);

      // if we're moving forward, we should aways be on elCur
      if (elCur !== hash) {
        if (elNext && elNext === hash) {
          return;
        }
        if (elCur) {
          $('.js-a-class-for-the-hash-thing').attr('id', elCur);
          window.location.hash = elCur;
          $('.js-a-class-for-the-hash-thing').attr('id', 'js-nada-nada');
        }
      }
    });
  }

  initNavScroll();
});
