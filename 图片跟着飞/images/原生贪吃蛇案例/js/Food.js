/*
 * @Author: yhf 
 * @Date: 2018-09-10 12:36:12 
 * @Last Modified by: yhf
 * @Last Modified time: 2018-09-10 20:46:32
 */
(function () {
    // 存放食物的数组
    var elements = [];

    // 食物方法
    function Food(x, y, height, width, color) {
        // 食物的横纵坐标
        this.x = x;
        this.y = y;
        // 食物的宽高
        this.height = height || 20;
        this.width = width || 20;
        // 食物的颜色
        this.color = color || "yellow";
    };

    // 删除食物函数
    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            // 从wrap删除
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    };


    // 添加原型方法--初始化食物
    Food.prototype.init = function (wrap) {
        // 删除食物
        remove();
        // 创建食物
        var div = document.createElement("div");
        // 添加食物到地图
        wrap.appendChild(div);
        // 设置食物div的样式
        // div脱离文档流
        div.style.position = "absolute";
        // div宽高
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        // div颜色
        div.style.backgroundColor = this.color;

        // 随机食物横纵坐标
        this.x = parseInt(Math.random() * (wrap.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (wrap.offsetHeight / this.height)) * this.height;
        // 设置食物横纵坐标
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        // 把新建的数组添加到食物数组中
        elements.push(div);
    };

    // 添加原型方法清空食物
    Food.prototype.empty = function () {
        remove();
        elements.splice(0, elements.length);
    }

    // 把食物暴露给window，外界可以调用
    window.Food = Food;
}());