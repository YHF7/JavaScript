// !{
    // 封装的函数
    // 判断浏览器是否自持方法，得到css返回值
    function getStyle(element, attr) {
        //判断浏览器是否支持这个方法
        return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
    }

    // 封装点击事件移动函数
    //设置任意的一个元素,移动到指定的目标位置
    function fn(element, json, fn1) {
        clearInterval(element.timeId);
        //定时器的id值存储到对象的一个属性中
        element.timeId = setInterval(function () {
            var flag = true; //判断目标到达
            for (const attr in json) {
                //判断这个属性attr中是不是opacity
                if (attr == "opacity") {
                    //获取元素的当前的透明度，放大一百倍
                    var current = getStyle(element, attr) * 100;
                    // 当前属性对应的目标值,放大一百倍
                    var target = json[attr] * 100;
                    //每次移动的距离
                    var step = (target - current) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step); //当前移动到位置
                    current += step;
                    element.style[attr] = current / 100;
                } else if (attr == "zIndex") { //判断这个属性attr中是不是zIndex
                    element.style[attr] = json[attr];

                } else {
                    //获取元素的当前的位置,数字类型
                    var current = parseInt(getStyle(element, attr));
                    // 当前属性对应的目标值
                    var target = json[attr];
                    //每次移动的距离
                    var step = (target - current) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step); //当前移动到位置
                    current += step;
                    element.style[attr] = current + "px";
                }

                if (current != target) {
                    flag = false;
                }
            }
            if (flag) {
                //清理定时器
                clearInterval(element.timeId);
                // 所有属性到达目标后才能使用，并且用户有输入函数
                if (fn1) {
                    fn1();
                }
            }
        }, 20);
    }
// }