var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      $(document).ready(function() {
        // page transition execution
        window.plugins.nativepagetransitions.executePendingTransition(
          function (msg) {console.log("success: " + msg);}, // called when the animation has finished
          function (msg) {alert("error: " + msg);} // called in case you pass in weird values
        );

        $("#owl-content").owlCarousel({
          singleItem:true,
          items: 1
        });
        var contentH = $(".content").height();
        var owlPageH = $(".owl-theme .owl-controls").height();
        $(".owl-carousel .owl-wrapper-outer").height(contentH - owlPageH*2);
        $(".owl-carousel .owl-wrapper").height(contentH - owlPageH*2);

        // $('#continue').delayed('click', 300, function() {
        $('#continue').on('click', function() {
          $("#continue_btn").css({
            "transition-timing-function": "linear",
            "transition-duration": "200ms",
            "-webkit-transform": "scale(0.9, 0.9) translate3d(0, 0 , 0)",
            "opacity": "0.8"
          });
          setTimeout(function(){
            // page transitions
            window.plugins.nativepagetransitions.slide({
              "direction"        : "down", // 'left|right|up|down', default 'left' (which is like 'next')
              "duration"         :  300, // in milliseconds (ms), default 400
              "slowdownfactor"   :    3, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
              "slidePixels"      :  100, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
              "androiddelay"     :   -1, // same as above but for Android, default 70
              "href" : "../ap/ap.html"
            });
          }, 300);
        });

        $('#watch_video').delayed('click', 300, function() {
          // VideoPlayer.play("http://um3dlab-db.miserver.it.umich.edu/acupressure/acupressure-test.mp4");
          var options = {
            successCallback: function() {
              $("#watch_video_btn").css({
                "-webkit-transform": "scale(1.0, 1.0) translate3d(0, 0 , 0)",
                "opacity": "1.0"
              });
              console.log("Video was closed without error.");
            },
            errorCallback: function(errMsg) {
              $("#watch_video_btn").css({
                "-webkit-transform": "scale(1.0, 1.0) translate3d(0, 0 , 0)",
                "opacity": "1.0"
              });
              console.log("Error! " + errMsg);
            },
            // orientation: 'landscape',
            shouldAutoClose: false
          };
          window.plugins.streamingMedia.playVideo("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", options);
        });
      });
    }
};
