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
        var pTop = pChart.top;
        var pLeft = pChart.left-$('#aChart').width();
        $('#dChart').append('Chart');
        $('#dChart').css({"position": "absolute", 'top':pTop-$('#aChart').height()*1.15, 'left':pLeft});
        $('#dPlus').append('Plus');
        $('#dPlus').css({"position": "absolute", 'top':pTop-$('#aChart').height()*2.55, 'left':pLeft});
        $('#dHeart').append('Heart');
        $('#dHeart').css({"position": "absolute", 'top':pTop-$('#aChart').height()*3.95, 'left':pLeft});
        $('#dEnvelope').append('Enve');
        $('#dEnvelope').css({"position": "absolute", 'top':pTop-$('#aChart').height()*5.35, 'left':pLeft});
        $(".title-item").fadeIn(500);
        $(".menu-clicked").show();
      }else{
        $('#dChart').html("");
        $('#dPlus').html("");
        $('#dHeart').html("");
        $('#dEnvelope').html("");
        $(".title-item").hide();
        $(".menu-clicked").hide();
      }
    });
});
