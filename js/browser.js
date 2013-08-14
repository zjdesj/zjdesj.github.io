var ug = navigator.userAgent;
var _browser = {
    ie: /MSIE/i.test(ug),
    ff: /Firefox/i.test(ug),
    apple: (/ipad/i.test(ug) || /iphone/i.test(ug)),
    ipad: /ipad/i.test(ug),
    iphone: /iphone/i.test(ug),
    chrome: /WebKit/i.test(ug) && /Chrome/i.test(ug) && !(function () {
        try {
            if (window.external.max_version) {
                return true;
            } else {
                return false
            }
        } catch (e) {
            return false;
        }
    })() && !/QQBrowser/i.test(ug),
    opera: /Opera/i.test(ug),
    safari: /WebKit/i.test(ug) && (!/Chrome/i.test(ug) && (!/Maxthon/i.test(ug)) && /Safari/i.test(ug)),
    maxthon: (function () {
        try {
            if (window.external.max_version) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    })()
};
