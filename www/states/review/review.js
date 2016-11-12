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
  $('#a-ap').delayed('click', 200, function() {
    $(location).attr('href', '../ap/ap.html');
  });
  $('#a-warmup').delayed('click', 200, function() {
    $(location).attr('href', '../warmup/warmup.html');
  });
});
