/*
 * @Author: yhf 
 * @Date: 2018-09-10 23:45:57 
 * @Last Modified by: yhf
 * @Last Modified time: 2018-09-11 09:08:18
 */
// 获取定义的蛇地图
const wrap = document.querySelector(".wrap");
const btn = document.querySelectorAll("input");
const df = document.querySelector(".df");
const ssc = document.querySelector(".ssc");

// 定义运动函数
var gm = new Game(wrap);
btn[0].onclick = function () {
    // 判断点击了不可以再点击
    if (gm.bol) {
        return;
    }
    // 开关
    gm.bol = "true";
    // 开启游戏
    gm.init();
}
btn[1].onclick = function () {
    // 停止游戏
    gm.stop();
}
btn[2].onclick = function () {
    // 未点击开始不可以点击
    if (!gm.bol) {
        return;
    }
    // 结束游戏
    gm.empty();
}



/*
 * 后期添加项目：
 * 食物颜色改变不同的颜色，加的身体值不同
 * 改关卡闯关
 * 添加其他功能
 * 未完待续。。。
 * 手机事件
 * 
 */