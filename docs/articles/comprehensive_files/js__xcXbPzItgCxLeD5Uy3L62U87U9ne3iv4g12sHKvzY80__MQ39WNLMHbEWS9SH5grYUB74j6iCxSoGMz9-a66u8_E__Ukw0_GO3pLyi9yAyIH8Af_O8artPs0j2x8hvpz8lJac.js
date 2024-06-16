/*!
 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});
;/*})'"*/
;/*})'"*/
/**
 * @file
 * HW PDF tab treatment.
 *
 * Copyright (c) HighWire Press, Inc.
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */
(function ($) {
  Drupal.behaviors.highwire_panels_ajax_tab = {
    attach: function (context, settings) {
      $('a.panels-ajax-tab-tab', context, settings).once('hw-panels-ajax-tabs-once', function() {
        if (typeof(settings.highwire_panel_tabs) != "undefined") {
          for (var i = settings.highwire_panel_tabs.length -1; i >= 0; i--) {
            var panel_name = settings.highwire_panel_tabs[i].panel_name;
            if ($(this).data('panel-name') == panel_name) {
              $(this).unbind('click').attr('target', '_blank');
            }
          }
        }
      });
      $('a.highwire-article-nav-jumplink', context, settings).once('hw-panels-ajax-tabs-once', function() {
        if (typeof(settings.highwire_panel_tabs) != "undefined") {
          var panel_ajax_tab = settings.highwire_panel_tabs.panel_ajax_tab;
          if ($(this).data('panel-ajax-tab') == panel_ajax_tab) {
            $(this).unbind('click').attr('target', '_blank');
          }
        }
      });
    }
  };
})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * @file
 * Highwire Google Scholar citation sprinkle links
 *
 * Copyright (c) HighWire Press, Inc
 * This software is open-source licensed under the GNU Public License Version 2
 * or later. The full license is available in the LICENSE.TXT file at the root
 * of this repository.
 */

(function ($) {
  Drupal.behaviors.highwire_google_scholar = { attach: function (context, settings) {
    if($('.cit-extra').length > 0) {
      $('.cit-list .ref-cit').once('google_scholar_link',function() {
        $(this).each(function() {

          // Pull the set of authors to submit as an array.
          var authorList = '';
          var c = 0;
          $(this).find('.cit-auth').each(function () {

            var given = $(this).find('.cit-name-given-names') !== 'undefined' ? $(this).find('.cit-name-given-names').html() : '';
            var surname = $(this).find('.cit-name-surname') !== 'undefined' ? $(this).find('.cit-name-surname').html() : '';
            if(given || surname) {
              authorList += '&author[' + c + ']=' + (given ? given : '') + (surname ? '+' + surname : '');
            } else if ($(this).hasClass('cit-collab')) {
              authorList += '&author[' + c + ']=' + $(this).text();
            }
            c++;
          });

          var articleTitle = $(this).find('.cit-article-title').length > 0 ? $(this).find('.cit-article-title').text() : false;

          var articlePub = $(this).find('.cit-pub-date').length > 0 ? $(this).find('.cit-pub-date').html() : false;

          var gs_link_suffix = '';
          // We need all three values to submit a lookup.
          if (articleTitle !== false
            && articlePub !== false
            && authorList !== '') {
            // Regex used to strip inlne html tags from article title.
            var gs = {
              gsAuthor: authorList,
              gsTitle: articleTitle.replace(/< *img[^>]*src *= *["\']?([^"\']*)"\/>/gi, '').replace(/\ /g, '+'),
              publicationYear: articlePub
            };
            // Additional, non-required fields that are available in various
            // citation formats.
            extraFields = {
              journal: $(this).find('.cit-jnl-abbrev').length > 0 ? $(this).find('.cit-jnl-abbrev').html() : false,
              volume: $(this).find('.cit-vol').length > 0 ? $(this).find('.cit-vol').html() : false,
              issn: $(this).find('.cit-issn').length > 0 ? $(this).find('.cit-issn').html() : false,
              isbn: $(this).find('.cit-isbn').length > 0 ? $(this).find('.cit-isbn').html() : false,
              doi: $(this).find('.cit-doi').length > 0 ? $(this).find('.cit-doi').html() : false,
              pages: ($(this).find('.cit-fpage').length > 0 && $(this).find('.cit-lpage').length > 0)? $(this).find('.cit-fpage').html() + '-' +  $(this).find('.cit-lpage').html() : false
            };

            extraFieldString = '';
            $.each(extraFields, function (idx, val){
              if (val !== false) {
                extraFieldString += '&' + idx + '=' + val.replace(/\ /g, '+');
              }
            });
            gs_link_suffix = authorList + '&title=' + gs.gsTitle + '&publication_year=' + gs.publicationYear + extraFieldString;
          }
          else {
            var q_text = $(this).find('cite').clone().remove().end().text();
            if (q_text.length) {
              q_text = q_text.replace(/< *img[^>]*src *= *["\']?([^"\']*)"\/>/i, '');
              var q_split = q_text.split(' ');
              var q_temp = [];
              $.each(q_split, function (idx, val) {
                if (val !== '') {
                  q_temp.push(encodeURIComponent(val));
                }
              });
              q_text = q_temp.join('+');
              gs_link_suffix = '&q_txt=' + q_text;
            }
          }
          if (gs_link_suffix) {
            var gs_link = '<a href="/lookup/google-scholar?link_type=googlescholar&gs_type=article' + gs_link_suffix + '" class="cit-ref-sprinkles cit-ref-sprinkles-google-scholar cit-ref-sprinkles-google-scholar"><span>Google Scholar</span></a>';

            $(this, context).once('custom-js', function(){
              $(this).find('.cit-extra').append(gs_link);
            });
          }
        });
      });
    }
  }}
})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * Highwire OpenURL
 *
 * Copyright (c) HighWire Press, Inc
 * This software is open-source licensed under the GNU Public License Version 2
 * or later. The full license is available in the LICENSE.TXT file at the root
 * of this repository.
 */

(function ($) {
  Drupal.behaviors.highwire_openurl = { attach: function (context, settings) {
    if ($('.cit-ref-sprinkles-open-url').length > 0) {
      // Get the insitutional OpenURL branding data
      var id = '';
      if ("apath" in Drupal.settings.highwire) {
        id = '?apath=' + encodeURIComponent(Drupal.settings.highwire.apath);
      }
      $.getJSON(

        Drupal.settings.basePath + 'highwire/openurl_branding' + id,
        function(data){
          if(data){
            // Add to Drupal.settings in case we have another use for it
            Drupal.settings.highwireOpenurl = data;

            // Not all journals have OpenURL implementations
            if (data.base_url === null) {
              $('.cit-ref-sprinkles-open-url').hide();
            }
            else {
              // Update each link to show institutional branding
              $('.cit-ref-sprinkles-open-url').each(function(){
                var $link = $(this);
                $link.once('insertImage', function(){
                  var branding = Drupal.settings.highwireOpenurl;
                  var href = $link.attr('href');
                  var placeholder = '';
                  var queryKey = '';

                  // Check if this is content from old markup server.
                  if (href.indexOf('{openurl}') != -1) {
                    // Set placeholder accordingly.
                    placeholder = '{openurl}';
                    // The href from the old markup server is encoded twice, so decode twice.
                    href = decodeURIComponent(href);
                    try {
                      href = decodeURIComponent(href);   
                    } catch(e) {
                      // debug if needed 
                    }
                  }
                  // Check if this is content from the new markup server.
                  // @see JIRA ticket: GP-86
                  else if (href.indexOf('urn:openurl:') != -1) {
                    // Set placeholdet text and query key accordingly.
                    placeholder = 'urn:openurl:';
                    queryKey = '?';
                  }
                  // Update openURL link with new href and text.
                  href = href.replace('?query=','?');
                  href = href.replace(placeholder, Drupal.settings.basePath + 'highwire/openurl' + queryKey);
                  var openurl_link = href + '&redirect_url=' + branding.base_url;
                  $link.attr('href', openurl_link.replace(/\+/g,  " "));
                  $link.text(branding.link_text);
                  if(branding.image){
                    $link.prepend('<img src="' + branding.image + '"/>');
                  }
                });
              });
            }
          }
        }
      );
    }
  }}
})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * @file
 * Axon theme behaviors.
 */

(function ($) {
  Drupal.behaviors.axonThemeScripts = {
    attach: function(context, settings) {
    
      /**
       * Breakpoints returned by highwire_responsive_breakpoints are available
       * as a JS object: Drupal.settings.highwireResponsive.breakpoints  
       */

      // Narrow Range+
      enquire.register(Drupal.settings.highwireResponsive.breakpoints.narrow, {
        match : function() {
          // Transitioning from *unmatched* to *matched*
        },
        unmatch : function() {
          // Transitioning from *matched* to *unmatched*
        }
      });

      
    }
  }
})(jQuery);

;/*})'"*/
;/*})'"*/
