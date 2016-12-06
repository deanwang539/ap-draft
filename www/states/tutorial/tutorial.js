$(document).ready(function() {
  $("#owl-content").owlCarousel();
  var contentH = $(".content").height();
  var owlPageH = $(".owl-theme .owl-controls").height();
  $(".owl-carousel .owl-wrapper-outer").height(contentH - owlPageH*2);
  $(".owl-carousel .owl-wrapper").height(contentH - owlPageH*2);

  $('.tutorial-btn').delayed('click', 500, function() {
    window.plugins.nativepagetransitions.slide({
        "direction" : "up",
        "href" : "../ap/ap.html"
    });
  });
});
