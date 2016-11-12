cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.video/3.0.0/www/video.js",
        "id": "com.phonegap.plugins.video.VideoPlayer",
        "clobbers": [
            "VideoPlayer"
        ]
    },
    {
        "file": "plugins/com.telerik.plugins.nativepagetransitions/www/NativePageTransitions.js",
        "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
        "clobbers": [
            "window.plugins.nativepagetransitions"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-statusbar": "2.2.0",
    "com.phonegap.plugins.video": "1.0.0",
    "com.telerik.plugins.nativepagetransitions": "0.6.5"
};
// BOTTOM OF METADATA
});