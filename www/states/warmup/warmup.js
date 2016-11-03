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
    $("#exp-menu input").click(function(){
      if($("#exp-menu input").is(':checked')){
        var pChart = $('#aChart').offset();
        $('#dChart').append('Chart');
        $('#dChart').css({"position": "absolute", 'top':pChart.top-$('#aChart').height()*1.1, 'left':pChart.left-$('#aChart').width()});
      }else{
        $('#dChart').html("");
      }
    });
});
