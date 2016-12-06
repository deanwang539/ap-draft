$(document).on('pagebeforecreate', '[data-role="page"]', function(){
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
    },1);
});

$(document).on('pageshow', '[data-role="page"]', function(){
    var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
    },300);
});

$(document).ready(function(){
  var hHeight = $('[data-role="header"]').height();
  var fHeight = $('[data-role="footer"]').height();
  var fTopBorder = $('[data-role="footer"]').css('borderTopWidth').replace("px", "");
  var tHeight = $('.content').height();
  $('#ap-content').height(tHeight-hHeight-fHeight-fTopBorder*2.0);

  $('#a-warmup').delayed('click', 200, function() {
    $(location).attr('href', '../warmup/warmup.html');
  });
  $('#a-review').delayed('click', 200, function() {
    $(location).attr('href', '../review/review.html');
  });
});
