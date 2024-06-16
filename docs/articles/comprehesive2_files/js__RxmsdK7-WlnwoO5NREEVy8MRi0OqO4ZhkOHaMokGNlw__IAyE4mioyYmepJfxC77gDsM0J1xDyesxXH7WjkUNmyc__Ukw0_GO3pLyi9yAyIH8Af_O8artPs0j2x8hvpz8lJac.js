/**
 * @file
 *
 * Behaviors for the AltMetrics widget.
 */

(function ($) {
  Drupal.behaviors.HighWire_AltMetrics = {
    attach: function (context, settings) {

      // Check MutationObserver has support for IE.
      // If no support for IE, then load polyfill MutationObserver.
      if (typeof Modernizr != "undefined" && !Modernizr.mutationobserver) {
        if(typeof(Drupal.settings.MutationObserver) != "undefined" && Drupal.settings.MutationObserver !== null) {
          var mutationObserverJs = Drupal.settings.MutationObserver.js;
          // Using $.when to load polyfill before creating MutationObserver object.
          $.when( $.getScript( mutationObserverJs ) ).done(function () {
            mutationObserverDetect();
          });
        }
      }
      else {
        mutationObserverDetect();
      }

      // Listen to DOM changes on the widget wrapper. The service is a single JS resource, which either fails or succeeds.
      // The is no known way of detecting the success so we need this little trick to hide/show pane.
      function mutationObserverDetect() {
        var target = $('.altmetric-embed');
        var altmetricspane =$('.pane-highwire-altmetrics');
        var observer = new MutationObserver(function(mutations, observer) {
          var self = this;
          // Fired when a mutation occurs and the widget is present somewhere in the DOM.
          if (target[0]) {
            mutations.forEach(function(mutation) {
              if (mutation.type == 'attributes') {
                if (target.hasClass('altmetric-hidden')) {
                  // If no altmetrics widget returned, hide the pane, next panel-separator sibling and kill the connection.
                  altmetricspane.hide().next('.panel-separator').hide();
                  self.disconnect();
                }
              }
            });
          }
        });
        var config = {attributes: true, subtree: true};
        observer.observe(target[0], config);
      }
    }
  }
})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * BMJJ Jumplinks
 *
 * Copyright (c) HighWire Press, Inc.
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */

(function ($) {
  Drupal.behaviors.bmjJumpLinks = {
    attach: function(context, settings) {
      $(document.body, context).once('bmjJumpLinks', function() {
        var jumplinks = settings.bmjJumpLinks.jumplinks;
        var sections = settings.bmjJumpLinks.sections;
        var jumplinks_size = jumplinks.length;
        for (i=0; i < jumplinks_size; i++) {
          //Checking if section id exists
          if($(sections[i]).length) {
            $('.pane-bmjj-jumplinks .pane-content .highwire-list ul').append('<li>' + jumplinks[i] + '</li>');
          }
        }
      });
    }
  };
})(jQuery);
;/*})'"*/
;/*})'"*/
/**
 * Highwire AT Symbol
 *
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */
(function ($) {
  Drupal.behaviors.myCustomJS = {
    attach: function(context, settings) {
      $('.highwire-markup .em-addr', context).each(function() {
        var replaced = $(this).html().replace('\{at\}','@');
        var replaced = "<a href='mailto:" + replaced + "'>" + replaced + "</a>";
        $(this).html(replaced);
      });
    }
  };
})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * @file
 *
 * Behaviors for Article menu drop-down
 */

(function ($) {
  Drupal.behaviors.bmjArticleDropdown = {
    attach: function(context, settings) {
      $( document ).one("ready", function(){
        // Copy the contents of the AJAX tabs to the mobile menu
        //$(".mobile-drop-down").append($(".panels-ajax-tab"));
        $(".panels-ajax-tab").clone().appendTo($(".mobile-art-drop-down"));
      });
      
      $("a.mobile-article-tab").on("click", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation(); 
        $(".mobile-art-drop-down").toggle();
        $(this).children('.icon-toggle').toggleClass("icon-plus").toggleClass("icon-close");
      });
      
      $("a.panels-ajax-tab-tab").on("click", function() {
        $("#mobile-tab-title p").html($(this).html());
      });
    }
  }
})(jQuery);
;/*})'"*/
;/*})'"*/
/**
 * @file
 *
 * Behaviors for building a responsive menu 
 */
(function ($) {
  Drupal.behaviors.highwire_responsive_toggle = {
    attach: function(context, settings) {
      
      // Mobile Menu toggle
      var groups = $('.highwire-responsive-toggle-group', context);
      groups.each(function(){
        var group = $(this);
        
        // Add triggers to the DOM
        group.prepend('<ul class="highwire-responsive-toggle-triggers"></ul>');
        var triggers = $('.highwire-responsive-toggle-triggers', group);
  
        // Find panes inside this group
        var panes = group.children('.panel-pane');
    
        // For each pane in the group, apply hide/show behaviors.
        panes.each(function(index){
          var pane = $(this);
    
          var title = pane.find('.pane-title').html();
          triggers.append('<li class="trigger-' + index + '">' + title + '</li>');
    
          // Show/hide this pane when trigger element is clicked.
          // @@TODO: This can probably be cleaned up a bit.
          triggers.find('li.trigger-' + index).click(function(e){
            e.preventDefault();
            var paneState = pane.hasClass('expanded');
            var linkState = $(this).hasClass('expanded');
            panes.each(function() { $(this).removeClass('expanded'); });
            triggers.find('li').removeClass('expanded');
            if (!paneState) {
              pane.addClass('expanded');
              $(this).addClass('expanded');
              // Focus on form element after click if it exists
              pane.find('#edit-keywords').focus();
            }
            else {
              pane.removeClass('expanded');
              $(this).removeClass('expanded');
            }
          });

          // Fix for bug where menu items without children have expanded class
          pane.find('ul.menu li.expanded').each(function(){
            var children = $(this).find('ul.menu li').length;
            if (children == 0 || children == null) {
              $(this).removeClass('expanded');
            }
          });
      
          // Submenus expand/collapse
          pane.find('ul.menu > li.expanded > a').click(function(e){
            e.preventDefault();
            var $that = $(this);
            $that.parent('li').toggleClass('show');
          });

        });

        // Close group if clicking outside of the menu.
        $(document).click(function(event) {
          if(!$(event.target).closest(group).length) {
            if(group.children('.panel-pane').hasClass('expanded')) {
              group.find('.highwire-responsive-toggle-triggers > li').removeClass('expanded');
              group.children('.panel-pane').removeClass('expanded');
            }
          }        
        })

      });

    }
  };
})(jQuery);

;/*})'"*/
;/*})'"*/
/** 
 * JCORE-3513: This is google translate module js for converting dropdown list to unorder list at UI
 */
(function ($) {
  Drupal.behaviors.highwire_gtranslate = {
    attach: function(context, settings) {
      if (typeof context == 'object' && context.toString().indexOf('HTMLDocument') != -1) {
        var langlist = "";
        var navfordesktop = '<div id="desktopNav" class="hw-gtranslate-overlay"><div class="hw-gtranslate-overlay-content"><ul id="language-list" class="hw-gtranslate-select-lang notranslate">';
        var navformobile = '<div id="mobileNav" class="hw-gtranslate-overlay-mobile"><div class="hw-gtranslate-overlay-content"><ul id="language-list" class="hw-gtranslate-select-lang notranslate">';
        var langlabel = '<div class="hw-google-icon"><img class="hw-googleimg" src="https://img.icons8.com/color/16/000000/google-logo.png"> <span id="selectedlang" class="notranslate">Language </span> <span class="notranslate">&#9660;</span></div>';
        $('#block-gtranslate-gtranslate').after("<div id='sellanguage'><span class='hw-gtranslate-sellang'><div id='hw-gtranslate-opennav' rel='close'>" + langlabel + "</div> </span></div>");
        
        /* Get all language from select and convert in to unorder list */
        $('#block-gtranslate-gtranslate select').children("option").each(function() {
          var langvaltxt = $(this).val() + "~" + $(this).text();
            if ($(this).val() != '') {
              langlist = langlist + '<li class="hw-gtranslate-lang-opt col-narrow-4" style="display:block;"><a href="javascript:void(0);" id="' + langvaltxt + '">' + $(this).text() + '</a></li>'; 
            }
        }).end().remove();

        if (langlist != '') {
          langlist = langlist + '</ul></div></div>';
        }
        
        /* Append langusge list with selector */
        $("#sellanguage").append(navfordesktop + langlist);
        
        /* Append langusge list with selector for mobile view */
        if (langlist != '') {
          $("#unique-id3 ul.highwire-responsive-toggle-triggers").append('<li class="trigger-3"><span class="hw-gtranslate-sellang"><div id="hw-gtranslate-opennavmobile" rel="close" class="hw-google-icon"><img src="https://img.icons8.com/color/16/000000/google-logo.png"> <span id="mobileselectedlang" class="notranslate">Language</span>  <span class="notranslate">&#9660;</span> </div></span>' + navformobile + langlist + '</li>');
        }
        $("#desktopNav").hide();
        $("#mobileNav").hide();
      
      }
      /* After click language text call doGTranslate function and close language div container */
      $('.hw-gtranslate-lang-opt a', context).on( 'click' , function(e) {
        e.preventDefault();
        var idtxt = $(this).attr('id');
        var idtxtsplit = idtxt.split('~'); 
        var langcode = idtxtsplit[0].slice(-2);
        if(langcode != $("html").attr('lang')) {
          doGTranslate(idtxtsplit[0]);
          $("#selectedlang").html(idtxtsplit[1]);
          $("#mobileselectedlang").html(idtxtsplit[1]);

          //JCORE-3709- Set current language in session
          sessionStorage.setItem('CurrentLang', idtxtsplit[1]);
        }
        $('#hw-gtranslate-opennav').attr('rel','close');
        $('#hw-gtranslate-opennavmobile').attr('rel','close');
        $("#desktopNav").hide();
        $("#mobileNav").hide();
      });

      /* set selected language in a selector after move one page to another page or reload page */
      $(window, context).on("load", function() {
        var flaglang = false; 
        //JCORE-3709 changes added to fix langungage span refersh issue
        var defaultlang = $("html").attr('lang');
        var selectedlangtxt = $('#block-gtranslate-gtranslate select').find("option[value='" + defaultlang + "']").text();
        if(selectedlangtxt != '') {
          flaglang = true;
          $("#selectedlang").html(selectedlangtxt);
          $("#mobileselectedlang").html(selectedlangtxt);
        }
        //JCORE-3709- Get current language which is set in session on click of google translate
        var currentlang = sessionStorage.getItem('CurrentLang');
        if (currentlang != null) {
          flaglang = true;
          $("#selectedlang").html(currentlang);
          $("#mobileselectedlang").html(currentlang);
        } 
        if(flaglang == false) {
          $("#selectedlang").html("English");
          $("#mobileselectedlang").html("English");
          flaglang = true;
        }
      });
      
      /* If user click on selector then toggle language div container for desktop */
      $('#hw-gtranslate-opennav', context).on('click' , function(e) {
        e.preventDefault();
        if($(this).attr('rel') == 'close') {
          $("#desktopNav").show();
          $('#hw-gtranslate-opennav').attr('rel','open');
        } else {
          $("#desktopNav").hide();
          $('#hw-gtranslate-opennav').attr('rel','close');
        }
      });

      /* If user click on selector then toggle language div container for mobile */
      $('#hw-gtranslate-opennavmobile', context).on('click' , function(e) {
        e.preventDefault();
        if($(this).attr('rel') == 'close') {
          $("#mobileNav").show();
          $('#hw-gtranslate-opennavmobile').attr('rel','open');
        } else {
          $("#mobileNav").hide();
          $('#hw-gtranslate-opennavmobile').attr('rel','close');
        }
      });
    }
  };
})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * @file
 * Highwire User Meta Data Additions JS
 *
 * Copyright (c) HighWire Press, Inc.
 * This software is open-source licensed under the GNU Public License Version 2
 * or later. The full license is available in the LICENSE.TXT file at the root
 * of this repository.
 */

(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.bmj_datalayer_user_data_add = {
    attach: function (context, settings) {
      $('.panels-ajax-tab-tab', context).once().bind('click', function() {
        var eventRecord = {"event": "Article Tab", "content": {}};
          
        const tabs = ['info', 'citation-tools', 'share', 'responses', 'altmetrics', 'alerts'];
          
        var tab_name = $(this).attr('data-trigger');

        if (tabs.includes(tab_name)) {
          tab_data_name = tab_name;
        }
        else {
          tab_data_name = "main_tab";
        }

        eventRecord.content['name'] = tab_data_name;
        new Event(eventRecord);
      });
    }
  }
}(jQuery));



;/*})'"*/
;/*})'"*/
(function ($) {
  // Implement a show/hide.
  Drupal.behaviors.menu_attach_block = {
    attach: function (context, settings) {
      // Attach hover events, if this link has been defined as hoverable.
      $('a.menu-attach-block-drop-link.expand-on-hover', context).hover(
          /**
           * Show on mouse in.
           */
          function() {
            // Show the block if it is not already shown.
            if (!($(this).hasClass('dropped'))) {
              expand_toggle($(this));
            }
          },
          /**
           * Hide on mouse out.
           */
          function() {
            expand_toggle($(this));
          }
      );

      // Attach click events for links configured to use that.
      $('a.menu-attach-block-drop-link.expand-on-click', context).click(function(event) {
        expand_toggle($(this));
        event.preventDefault();
      });

      /**
       * Shows a block embedded inside a menu item.
       *
       * @param link
       *   The link attached to this menu item, which triggers block show.
       */
      function expand_toggle(link) {
        if (link.hasClass('menu-ajax-enabled')) {
          // Load contents using AJAX.
          if (!link.hasClass('menu-ajax-loaded')) {
            ajax_path = Drupal.settings.basePath + 'menu_attach_block/ajax/' + (link).attr('data-block-id');
            $.ajax({
              type: 'GET',
              url: ajax_path,
              data: '',
              dataType: 'HTML',
              success: function ($block_html) {
                $(link).next('.menu-attach-block-wrapper').html($block_html);
                Drupal.attachBehaviors(link);
              }
            });
          }
        }
        // Show/hide the link.
        $(link).next('.menu-attach-block-wrapper').slideToggle('fast');
        $(link).toggleClass('dropped');
      }
    }
  }
}(jQuery));

;/*})'"*/
;/*})'"*/
(function($) {
  Drupal.behaviors.panels_ajax_pane = {
    attach: function(context) {
      $('.panels-ajax-pane', context).once('panels-ajax-pane-once', function() {
        (function($container) {
          $.ajax({
            type: 'POST',
            data: Drupal.settings.panels_ajax_pane[$container.data('pid')], 
            url: Drupal.settings.basePath + 'panels_ajax_pane/render',
            cache: true,
            error: function(jqXHR, textStatus, errorThrown) {
              if (typeof console == "object") {
                console.error('Panels Ajax Pane Error: ' + errorThrown);
              }
            }
          }).done(function(data) {
            $title_span = $('span.panels-ajax-pane-title[data-pid=' + $container.data('pid') + ']');

            if (data['markup'] === false) {
              $container.closest('.pane-panels-ajax-pane-content').remove();
              $container.remove();
              $title_span.closest('.pane-title').remove();
              $title_span.parent().remove();
            }
            else {
              $container.append(data['markup']);
              $title_span.append(data['title']);
              $container.find('style').append('head'); // Move style elements to head
            }

            if (data['title'] === false) {
              $title_span.closest('.pane-title').remove();
              $title_span.parent().remove();
            }

            // Attach drupal behaviors
            Drupal.attachBehaviors($container);          
          });
        })($(this));
      });
    }
  }
})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * @file
 * Axon theme behaviors.
 */

(function ($) {
  Drupal.behaviors.bmjjThemeScripts = {
    attach: function(context, settings) {
      /**
       * Breakpoints returned by highwire_responsive_breakpoints are available
       * as a JS object: Drupal.settings.highwireResponsive.breakpoints
       */

      // Narrow Range+
      /*
      enquire.register(Drupal.settings.highwireResponsive.breakpoints.narrow, {
        match : function() {
          // Transitioning from *unmatched* to *matched*
        },
        unmatch : function() {
          // Transitioning from *matched* to *unmatched*
        }
      });
      */
      // Mobile Range+
      /*
      enquire.register("max-width: 767px", {
        match : function() {
          // Transitioning from *unmatched* to *matched*
          console.log("Mobile!!!!");
        },
        unmatch : function() {
          // Transitioning from *matched* to *unmatched*
        }
      });
      */
      /* */
      /*
      $(window).resize(function() {
        var currentLayout = Drupal.highwireResponsive.getCurrentLayout();
        //console.log(Drupal.highwireResponsive.getCurrentLayout);
        //console.log(currentLayout);
        if (currentLayout == 'mobile') {
          // Layout is mobile/default
          console.log("hello");
          //$("ul.panels-ajax-tab").prepend("<li>Test</li>");
        }
        else {
          // Layout is wider than mobile (narrow, normal, wide, etc)
        }
      });
      */
      /*
      $('body').bind('highwireResponsiveLayoutTransition', function(e, d) {
        console.log(d);
        //console.log(e);
        if(d.from != d.to) {
          console.log(d);
          // Do something when transitioning between any mediaquery state
          if (d.to == 'mobile') {
            // Layout is mobile/default
            console.log("hello");
            $("ul.panels-ajax-tab").prepend("<li>Test</li>");
          }
          else {
            // Layout is wider than mobile (narrow, normal, wide, etc)
          }
        }
      });
      */
    }
  }
  // Implement a show/hide.
  Drupal.behaviors.menu_attach_block = {
    attach: function (context, settings) {
      // Attach hover events, if this link has been defined as hoverable.
      $('a.menu-attach-block-drop-link.expand-on-hover', context).hover(
          /**
           * Show on mouse in.
           */
          function() {
            // Show the block if it is not already shown.
            if (!($(this).hasClass('dropped'))) {
              expand_toggle($(this));
            }
          },
          /**
           * Hide on mouse out.
           */
          function() {
            expand_toggle($(this));
          }
      );

      // Attach click events for links configured to use that.
      $('a.menu-attach-block-drop-link.expand-on-click', context).click(function(event) {
        expand_toggle($(this));
        event.preventDefault();
      });

      /**
       * Shows a block embedded inside a menu item.
       *
       * @param link
       *   The link attached to this menu item, which triggers block show.
       */
      function expand_toggle(link) {
        if (link.hasClass('menu-ajax-enabled')) {
          // Load contents using AJAX.
          if (!link.hasClass('menu-ajax-loaded')) {
            ajax_path = Drupal.settings.basePath + 'menu_attach_block/ajax/' + (link).attr('data-block-id');
            $.ajax({
              type: 'GET',
              url: ajax_path,
              data: '',
              dataType: 'HTML',
              success: function ($block_html) {
                $(link).next('.menu-attach-block-wrapper').html($block_html);
                Drupal.attachBehaviors(link);
              }
            });
          }
        }
        // Show/hide the link.
        $(link).next('.menu-attach-block-wrapper').toggle();
        $(link).toggleClass('dropped');
      }
    }
  }

  /* Custom JS Events */
  $( document ).ready(function($) {
    /* JCORE-3517: If second pdf on page then add a class on xml download div */
    if ($('#pdf-ds-link').length > 0) {
      $('.main-xml-download').addClass('second-pdf-exist');
    }
    else {
      $('.main-xml-download').removeClass('second-pdf-exist');
    }
    // Expand the mobile slide-out menu
    $("#mini-panel-mobile_slide_out_menu .trigger-1").on("click", function(e) {
      e.preventDefault();
      $("body").toggleClass("menu-out");
    });

    $("#mini-panel-mobile_slide_out_menu .trigger-0").on("click", function(e) {
      e.preventDefault();
      $("body").removeClass("menu-out");
    });

    /* Make the menu close button work */
    $(".menu-close").on("click", function(e) {
      e.preventDefault();
      $(document).trigger("click");
    });

    /* Collapse the body if you click outside the mobile menu */
    $(document, ".menu-close").click(function(event) {
      if(!$(event.target).closest($('.highwire-responsive-toggle-group')).length) {
        $('body').removeClass('menu-out');
      }
      //Platform menu links for narrow layout
      if(!$(event.target).closest($('.region-platmenu')).length) {
        //Hide all drop menu links if clicked outside
        $('.region-platmenu .drop-menu')
                .removeClass('dropped')
                .nextAll('.menu-attach-block-wrapper').hide();
        $('.region-platmenu .drop-menu').children("[class*=icon]").removeClass("icon-arrow-up").addClass("icon-arrow-down")
      }
    });

    // Drop the login menu on the whole menu item, not just the arrow.
    $('a.drop-menu').on("click", function(event) {
      event.preventDefault();

      var dropMenu = $(event.target).closest($('.region-platmenu')).find('.drop-menu');
      var isDroped = false;
      if($(this).hasClass('dropped')){
        isDroped = true;
      }
      dropMenu.removeClass('dropped');
      dropMenu.children("[class*=icon]").removeClass("icon-arrow-up").addClass("icon-arrow-down")
      dropMenu.nextAll('.menu-attach-block-wrapper').hide();
      if(isDroped){
        $(this).removeClass('dropped');
        $(this).children("[class*=icon]").removeClass("icon-arrow-up").addClass("icon-arrow-down");
        $(this).nextAll('.menu-attach-block-wrapper').hide();
      }else{
        $(this).toggleClass("dropped");
        $(this).children("[class*=icon]").toggleClass("icon-arrow-up").toggleClass("icon-arrow-down");
        $(this).next('a.menu-attach-block-drop-link').trigger('click');
      }
    });

    // Drop the login menu on the whole menu item, not just the arrow.
    $('a.mobile-drop-down').on("click", function(event) {
      event.preventDefault();
      $(this).toggleClass("dropped");
      $(this).children("[class*=icon]").toggleClass("icon-plus").toggleClass("icon-close");
      $(this).next('a.menu-attach-block-drop-link').trigger('click');
    });

    // Load the polyfill to use external SVG definitions
    //svg4everybody(); // We are using ajax for the SVG sprite below    

     //load the svg file
    $.ajax({
      url:Drupal.settings.basePath + "sites/default/themes/bmjj/img/defs.svg"
    }).done (function(data) {
      var div = document.createElement("div");
      div.style.display = 'none';
      div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
      document.body.insertBefore(div, document.body.childNodes[0]);
    });

    // Load up the cookiebar
    $('.cookie-message-section').cookieBar({ closeButton : '.wrap-icon svg' });

    $('.more-info').click(function(event){
      event.preventDefault();
      //$('.more-info-text').toggle();

      if($('.more-info-text').hasClass('visible')){
        $('.more-info-text').removeClass('visible');
        $('#cookie-notice .more-info').find('svg').attr("class","icon-white icon-arrow-down");
        $('#cookie-notice .more-info').find('use').attr("xlink:href", "/sites/default/themes/bmjj/img/defs.svg#icon-arrow-down");
      }
      else{
        $('.more-info-text').addClass('visible');
        $('#cookie-notice .more-info').find('svg').attr("class","icon-white icon-arrow-up");
        $('#cookie-notice .more-info').find('use').attr("xlink:href", "/sites/default/themes/bmjj/img/defs.svg#icon-arrow-up");
      }
    });

    //Slide down author affiliates if author name is clicked.
    $('.contributor-list .xref-aff, .author-affiliates .contributor-list .name').click(function (e) {
      e.preventDefault();
      $('.author-affiliates .pane-title').trigger('click');
    });

    $("#sign-in").live("click", function() {
      if ($(this).attr('aria-expanded')=='false') {
        $(this).find('svg').attr("class","icon icon-white icon-arrow-up");
        $(this).find('use').attr("xlink:href", "#icon-arrow-up");
        $(this).attr('aria-expanded', 'true');
        //if ($('.pane-highwire-opportunity-challenge').is(':visible')) {
      }
      else{
        $(this).find('svg').attr("class","icon icon-white icon-arrow-down");
        $(this).find('use').attr("xlink:href", "#icon-arrow-down");
        $(this).attr('aria-expanded', 'false');
      }
      $(".pane-challenge-opportunity-pane-dropdown").toggle();
    });

    //Just trigger the sing-in button click instead of repeating the functionality again.
    $(".society-logins .ui-dialog-titlebar-close").live("click", function() {
      $(this).parents('.article-login').find('#sign-in').trigger('click');
      $(this).closest('.menu-attach-block-wrapper').siblings('.drop-menu').trigger('click');
    });

    // Adjust min height of aricle pane if back-top area is taller
    if($('#back-top').height()>=550){
      $('#article-top .article-pane').css('min-height', $('#back-top').height());
    }

    // Append the social menu to the first column on mobile
    var currentWidth = Drupal.highwireResponsive.getCurrentLayout();

    if(currentWidth == 'mobile') {
      $(".region-footersocial").appendTo(".menu-name-menu-footer-menu-1 > ul > li.first > ul");
    }

    $(".footer-links .content .menu > li[class*='col'] > a").live("click", function(e) {
      e.preventDefault();
    });

  });

  // Logo with PNG fallback for IE8
  if (!Modernizr.svg) {
    document.attachEvent("onreadystatechange", function(){
      if (document.readyState === "complete"){
        var logoSvgSrc = jQuery("#logo-img").attr("src");
        var logoPngSrc = logoSvgSrc.replace(".svg", ".png");
        jQuery("#logo-img").attr("src", logoPngSrc);

        var logoSvgSrc = jQuery(".logo-bmj-journals img").attr("src");
        var logoPngSrc = logoSvgSrc.replace(".svg", ".png");
        jQuery(".logo-bmj-journals img").attr("src", logoPngSrc);
      }
    });
  }

  Drupal.behaviors.bmjjHighwireMarkupProcess = {
    attach: function (context, settings) {
      /**
       * Hide empty highwire markups.
       * In some cases we can have issues due to empty highwire markup content. E.g. We may
       * need to hide pane title in such cases but we don't have control in plugin for that.
       */
      $('.panel-pane.pane-highwire-markup , .pane-highwire-contributors', context).each(function () {
        $pane = $(this);
        var snippetContent = $.trim($('.highwire-markup >div', $pane).text());
        var snippetLink = $.trim($('.highwire-markup >a', $pane).text());
        if (snippetContent == '' && snippetLink == '') {
          $pane.hide();
        }
      });
    }
  };
  Drupal.behaviors.bmjjIE = {
    attach: function (context, settings) {
      if (!Modernizr.svg) {
        $('.fragment-image.lazyload').each(function () {
          $(this).attr('src', $(this).data('src')).removeClass('lazyload');
        });
        $('#sign-in,#menu-login').click(function(e){
           window.location = '/user/login';
           e.preventDefault();
        });
         $('img[src*="svg"]').attr('src', function() {
           return $(this).attr('src').replace('.svg', '.png');
        });


      }
    }
  };
})(jQuery);

;/*})'"*/
;/*})'"*/
!function(root, factory) {
    "function" == typeof define && define.amd ? define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof exports ? module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */
    function embed(svg, g) {
        if (g) {
            var viewBox = !svg.getAttribute("viewBox") && g.getAttribute("viewBox"), fragment = document.createDocumentFragment(), clone = g.cloneNode(!0);
            for (viewBox && svg.setAttribute("viewBox", viewBox); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            svg.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) {
                var x = document.createElement("x");
                x.innerHTML = xhr.responseText, xhr.s.splice(0).map(function(array) {
                    embed(array[0], x.querySelector("#" + array[1].replace(/(\W)/g, "\\$1")));
                });
            }
        }, xhr.onreadystatechange();
    }
    function svg4everybody(opts) {
        function oninterval() {
            for (var use; use = uses[0]; ) {
                var svg = use.parentNode;
                if (svg && /svg/i.test(svg.nodeName)) {
                    var src = use.getAttribute("xlink:href");
                    if (polyfill && (!validate || validate(src, svg, use))) {
                        var url = src.split("#"), url_root = url[0], url_hash = url[1];
                        if (svg.removeChild(use), url_root.length) {
                            var xhr = svgCache[url_root] = svgCache[url_root] || new XMLHttpRequest();
                            xhr.s || (xhr.s = [], xhr.open("GET", url_root), xhr.send()), xhr.s.push([ svg, url_hash ]), 
                            loadreadystatechange(xhr);
                        } else {
                            embed(svg, document.getElementById(url_hash));
                        }
                    }
                }
            }
            requestAnimationFrame(oninterval, 17);
        }
        opts = opts || {};
        var uses = document.getElementsByTagName("use"), polyfill = "polyfill" in opts ? opts.polyfill : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537, validate = opts.validate, requestAnimationFrame = window.requestAnimationFrame || setTimeout, svgCache = {};
        polyfill && oninterval();
    }
    return svg4everybody;
});
;/*})'"*/
;/*})'"*/
/*!
 * jQuery Cookiebar Plugin
 * https://github.com/carlwoodhouse/jquery.cookieBar
 *
 * Copyright 2012, Carl Woodhouse
 * Disclaimer: if you still get fined for not complying with the eu cookielaw, it's not our fault.
 */
 
(function( $ ){
  $.fn.cookieBar = function( options ) {  
	var settings = $.extend( {
      'closeButton' : 'none',
	  'secure' : false,
	  'path' : '/',
	  'domain' : ''
    }, options);
  
    return this.each(function() {       
		var cookiebar = $(this);
		
		// just in case they didnt hide it by default.
		cookiebar.hide();

		// if close button not defined. define it!
		if(settings.closeButton == 'none')
		{
			cookiebar.append('<a class="cookiebar-close">Continue</a>');
			settings = $.extend( {
				'closeButton' : '.cookiebar-close'
			}, options);
		}

		if ($.cookie('cookiebar') != 'hide') {
		  cookiebar.show();
		}

		cookiebar.find(settings.closeButton).click(function() {
			cookiebar.hide();
			$.cookie('cookiebar', 'hide', { path: settings.path, secure: settings.secure, domain: settings.domain, expires: 30 });
			return false;
		});
    });
  };
  
  // self injection init
  $.cookieBar = function( options ) {  
	$('body').prepend('<div class="ui-widget"><div style="display: none;" class="cookie-message ui-widget-header blue"><p>By using this website you allow us to place cookies on your computer. They are harmless and never personally identify you.</p></div></div>');     
	$('.cookie-message').cookieBar(options);
  };
})( jQuery );

/*!
 * Dependancy:
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
            if (decode(pair[0]) === key) return decode(pair[1] || '');
        }
        return null;
    };
})(jQuery);
;/*})'"*/
;/*})'"*/
function parseCookies() {
    let cookieHeader = document.cookie || "";
    let cookies = Object.fromEntries(
      cookieHeader.split("; ").map(c => c.split("="))
    );
    return cookies;
}


  function uuidv4() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
  
function handleCookie() {
    let cookies = parseCookies();
    let bmj_uuid = cookies.bmj_uuid;

    if (!bmj_uuid) {
      bmj_uuid = uuidv4();
      cookies.bmj_uuid = bmj_uuid;
    }

    let bmj_uuid_cookie = `bmj_uuid=${bmj_uuid}; max-age=${366 *
      24 *
      60 *
      60}; domain=.bmj.com; path=/; SameSite=None; Secure`;

    return { bmj_uuid, bmj_uuid_cookie };
}
  
let {bmj_uuid_cookie } = handleCookie();
document.cookie = bmj_uuid_cookie;

;/*})'"*/
;/*})'"*/
/**
 * This function returns the current matching Breakpoint layout using
 * enquire.js. Falls back to legacy Drupal.omega.getCurrentLayout();
 *
 * An example where this is used is the onActivate method for clueTip popups.
 */
 
Drupal.highwireResponsive = Drupal.highwireResponsive || {};
 
(function($) {

  var baseLayout = 'mobile';
  var current = baseLayout;
  var previous = baseLayout;
  var order = [];
  var index = 0;
  var breakpointsReady = false;

  /**
   * Fired when breakpoint matches
   */
  var breakpointMatch = function(key){
    previous = current || baseLayout;
    current = key;
    triggerTransition();
  }

  /**
   * Fired when breakpoint unmatches
   */
  var breakpointUnmatch = function(key){
    previous = key;
    var i = order.indexOf(key);
    current = order[i-1] || baseLayout;
    triggerTransition();
  }

  /**
   * Return the current layout for the page, based on Breakpoint media queries.
   * Fall back to legacy Drupal.omega.getCurrentLayout().
   *
   * @param bool distinctMobileLayouts
   *  If false, will group all the mobile layouts into a single "mobile" layout.
   *  Defaults to false.
   *
   * @return
   *  A string matching the current breakpoint layout name based on viewport size.
   *
   * @see Drupal.highwireResponsive.getMobileLayouts
   */
  Drupal.highwireResponsive.getCurrentLayout = function (distinctMobileLayouts) {
    if (typeof distinctMobileLayouts == 'undefined') {
      distinctMobileLayouts = false;
    }
    if (breakpointsReady) {
      if (!distinctMobileLayouts && Drupal.highwireResponsive.isCurrentLayoutMobile(current)) {
        return baseLayout;
      }
      else {
        return current;
      }
    }
    else if (typeof Drupal.omega != 'undefined') {
      return Drupal.omega.getCurrentLayout(); // See omega-mediaqueries.js in the Omega theme
    }
  };
  
  /**
   * Return previous layout state
   * Fall back to legacy Drupal.omega.getPreviousLayout().
   *
   * @param bool distinctMobileLayouts
   *  If false, will group all the mobile layouts into a single "mobile" layout.
   *  Defaults to false.
   *  
   * @return
   *  A string matching the previous breakpoint layout name based on viewport size.
   *
   * @see Drupal.highwireResponsive.getMobileLayouts
   */
  Drupal.highwireResponsive.getPreviousLayout = function (distinctMobileLayouts) {
    if (typeof distinctMobileLayouts == 'undefined') {
      distinctMobileLayouts = false;
    }
    if (breakpointsReady) { 
      if (!distinctMobileLayouts && Drupal.highwireResponsive.isCurrentLayoutMobile(previous)) {
        return baseLayout;
      }
      else {
        return previous;
      }
    }
    else if (typeof Drupal.omega != 'undefined') {
      return Drupal.omega.getPreviousLayout(); // See omega-mediaqueries.js in the Omega theme
    }
  };

  /**
   * Determine whether the layout is part of the mobile layout group.
   *
   * @param string layout
   *  The layout to check.
   *
   * @return
   *  True if the layout is part of the mobile group, otherwise false.
   *
   * @see Drupal.highwireResponsive.getMobileLayouts
   */
  Drupal.highwireResponsive.isCurrentLayoutMobile = function (layout) {
    layout = layout || baseLayout;
    var mobileLayouts = Drupal.highwireResponsive.getMobileLayouts();
    if (mobileLayouts.indexOf(layout) != -1) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Get the layouts that should be grouped together as "mobile".
   *
   * @return
   *  An array of layout keys.
   */
  Drupal.highwireResponsive.getMobileLayouts = function () {
    return [
      'mobile',
      'zero',
      'xsmall'
    ];
  };
  
 /**
  *  This adds responsive body classes, i.e. hw-responsive-layout-narrow 
  *  This also adds a global trigger event which fires on the transition, similar to Omega's resize.responsivelayout event.
  *
  *  // Example
  *  $('body').bind('highwireResponsiveLayoutTransition', function(e, d) {
  *    if(d.from != d.to) {
  *      // Do something when transitioning between any mediaquery state
  *    }
  *  });
  */
  var triggerTransition = function() {
    $('body').removeClass('hw-responsive-layout-' + previous).addClass('hw-responsive-layout-' + current); 
    $.event.trigger('highwireResponsiveLayoutTransition', {from: previous, to: current});
  }

  Drupal.behaviors.highwireResponsiveMediaQueries = {
    attach: function (context, settings) {
      if (typeof Drupal.settings.highwireResponsive != 'undefined' &&  Drupal.settings.highwireResponsive.enquire_enabled === 1 && Drupal.settings.highwireResponsive.breakpoints_configured === 1) {
        if (typeof Drupal.settings.highwireResponsive.breakpoints != 'undefined') {
          breakpointsReady = true;
        }
      }
      /**
       * Setup and register enquire.js callbacks based on breakpoints
       * If Breakpoints are configured but no match is made, this will often return 'mobile'.
       * This is done to support mobile-first design - in practice you shouldn't be
       * defining a "mobile" media query as it should be assumed to be the default.
       */
      if (breakpointsReady) {
        // Breakpoints should be defined in order of smallest to largest
        var breakpoints = Drupal.settings.highwireResponsive.breakpoints;
        $.each(breakpoints, function( key, value ) {
          order[index] = key;
          index++;
          enquire.register(value, {
            match : function() {
              breakpointMatch(key);
            },
            unmatch : function() {
              breakpointUnmatch(key);
            }
          });

        });
        // Trigger transition on initial page load
        $(window, context).bind('load', function(){
          triggerTransition();
        });
      }
    }
  };

})(jQuery); 

;/*})'"*/
;/*})'"*/
