var info = null;

document.addEventListener("deviceready", function() {

    if (!localStorage.getItem("rp_data")) {
        var rp_data = {
            data: []
        };
        localStorage.setItem("rp_data", JSON.stringify(rp_data));
    }

    info = JSON.parse(localStorage.getItem("rp_data"));

    // cordova.plugins.notification.local.on("click", function (notification, state) {
    //     alert(notification.id + " was clicked");
    //     cordova.plugins.notification.local.clear(notification.id, function() {
    //         alert("done");
    //     });
    // }, this)

    // info.data = info.data.splice(1, 1);
    // rp_data = {data: info.data};
    // localStorage.setItem("rp_data", JSON.stringify(rp_data));

}, false);

function schedule(id, title, message, schedule_time, repeat) {
    cordova.plugins.notification.local.schedule({
        id: id,
        title: title,
        message: message,
        at: schedule_time,
        every: repeat
    });

    var array = [id, title, message, schedule_time, repeat];
    // alert(array);
    info.data[info.data.length] = array;
    localStorage.setItem("rp_data", JSON.stringify(info));

    navigator.notification.alert("Reminder added successfully")
}

// Test Purpose
function edit(repeatTime) {
    cordova.plugins.notification.local.update({
        id: 0,
        every: repeatTime
    });

    info.data[0][4] = repeatTime;
    localStorage.setItem("rp_data", JSON.stringify(info));

    navigator.notification.alert("Reminder edited successfully")
}

function add_reminder() {
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var title = document.getElementById("title").value;
    var message = document.getElementById("message").value;

    if (date == "" || time == "" || title == "" || message == "") {
        navigator.notification.alert("Please enter all details");
        return;
    }

    var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
    schedule_time = new Date(schedule_time);

    var id = info.data.length;

    cordova.plugins.notification.local.hasPermission(function(granted) {
        if (granted == true) {
            schedule(id, title, message, schedule_time, 1);
        } else {
            cordova.plugins.notification.local.registerPermission(function(granted) {
                if (granted == true) {
                    schedule(id, title, message, schedule_time, 1);
                } else {
                    navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
                }
            });
        }
    });
}

// Test Purpose
function edit_reminder() {
    var repeatTime = document.getElementById("repeatTime").value;

    if (repeatTime == "") {
        navigator.notification.alert("Please select repeat time");
        return;
    }

    cordova.plugins.notification.local.hasPermission(function(granted) {
        if (granted == true) {
            edit(repeatTime);
        } else {
            cordova.plugins.notification.local.registerPermission(function(granted) {
                if (granted == true) {
                    edit(repeatTime);
                } else {
                    navigator.notification.alert("Reminder cannot be added because app doesn't have permission");
                }
            });
        }
    });
}

$(document).on("pagebeforeshow", "#pending", function() {

    var html = '';

    for (var count = 0; count < info.data.length; count++) {
        var schedule_time = new Date(info.data[count][3]).getTime();
        var current_time = new Date().getTime();

        if (current_time < schedule_time) {
            html = html + "<tr><td>" + info.data[count][1] + "</td><td>" + info.data[count][3] + "</td></tr>";
        }
    }

    $("table#pendingTable tbody").empty();
    $("table#pendingTable tbody").append(html).closest("table#pendingTable").table("refresh").trigger("create");

    // See if the event 0 is scheduled
    cordova.plugins.notification.local.isScheduled(0, function(schedule) {
        alert(info.data[0][3]);
        // alert(schedule ? "schedule" : "not found");
    });

});

// Test Purpose only
$(document).on("pagebeforeshow", "#edit", function() {

    var html = '';

    for (var count = 0; count < info.data.length; count++) {
        var schedule_time = new Date(info.data[count][3]).getTime();
        var current_time = new Date().getTime();
        // alert(info.data[count][4] != 0);
        if (info.data[count][4] != 0) {
            html = html + "<tr><td>" +
                info.data[count][1] +
                "</td><td><select id='repeatTime'><option value=" +
                info.data[count][4] +
                ">" + info.data[count][4] +
                "</option><option value='2'>2</option></select></td></tr>";
        }
    }

    $("table#editTable tbody").empty();
    $("table#editTable tbody").append(html).closest("table#editTable").table("refresh").trigger("create");

});

$(document).on("pagebeforeshow", "#all", function() {

    var html = '';

    for (var count = 0; count < info.data.length; count++) {
        html = html +
            "<tr><td>" +
            info.data[count][1] + "</td><td>" +
            info.data[count][3] + "</td><td>" +
            info.data[count][4] +
            "</td></tr>";
    }

    $("table#allTable tbody").empty();
    $("table#allTable tbody").append(html).closest("table#allTable").table("refresh").trigger("create");
});
