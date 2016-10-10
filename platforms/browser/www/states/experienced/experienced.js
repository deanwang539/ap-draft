$(document).ready(function() {
    $("#accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "fill"
    });
    $("#accordion").on("click", function(){
      var accordion_active = $("#accordion").accordion("option", "active");
      console.log(accordion_active);
      if (accordion_active === 0) {
        $(".sub-content").hide("fade", {}, 500, {});
        $(".tutorial-btn").hide("fade", {}, 500, {});
      } else {
        $(".sub-content").show("fade", {}, 500, {});
        $(".tutorial-btn").show("fade", {}, 500, {});
      }});
      // set heights for divs
      var sc_top = $("#accordion").height();
      $(".sub-content").css("top", sc_top);
      var sc_height = $(".sub-content").height();
      var total_height = $(".content").height();
      $(".footer").css("height", total_height-sc_top-sc_height);
});
