/**
 * Returns get parameters.
 * If the desired param does not exist, null will be returned
 * @example value = $.getParam("paramName");
 */
window.getParam = function(e) {
    var d = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
    var f = window.location.search.substr(1).match(d);
    if (f != null ) {
        return unescape(f[2])
    }
    return null
};
window.isDebug = !!this.getParam("debug") || !!(("TiExt"in window) && !!TiExt.test);
var G = {
    init:function () {
        this.initFlexible();
        this.initRequireJs();
    },
    //requireJs config
    initRequireJs:function(){
        require.config({
            baseUrl: "js/lib",
            paths: {
                jquery: "zepto.min",
                mock:'mock-min',
            },
            shim: {
                jquery: {
                    exports: "$"
                },
                underscore:{
                    exports:'_'
                },

            },
            urlArgs: isDebug ? "" : "v=" + Math.floor((new Date()).getTime() / 1000 / 60)
        });
    },
    getParam: window.getParam,
    loadJs: function(d) {
        var f = document.getElementsByTagName("HEAD").item(0);
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.src = d;
        f.appendChild(e)
    },
    initFlexible: function() {
        this.loadJs("js/lib/flexible.js")
    },
};
window.G = G;
G.init();
