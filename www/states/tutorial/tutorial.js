$(document).ready(function() {
  $("#owl-content").owlCarousel();
  var contentH = $(".content").height();
  var owlPageH = $(".owl-theme .owl-controls").height();
  $(".owl-carousel .owl-wrapper-outer").height(contentH - owlPageH*2);
});
