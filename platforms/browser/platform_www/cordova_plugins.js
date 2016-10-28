cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/src/browser/StatusBarProxy.js",
        "id": "cordova-plugin-statusbar.StatusBarProxy",
        "pluginId": "cordova-plugin-statusbar",
        "runs": true
    },
    {
        "file": "plugins/com.phonegap.plugins.video/3.0.0/www/video.js",
        "id": "com.phonegap.plugins.video.VideoPlayer",
        "pluginId": "com.phonegap.plugins.video",
        "clobbers": [
            "VideoPlayer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-statusbar": "2.2.0",
    "com.phonegap.plugins.video": "1.0.0"
}
// BOTTOM OF METADATA
});