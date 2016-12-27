$(document).ready(function() {
  $("#owl-content").owlCarousel({
    singleItem:true,
    items: 1
  });
  var contentH = $(".content").height();
  var owlPageH = $(".owl-theme .owl-controls").height();
  $(".owl-carousel .owl-wrapper-outer").height(contentH - owlPageH*2);
  $(".owl-carousel .owl-wrapper").height(contentH - owlPageH*2);

  $('#continue').delayed('click', 300, function() {
    // page transitions
    window.plugins.nativepagetransitions.slide({
      "direction"        : "down", // 'left|right|up|down', default 'left' (which is like 'next')
      "duration"         :  500, // in milliseconds (ms), default 400
      "slowdownfactor"   :    3, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
      "androiddelay"     :  150, // same as above but for Android, default 70
      "href" : "../ap/ap.html"
    });
  });

  $('#watch_video').delayed('click', 300, function() {
    // VideoPlayer.play("http://um3dlab-db.miserver.it.umich.edu/acupressure/acupressure-test.mp4");
    var options = {
      successCallback: function() {
        console.log("Video was closed without error.");
      },
      errorCallback: function(errMsg) {
        console.log("Error! " + errMsg);
      },
      // orientation: 'landscape',
      shouldAutoClose: false
    };
    window.plugins.streamingMedia.playVideo("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", options);
  });
});
