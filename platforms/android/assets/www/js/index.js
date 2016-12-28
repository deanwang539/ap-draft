/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        // console.log('Received Event: ' + id);
        $(document).ready(function(){
          // $('#a-exp').delayed('click', 300, function() {
          //   window.plugins.nativepagetransitions.slide({
          //       "href" : "states/ap/ap.html"
          //   });
          // });
          // $('#a-tut').delayed('click', 300, function() {
          //   window.plugins.nativepagetransitions.slide({
          //     "href" : "states/tutorial/tutorial.html"
          //   });
          // });
          $('#a-tut').on('click', function(){
            var options = {
              "direction"        : "left", // 'left|right|up|down', default 'left' (which is like 'next')
              "duration"         :  300, // in milliseconds (ms), default 400
              "slowdownfactor"   :    3, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
              "androiddelay"     :  -1, // same as above but for Android, default 70
              "href" : "states/tutorial/tutorial.html"
            };
            window.plugins.nativepagetransitions.slide(
              options,
              function (msg) {console.log("success: " + msg);}, // called when the animation has finished
              function (msg) {alert("error: " + msg);} // called in case you pass in weird values
            );
          });
          $('#a-exp').on('click', function(){
            var options = {
              "direction"        : "down", // 'left|right|up|down', default 'left' (which is like 'next')
              "duration"         :  300, // in milliseconds (ms), default 400
              "slowdownfactor"   :    3, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
              "slidePixels"      :  100, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
              "androiddelay"     :  -1, // same as above but for Android, default 70
              "href" : "states/ap/ap.html"
            };
            window.plugins.nativepagetransitions.slide(
              options,
              function (msg) {console.log("success: " + msg);}, // called when the animation has finished
              function (msg) {alert("error: " + msg);} // called in case you pass in weird values
            );
          });
        });
    }
};
