export function pxTomm (value,arrDPI) {
    var inch = value/arrDPI[0];
    var c_value = inch * 25.4;
    return +c_value.toFixed(2);
}
export function mmToPx(value,arrDPI){
    var inch = value/25.4;
    var c_value = inch*arrDPI[0];
    return +c_value.toFixed(2);
}
export function getDeviceXDPI () {
    var arrDPI = new Array;
    if (window.screen.deviceXDPI) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
    } else {
        var tmpNode = document.createElement("DIV");
        tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
    }
    return arrDPI;
}