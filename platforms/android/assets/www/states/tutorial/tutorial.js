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
        $(".tutorial-btn").hide();
      } else {
        $(".tutorial-btn").show();
      }});
});
