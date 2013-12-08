/*! bigSlide - v0.2.1 - 2013-11-13
* http://ascott1.github.io/bigSlide.js/
* Copyright (c) 2013 Adam D. Scott; Licensed MIT */
(function($) {
  'use strict';

  $.fn.bigSlide = function(options) {

    var settings = $.extend({
      'menu': ('#menu'),
      'push': ('.push'),
      'menuWidth': '15.625em',
      'speed': '300'
    }, options);

    var menuLink = this,
        menu = $(settings.menu),
        push = $(settings.push),
        width = settings.menuWidth;

    var positionOffScreen = {
      'position': 'fixed',
      'top': '0',
      'bottom': '0',
      'right': '-' + settings.menuWidth,
      'width': settings.menuWidth,
      'height': '100%'
    };

    var animateSlide = {
      '-webkit-transition': 'right ' + settings.speed + 'ms ease',
      '-moz-transition': 'right ' + settings.speed + 'ms ease',
      '-ms-transition': 'right ' + settings.speed + 'ms ease',
      '-o-transition': 'right ' + settings.speed + 'ms ease',
      'transition': 'right ' + settings.speed + 'ms ease'
    };

    menu.css(positionOffScreen);
    menu.css(animateSlide);
    push.css(animateSlide);

    menu.state = 'closed';

    menu.open = function() {
      menu.state = 'open';
      menu.css('right', '0');
      push.css('right', width);
    };

    menu.close = function() {
      menu.state = 'closed';
      menu.css('right', '-' + width);
      push.css('right', '0');
    };

    menuLink.on('click.bigSlide', function(e) {
      e.preventDefault();
      if (menu.state === 'closed') {
        menu.open();
      } else {
        menu.close();
      }
    });

    return menu;

  };

}(jQuery));
