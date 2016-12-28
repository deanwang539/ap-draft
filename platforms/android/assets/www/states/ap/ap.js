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
        $("a[data-role=tab]").each(function() {
            var anchor = $(this);
            anchor.bind("click", function() {
                $.mobile.changePage(anchor.attr("href"), {
                    transition: "none",
                    changeHash: false
                });
                return false;
            });
        });
        $(document).ready(function() {
            // page transition execution
            window.plugins.nativepagetransitions.executePendingTransition(
              function (msg) {console.log("success: " + msg);}, // called when the animation has finished
              function (msg) {alert("error: " + msg);} // called in case you pass in weird values
            );
            // scroll
            var sContent = new iScroll('ap-content');

            // adjust height for acp page
            var hHeight = $('[data-role="header"]').height();
            var fHeight = $('[data-role="footer"]').height();
            var fTopBorder = $('[data-role="footer"]').css('borderTopWidth').replace("px", "");
            var tHeight = $('.content').height();
            $('#ap-content').height(tHeight - hHeight - fHeight - fTopBorder * 2.0);
            $('#ap-bg').height($('#ap-content').height() * 0.85);
            $('#ap-bg').css('margin-top', $('#ap-content').height() * 0.1 + 'px');
            $('#ap-bg').css('margin-bottom', $('#ap-content').height() * 0.05 + 'px');

            // actions for ap-menu-click
            $('.ap-menu-clicked').css('padding-top', $('[data-role="header"]').height() + 'px');
            $("#ap-exp-menu input").click(function() {
              if ($("#ap-exp-menu input").is(':checked')) {
                $(".ap-menu-clicked").slideDown();
              } else {
                $(".ap-menu-clicked").slideUp();
              }
            });

            // add des for menu-click
            $("#exp-menu input").click(function() {
                if ($("#exp-menu input").is(':checked')) {
                    var pChart = $('#aChart').offset();
                    var pTop = pChart.top;
                    var pLeft = pChart.left - $('#aChart').width();
                    $('#dChart').append('Chart');
                    $('#dChart').css({
                        "position": "absolute",
                        'top': pTop - $('#aChart').height() * 1.15,
                        'left': pLeft
                    });
                    $('#dPlus').append('Plus');
                    $('#dPlus').css({
                        "position": "absolute",
                        'top': pTop - $('#aChart').height() * 2.55,
                        'left': pLeft
                    });
                    $('#dHeart').append('Heart');
                    $('#dHeart').css({
                        "position": "absolute",
                        'top': pTop - $('#aChart').height() * 3.95,
                        'left': pLeft
                    });
                    $('#dEnvelope').append('Enve');
                    $('#dEnvelope').css({
                        "position": "absolute",
                        'top': pTop - $('#aChart').height() * 5.35,
                        'left': pLeft
                    });
                    $(".title-item").fadeIn(500);
                    $(".menu-clicked").show();
                } else {
                    $('#dChart').html("");
                    $('#dPlus').html("");
                    $('#dHeart').html("");
                    $('#dEnvelope').html("");
                    $(".title-item").hide();
                    $(".menu-clicked").hide();
                }
            });

            // plan calendar
            // test data
            var codropsEvents = {
              '12-24-2016' : '<span>Christmas Eve</span>',
            	'12-25-2016' : '<span>Christmas Day</span>',
            };
            // end test data
            var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'msTransition': 'MSTransitionEnd',
                    'transition': 'transitionend'
                },
                transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
                $wrapper = $('#custom-inner'),
                $calendar = $('#calendar'),
                cal = $calendar.calendario({
                    onDayClick: function($el, $contentEl, dateProperties) {
                        if ($contentEl.length > 0) {
                            showEvents($contentEl, dateProperties);
                        }
                    },
                    caldata: codropsEvents,
                    displayWeekAbbr: true
                }),
                $month = $('#custom-month').html(cal.getMonthName()),
                $year = $('#custom-year').html(cal.getYear());

            $('#custom-next').on('click', function() {
                cal.gotoNextMonth(updateMonthYear);
            });
            $('#custom-prev').on('click', function() {
                cal.gotoPreviousMonth(updateMonthYear);
            });

            function updateMonthYear() {
                $month.html(cal.getMonthName());
                $year.html(cal.getYear());
            }

            function showEvents($contentEl, dateProperties) {

                hideEvents();

                var $events = $('<div id="custom-content-reveal" class="custom-content-reveal"><h4>Events for ' + dateProperties.monthname + ' ' + dateProperties.day + ', ' + dateProperties.year + '</h4></div>'),
                    $close = $('<span class="custom-content-close"></span>').on('click', hideEvents);

                $events.append($contentEl.html(), $close).insertAfter($wrapper);

                setTimeout(function() {
                    $events.css('top', '0%');
                }, 25);
            }

            function hideEvents() {

                var $events = $('#custom-content-reveal');
                if ($events.length > 0) {
                    $events.css('top', '100%');
                    Modernizr.csstransitions ? $events.on(transEndEventName, function() {
                        $(this).remove();
                    }) : $events.remove();
                }
            }

            var chHeight = $('.custom-header').outerHeight();
            var caHeight = $('#calendar').outerHeight();
            $('#plan-content').height(tHeight - chHeight - caHeight - hHeight - fHeight - fTopBorder * 2.0 -20.0);
            // $('#plan-content').getNiceScroll().resize();
        });
    }
};