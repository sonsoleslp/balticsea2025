!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i);if(j){var k=h.getAttribute("xlink:href")||h.getAttribute("href");!k&&g.attributeName&&(k=h.getAttribute(g.attributeName));if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});
;/*})'"*/
;/*})'"*/
(function ($) {
  Drupal.behaviors.svg4everybody = {
    attach: function (context, settings) {
      svg4everybody();
    }
  };
}(jQuery));

;/*})'"*/
;/*})'"*/
(function ($) {
  Drupal.behaviors.hideDisabledAltmetrics = {
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
      // The is no known way of detecting the success so we need this little trick to hide pane.
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
                  // If no altmetrics widget returned, hide the pane and kill the connection.
                  altmetricspane.hide();
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
jQuery(document).ready(function($) {  
  $('.resource-centre ul.menu').each(function() {
    var list = $(this),
    product_select = $(document.createElement('select')).insertBefore($(this).hide()).change(function() {
      window.location.href=$(this).val();
    });

    var default_option = $(document.createElement('option')).html('Select Product');
    default_option.attr('selected', 'selected');
    default_option.attr('disabled', 'disabled');
    default_option.appendTo(product_select);

    $('>li a', this).each(function() {
      var option = $(document.createElement('option')).appendTo(product_select).val(this.href).html($(this).html());
    });
    list.remove();
  });
});

;/*})'"*/
;/*})'"*/
jQuery(document).ready(function($) {  
  $('#off-0').removeClass('hide'); 
  $('#contact-select').change(function() {
    var id = $(this).val();
    $('.contact-footer').each(function() {
      if (id == $(this).attr('id')) {
        $(this).removeClass('hide');
      }
      else {
        $(this).addClass('hide');
      }
    });
  });
});

;/*})'"*/
;/*})'"*/
jQuery(document).ready(function ($) {      
  var i = 1;

  function add_button_hide_parent() {
    var button='';
    // make sure this is an answer, and assuming there will be less than 10
    if ($(this).text().slice(0, 6) == 'Answer') {
      $(this).parent().addClass('toggle-' + i);
      $(this).parent().hide();
      button = '<button type="button" class="answer-toggle" id="toggle-' + i + '">Show Answer ' + i + '</button>';
      $(this).parent().before(button);
      ++i;
    }
  }

  $('div.section.collapsible.init-closed h2').each(add_button_hide_parent);
  $('div.subsection.collapsible.init-closed h3').each(add_button_hide_parent);

  $('.answer-toggle').click(function() {
    var id = this.id, toggle_class = '', toggle_number = '';
    toggle_class = 'div.' + id;
    toggle_number = toggle_class.slice(-1);
    $(toggle_class).toggle();
    if ($(this).text().slice(0, 11) == 'Show Answer') {
      $(this).text('Hide Answer ' + toggle_number);
    }
    else {
      $(this).text('Show Answer ' + toggle_number);
    }
  });
});

/*(function($) {
  Drupal.behaviors.bmjjQuestionToggle = {
    attach: function(context, settings) {
      $('div.collapsible', context).once('bmjjQuestionToggle', function () {
        $('div.collapsible').before('<button type="button" class="answer-toggle">Show Answer</button>');
        $('div.collapsible').hide();
        $('.answer-toggle').click(function() {
          $('div.collapsible').toggle();
          $(this).html($(this).html() == 'Show Answer' ? 'Hide Answer' : 'Show Answer');
        });
      });
    }
  }
})(jQuery);
*/

;/*})'"*/
;/*})'"*/
