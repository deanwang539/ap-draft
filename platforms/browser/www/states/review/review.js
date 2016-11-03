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
