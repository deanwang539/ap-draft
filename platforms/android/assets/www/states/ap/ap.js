var info = null;
var codropsEvents = {};
var transEndEventNames = {};

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
                function(msg) {
                    console.log("success: " + msg);
                }, // called when the animation has finished
                function(msg) {
                    alert("error: " + msg);
                } // called in case you pass in weird values
            );

            // clear data and notifications
            // localStorage.removeItem("rp_data");
            // cordova.plugins.notification.local.cancelAll(function() {
            //     alert("cleaning done");
            // }, this);

            // save data for calendar
            if (!localStorage.getItem("rp_data")) {
                var rp_data = {
                    data: []
                };
                localStorage.setItem("rp_data", JSON.stringify(rp_data));
            }

            info = JSON.parse(localStorage.getItem("rp_data"));
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

            // create calendar
            for (var count = 0; count < info.data.length; count++) {
              if(info.data[count][5]) {
                continue;
              }
              var nDate = new Date(info.data[count][3]);
              var date_format = addZero(nDate.getMonth()+1) + "-" + addZero(nDate.getDate()) + "-" + nDate.getFullYear();
              var date_content = info.data[count][1];
              if(codropsEvents.hasOwnProperty(date_format)) {
                codropsEvents[date_format] += '<span>'+ date_content +'</span>';
              } else {
                codropsEvents[date_format] = '<span>'+ date_content +'</span>';
              }

              // show repeat on calendar
              var repeatTimes = info.data[count][4];
              var curMonth = nDate.getMonth()+1;
              var curYear = nDate.getFullYear();
              var curDay = nDate.getDate();
              if(repeatTimes === "day") {
                for(var ctMonths = 1; ctMonths <= 3; ctMonths++) {
                  var day = findDays(curMonth);
                  while(curDay <= day-1) {
                    date_format = addZero(curMonth) + "-" + addZero(curDay+1) + "-" + curYear;
                    if(codropsEvents.hasOwnProperty(date_format)) {
                      codropsEvents[date_format] += '<span>'+ date_content +'</span>';
                    } else {
                      codropsEvents[date_format] = '<span>'+ date_content +'</span>';
                    }
                    curDay += 1;
                  }
                  if(curMonth==12) {
                    curYear += 1;
                    curMonth = 1;
                    curDay = 0;
                  }else{
                    curMonth += 1;
                    curDay = 0;
                  }
                }
              }else if(repeatTimes === "week") {
                for(var ctMonths2 = 1; ctMonths2 <= 3; ctMonths2++) {
                  var day2 = findDays(curMonth);
                  while(curDay <= day2 - 7) {
                    date_format = addZero(curMonth) + "-" + addZero(curDay+7) + "-" + curYear;
                    if(codropsEvents.hasOwnProperty(date_format)) {
                      codropsEvents[date_format] += '<span>'+ date_content +'</span>';
                    } else {
                      codropsEvents[date_format] = '<span>'+ date_content +'</span>';
                    }
                    curDay += 7;
                  }
                  curDay = curDay - day2 - 7;
                  if(curMonth==12) {
                    curYear += 1;
                    curMonth = 1;
                  }else{
                    curMonth += 1;
                  }
                }
              }
            }
            transEndEventNames = {
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

            // original
            // var codropsEvents = {
            //     '12-24-2016': '<span>Christmas Eve</span>',
            //     '12-25-2016': '<span>Christmas Day</span>',
            // };
            // var transEndEventNames = {
            //         'WebkitTransition': 'webkitTransitionEnd',
            //         'MozTransition': 'transitionend',
            //         'OTransition': 'oTransitionEnd',
            //         'msTransition': 'MSTransitionEnd',
            //         'transition': 'transitionend'
            //     },
            //     transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
            //     $wrapper = $('#custom-inner'),
            //     $calendar = $('#calendar'),
            //     cal = $calendar.calendario({
            //         onDayClick: function($el, $contentEl, dateProperties) {
            //             if ($contentEl.length > 0) {
            //                 showEvents($contentEl, dateProperties);
            //             }
            //         },
            //         caldata: codropsEvents,
            //         displayWeekAbbr: true
            //     }),
            //     $month = $('#custom-month').html(cal.getMonthName()),
            //     $year = $('#custom-year').html(cal.getYear());
            //
            // $('#custom-next').on('click', function() {
            //     cal.gotoNextMonth(updateMonthYear);
            // });
            // $('#custom-prev').on('click', function() {
            //     cal.gotoPreviousMonth(updateMonthYear);
            // });

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

            // adjust height for scrollable area below calendar
            var chHeight = $('.custom-header').outerHeight();
            var caHeight = $('#calendar').outerHeight();
            $('#plan-content').height(tHeight - chHeight - caHeight - hHeight - fHeight - fTopBorder * 2.0 - 40.0);

            // show today content
            showTodayContent();

            // chain popups for reminders
            var page_width = window.innerWidth;
            // open and close all-reminders
            $('#btn-all-rem').on('click', function() {
                $('#rem-manager').one({
                    popupafterclose: function() {
                        // update tables for all-reminders
                        var html = '';
                        for (var count = 0; count < info.data.length; count++) {
                            if (info.data[count][5] === false) {
                              var repeatTime = "";
                              if (info.data[count][4] === "0") {
                                  repeatTime = "Once";
                              } else {
                                  repeatTime = "Every&nbsp;" + info.data[count][4];
                              }
                              html = html +
                                  "<tr><td style='text-align:center'>" +
                                  info.data[count][1] + "</td><td style='text-align:center'>" +
                                  new Date(info.data[count][3]).toLocaleString() + "</td><td style='text-align:center'>" +
                                  repeatTime +
                                  "</td></tr>";
                            }
                        }
                        $("table#allTable tbody").empty();
                        $("table#allTable tbody").append(html).closest("table#allTable").table("refresh").trigger("create");

                        // popup for all-reminders page
                        setTimeout(function() {
                            $('#all-reminders').css({
                                'width': page_width * 0.8
                            });
                            $('#all-reminders').popup('open', {
                                transition: "fade"
                            });
                        }, 100);
                    }
                });
            });
            $('#back-to-rem').on('click', function() {
                $('#all-reminders').one({
                    popupafterclose: function() {
                        setTimeout(function() {
                            $('#rem-manager').popup('open', {
                                transition: "fade"
                            });
                        }, 100);
                    }
                });
            });
            // open and close add-reminders
            $('#btn-add-rem').on('click', function() {
                $('#rem-manager').one({
                    popupafterclose: function() {
                        setTimeout(function() {
                            $('#add-reminders').css({
                                'width': page_width * 0.8
                            });
                            $('#add-reminders').popup('open', {
                                transition: "fade"
                            });
                        }, 100);
                    }
                });
            });
            $('#back-to-rem2').on('click', function() {
                $('#add-reminders').one({
                    popupafterclose: function() {
                        setTimeout(function() {
                            $('#rem-manager').popup('open', {
                                transition: "fade"
                            });
                        }, 100);
                    }
                });
            });
            // open and close edit-reminders
            $('#btn-edit-rem').on('click', function() {
                $('#rem-manager').one({
                    popupafterclose: function() {
                        var html = '';
                        for (var count = 0; count < info.data.length; count++) {
                          if(info.data[count][5] === false) {
                            var optionBody = '';
                            if(info.data[count][4] === "0") {
                              optionBody = "<option value='0' selected>Once</option>" +
                                           "<option value='day'>Day</option>" +
                                           "<option value='week'>Week</option>";
                            } else if(info.data[count][4] === "day") {
                              optionBody = "<option value='0'>Once</option>" +
                                           "<option value='day' selected>Day</option>" +
                                           "<option value='week'>Week</option>";
                            } else if(info.data[count][4] === "week") {
                              optionBody = "<option value='0'>Once</option>" +
                                           "<option value='day'>Day</option>" +
                                           "<option value='week' selected>Week</option>";
                            }
                            html = html + "<tr><td style='text-align:center'>" +
                                info.data[count][1] +
                                "</td><td style='text-align:center'>" +
                                "<input type='date' id='date_" + info.data[count][0]  + "' value='" + addZero(new Date(info.data[count][3]).getMonth()+1) + "/" + addZero(new Date(info.data[count][3]).getDate()) + "/" + new Date(info.data[count][3]).getFullYear() + "'/>" +
                                "</td><td style='text-align:center'>" +
                                "<input type='time' id='time_" + info.data[count][0]  + "' value='"+ addZero(new Date(info.data[count][3]).getHours()) +":" + addZero(new Date(info.data[count][3]).getMinutes()) +"'/>" +
                                "</td><td style='text-align:center'><select id='repeat_add_rem_" + info.data[count][0] + "'>" +
                                optionBody +
                                "</select></td><td style='text-align:center; vertical-align:middle;'>" +
                                "<input type='checkbox' id='chk_" + info.data[count][0] + "'/>" +
                                "</td></tr>";
                          }
                        }
                        $("table#editTable tbody").empty();
                        $("table#editTable tbody").append(html).closest("table#editTable").table("refresh").trigger("create");
                        $('input[type="date"], input[type="time"]').each(function() {
                            var el = this, type = $(el).attr('type');
                            if ($(el).val() === '') $(el).attr('type', 'text');
                            $(el).focus(function() {
                                $(el).attr('type', type);
                                el.click();
                            });
                            $(el).blur(function() {
                                if ($(el).val() === '') $(el).attr('type', 'text');
                            });
                        });
                        setTimeout(function() {
                            $('#edit-reminders').css({
                                'width': page_width * 0.95
                            });
                            $('#edit-reminders').popup('open', {
                                transition: "fade"
                            });
                        }, 100);
                    }
                });
            });
            $('#back-to-rem3').on('click', function() {
                $('#edit-reminders').one({
                    popupafterclose: function() {
                        setTimeout(function() {
                            $('#rem-manager').popup('open', {
                                transition: "fade"
                            });
                        }, 100);
                    }
                });
            });
            $('#back-to-plan').on('click', function() {
              // refresh calendar
              updateCalendar();
            });
        });
    }
};

// logic for reminder actions
function schedule(id, title, message, schedule_time, repeat) {
    cordova.plugins.notification.local.schedule({
        id: id,
        title: title,
        message: message,
        at: schedule_time,
        every: repeat
    });

    var array = [id, title, message, schedule_time, repeat, false];
    info.data[info.data.length] = array;
    localStorage.setItem("rp_data", JSON.stringify(info));

    navigator.notification.alert("Reminder added successfully");
    $('#back-to-rem2').click();
}

function edit(id, schedule_time, repeat, is_delete) {
    cordova.plugins.notification.local.update({
        id: id,
        at: schedule_time,
        every: repeat
    });
    info.data[id][3] = schedule_time;
    info.data[id][4] = repeat;
    info.data[id][5] = is_delete;
    localStorage.setItem("rp_data", JSON.stringify(info));
}

function add_reminder() {
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var title = document.getElementById("title").value;
    var message = document.getElementById("message").value;
    var repeat = document.getElementById("repeat_add_rem").value;

    if (date === "" || time === "" || title === "" || message === "") {
        navigator.notification.alert("Please enter all details");
        return;
    }

    var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
    schedule_time = new Date(schedule_time);

    var id = info.data.length;

    cordova.plugins.notification.local.hasPermission(function(granted) {
        if (granted === true) {
            schedule(id, title, message, schedule_time, repeat);
        } else {
            cordova.plugins.notification.local.registerPermission(function(granted) {
                if (granted === true) {
                    schedule(id, title, message, schedule_time, repeat);
                } else {
                    navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
                }
            });
        }
    });
}

function edit_reminder() {
    for (var count = 0; count < info.data.length; count++) {
      if(info.data[count][5]) {
        continue;
      }
      var rem_id = info.data[count][0];
      var date = document.getElementById("date_"+info.data[count][0]).value;
      var time = document.getElementById("time_"+info.data[count][0]).value;
      var repeat = document.getElementById("repeat_add_rem_"+info.data[count][0]).value;
      var is_delete = document.getElementById("chk_"+info.data[count][0]).checked;
      var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
      schedule_time = new Date(schedule_time);

      if (date === "" || time === "") {
          navigator.notification.alert("Please enter all details");
          return;
      }

      if(!info.data[count][5]) {
        cordova.plugins.notification.local.hasPermission(function(granted) {
            if (granted === true) {
                edit(rem_id, schedule_time, repeat, is_delete);
            } else {
                cordova.plugins.notification.local.registerPermission(function(granted) {
                    if (granted === true) {
                      edit(rem_id, schedule_time, repeat, is_delete);
                    } else {
                        navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
                    }
                });
            }
        });
      }
      if(is_delete) {
        cordova.plugins.notification.local.cancel(info.data[count][0], function() {
            alert("Deleted Chosen Reminder");
        });
      }
    }
    navigator.notification.alert("Reminder edited successfully");
    $('#back-to-rem3').click();
}

function updateCalendar() {
  codropsEvents = {};
  transEndEventNames = {};
  for (var count = 0; count < info.data.length; count++) {
    if(info.data[count][5]) {
      continue;
    }
    var nDate = new Date(info.data[count][3]);
    var date_format = addZero(nDate.getMonth()+1) + "-" + addZero(nDate.getDate()) + "-" + nDate.getFullYear();
    var date_content = info.data[count][1];
    if(codropsEvents.hasOwnProperty(date_format)) {
      codropsEvents[date_format] += '<span>'+ date_content +'</span>';
    }else {
      codropsEvents[date_format] = '<span>'+ date_content +'</span>';
    }

    // show repeat on calendar
    var repeatTimes = info.data[count][4];
    var curMonth = nDate.getMonth()+1;
    var curYear = nDate.getFullYear();
    var curDay = nDate.getDate();
    if(repeatTimes === "day") {
      for(var ctMonths = 1; ctMonths <= 3; ctMonths++) {
        var day = findDays(curMonth);
        while(curDay <= day-1) {
          date_format = addZero(curMonth) + "-" + addZero(curDay+1) + "-" + curYear;
          if(codropsEvents.hasOwnProperty(date_format)) {
            codropsEvents[date_format] += '<span>'+ date_content +'</span>';
          } else {
            codropsEvents[date_format] = '<span>'+ date_content +'</span>';
          }
          curDay += 1;
        }
        if(curMonth==12) {
          curYear += 1;
          curMonth = 1;
          curDay = 0;
        }else{
          curMonth += 1;
          curDay = 0;
        }
      }
    }else if(repeatTimes === "week") {
      for(var ctMonths2 = 1; ctMonths2 <= 3; ctMonths2++) {
        var day2 = findDays(curMonth);
        while(curDay <= day2 - 7) {
          date_format = addZero(curMonth) + "-" + addZero(curDay+7) + "-" + curYear;
          if(codropsEvents.hasOwnProperty(date_format)) {
            codropsEvents[date_format] += '<span>'+ date_content +'</span>';
          } else {
            codropsEvents[date_format] = '<span>'+ date_content +'</span>';
          }
          curDay += 7;
        }
        curDay = curDay - day2 - 7;
        if(curMonth==12) {
          curYear += 1;
          curMonth = 1;
        }else{
          curMonth += 1;
        }
      }
    }

  }
  transEndEventNames = {
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
  showTodayContent();
}

// Show Today Content
function showTodayContent() {
  var today = new Date();
  var today_year = today.getFullYear();
  var today_month = today.getMonth()+1;
  var today_date = today.getDate();
  var today_format = addZero(today_month) + "-" + addZero(today_date) + "-" + today_year;
  var html_li = "";
  if (codropsEvents.hasOwnProperty(today_format)) {
    var li_content = codropsEvents[today_format].replace(/<span>/g, "").split("</span>");
    for(var i=0; i<li_content.length; i++) {
      html_li += "<li>" + li_content[i] + "</li>";
    }
    // navigator.notification.alert(li_content.length);
  }else {
    html_li = "None. Enjoy your day!";
  }
  $("#plan-content ul").html(html_li);
}

// add zero before time and month
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function findDays(month) {
  var day = 0;
  switch (month) {
    case 1:
        day = 31;
        break;
    case 2:
        day = 28;
        break;
    case 3:
        day = 31;
        break;
    case 4:
        day = 30;
        break;
    case 5:
        day = 31;
        break;
    case 6:
        day = 30;
        break;
    case 7:
        day = 31;
        break;
    case 8:
        day = 31;
        break;
    case 9:
        day = 30;
        break;
    case 10:
        day = 31;
        break;
    case 11:
        day = 30;
        break;
    case 12:
        day = 31;
        break;
  }
  return day;
}
