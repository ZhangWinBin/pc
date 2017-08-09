/****
 *
 * @param curEle  当前需要获取的元素
 * @param attr   当前需要获取元素的属性名
 * @returns {*}
 */
function getCss(curEle, attr) {
    var value = null;
    var reg = null;
    if ('getComputedStyle' in window) { // 标准浏览器下
        value = getComputedStyle(curEle, null)[attr];
    } else {// 非标准浏览器
        if (attr == 'opacity') { //  处理透明度的问题，IE6-8下 需要使用filter
            value = curEle.currentStyle.filter;
            reg = /^alpha\(opacity[=:](\d+)\)$/i;   //alpha(opacity=50)
            return reg.test(value) ? reg.exec(value)[1] / 100 : 1;
        }
        value = curEle.currentStyle[attr];
    }

    return value = parseFloat(value);

}

/****
 *
 * @param curEle 当前元素 也就是需要设置样式的元素
 * @param attr   当前元素需要设置的属性名
 * @param value  当前元素需要设置的属性值
 */

function setCss(curEle, attr, value) {
    if (attr == 'float') {
        curEle.style.cssFloat = value;
        curEle.style.styleFloat = value;
        return;
    }
    if (attr == 'opacity') {
        curEle.style.opacity = value;
        curEle.style.filter = 'alpha(opacity=' + value * 100 + ')';
        return
    }
    //  对单位进行处理
    var reg = /^(width|height|top|bottom|left|right|((margin|padding)(top|bottom|left|right))(px|pt|rem|em))$/gi;
    if (reg.test(attr)) {
        if (!(value === 'auto' || value.toString().indexOf('%') !== -1)) {
            value = parseFloat(value) + 'px';
        }
    }
    curEle.style[attr] = value;
}

/****
 *
 * @param curEle 需要设置的当前元素
 * @param option  对象 需要设置的属性名和属性值
 */
function setGroup(curEle, option) {

    if (option.toString() !== '[object Object]')return;
    for (var attr in option) {
        setCss(curEle, attr, option[attr]);
    }

}

// 即可以获取 也可以设置一个或者多个
//  第一个参数是确定的，其他不确定，我们不需要写形参，用自带的arguments
function css(curEle) {
    var arr2 = arguments[1];
    if (typeof arr2 === 'string') {
        var arr3 = arguments[2];
        if (typeof arr3 === 'undefined') {
            return getCss(curEle, arr2);
        } else {
            setCss(curEle, arr2, arr3);
        }
    }
    if (arr2.toString() == '[object Object]') {
        setGroup(curEle, arr2);
    }
}