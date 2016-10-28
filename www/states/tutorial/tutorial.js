$(document).ready(function() {
    $("#accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "fill"
    });
    $("#accordion").on("click", function(){
      var accordion_active = $("#accordion").accordion("option", "active");
      if (accordion_active === 0) {
        $(".tutorial-btn").hide("fade", {}, 500, {});
      } else {
        $(".tutorial-btn").show("fade", {}, 500, {});
      }});
});
