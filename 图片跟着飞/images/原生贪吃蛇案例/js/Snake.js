/*
 * @Author: yhf 
 * @Date: 2018-09-10 14:28:55 
 * @Last Modified by: yhf
 * @Last Modified time: 2018-09-11 08:28:31
 */
(function () {
    // 存放蛇数组·
    var elements = [];

    // 蛇的函数
    function Snake(width, height, direction) {
        // 计算得分
        this.df = 0;
        // 判断是否碰到身体
        this.stfh = true;
        // 蛇的宽高
        this.width = width || 20;
        this.height = height || 20;
        // 蛇身体
        this.body = [{
            x: 3,
            y: 2,
            color: "red"
        }, {
            x: 2,
            y: 2,
            color: "#00FFFF"
        }, {
            x: 1,
            y: 2,
            color: "pink"
        }];
        // 颜色
        this.col = ["#F0F8FF", "#FAEBD7", "#F0F8FF", "#FAEBD7", "#00FFFF", "#7FFFD4", "#F0FFFF", "#F5F5DC", "#FFE4C4", "#000000", "#FFEBCD", "#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00", "#D2691E", "#FF7F50", "#6495ED", "#FFF8DC", "#DC143C", "#00FFFF", "#00008B", "#008B8B", "#B8860B", "#A9A9A9", "#006400", "#BDB76B", "#8B008B", "#556B2F", "#FF8C00", "#9932CC", "#8B0000", "#E9967A", "#8FBC8F", "#483D8B", "#2F4F4F", "#00CED1", "#9400D3", "#FF1493", "#00BFFF", "#696969", "#1E90FF", "#D19275", "#B22222", "#FFFAF0", "#228B22", "#FF00FF", "#DCDCDC", "#F8F8FF", "#FFD700", "#DAA520", "#808080", "#008000", "#ADFF2F", "#F0FFF0", "#FF69B4", "#CD5C5C", "#4B0082", "#FFFFF0", "#F0E68C", "#E6E6FA", "#FFF0F5", "#7CFC00", "#FFFACD", "#ADD8E6", "#F08080", "#E0FFFF", "#FAFAD2", "#D3D3D3", "#90EE90", "#FFB6C1", "#FFA07A", "#20B2AA", "#87CEFA", "#8470FF", "#778899", "#B0C4DE", "#FFFFE0", "#00FF00", "#32CD32", "#FAF0E6", "#FF00FF", "#800000", "#66CDAA", "#0000CD", "#BA55D3", "#9370D8", "#3CB371", "#7B68EE", "#00FA9A", "#48D1CC", "#C71585", "#191970", "#F5FFFA", "#FFE4E1", "#FFE4B5", "#FFDEAD", "#000080", "#FDF5E6", "#808000", "#6B8E23", "#FFA500", "#FF4500", "#DA70D6", "#EEE8AA", "#98FB98", "#AFEEEE", "#D87093", "#FFEFD5", "#FFDAB9", "#CD853F", "#FFC0CB", "#DDA0DD", "#B0E0E6", "#800080", "#FF0000", "#BC8F8F", "#4169E1", "#8B4513", "#FA8072", "#F4A460", "#2E8B57", "#FFF5EE", "#A0522D", "#C0C0C0", "#87CEEB", "#6A5ACD", "#708090", "#FFFAFA", "#00FF7F", "#4682B4", "#D2B48C", "#008080", "#D8BFD8", "#FF6347", "#40E0D0", "#EE82EE", "#D02090", "#F5DEB3", "#FFFFFF", "#F5F5F5", "#FFFF00", "#9ACD32"];
        // 蛇的行走方向
        this.direction = direction || "right";
    };


    // 添加原型初始化蛇
    Snake.prototype.init = function (wrap) {

        // 初始化删除蛇
        remove();

        // 循环创建蛇的身体
        for (let i = 0; i < this.body.length; i++) {
            // 初始化this.body[i]
            const ele = this.body[i];
            // 创建蛇
            var div = document.createElement("div");
            // 添加蛇到地图
            wrap.appendChild(div);
            // div脱离文档流
            div.style.position = "absolute";
            // div宽高
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            // div颜色
            div.style.backgroundColor = ele.color;
            // div横纵坐标
            var x = this.width * ele.x;
            var y = this.height * ele.y;
            // 设置横纵坐标
            div.style.left = x + "px";
            div.style.top = y + "px";
            // 添加到数组
            elements.push(div);
        }
    };

    // 添加原型方法--蛇动起来
    Snake.prototype.move = function (food, wrap) {

        // 获取到蛇身体数据
        var i = this.body.length - 1;
        // 循环设置身体的变动位置，把蛇头以外，从蛇尾开始把前一位的数据获取到
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 判断键盘到移动改变蛇头到移动方向
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        // 获取蛇头到横纵坐标
        var sx = this.body[0].x * this.width;
        var sy = this.body[0].y * this.height;
        // 判断蛇头是否吃到了食物
        if (sx == food.x && sy == food.y) {
            var sjys = parseInt(Math.random() * this.col.length);
            for (let i = 0; i < this.col.length; i++) {
                const ele = this.col[i];
                if (i == sjys) {
                    this.df++;
                    // 获取到蛇的尾巴
                    var list = this.body[this.body.length - 1];
                    // 再蛇身体添加多一个身体值
                    this.body.push({
                        x: list.x,
                        y: list.y,
                        color: ele
                    });
                    // 删除食物
                    food.init(wrap);
                }
            }
            // this.df++;
            // // 获取到蛇的尾巴
            // var list = this.body[this.body.length - 1];
            // // 再蛇身体添加多一个身体值
            // this.body.push({
            //     x: list.x,
            //     y: list.y,
            //     color: list.color
            // });
            // // 删除食物
            // food.init(wrap);
        }

        // 循环获取身体位置，把蛇头以外，从蛇尾开始把前一位的数据获取到，判断蛇头是否碰到身体，判断生死
        for (var i = this.body.length - 1; i > 0; i--) {
            if (this.body[i].x * this.width == sx && sy == this.body[i].y * this.height) {
                this.stfh = false;
            }
        }

    };

    // 添加原型方法清空蛇
    Snake.prototype.empty = function () {
        remove();
        elements.splice(0, elements.length);
        this.body = [{
            x: 3,
            y: 2,
            color: "red"
        }, {
            x: 2,
            y: 2,
            color: "pink"
        }, {
            x: 1,
            y: 2,
            color: "pink"
        }];
        this.direction = "right";
    };

    // 删除蛇函数
    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            // 从wrap删除
            ele.parentNode.removeChild(ele);
            // 删除数组中到蛇身
            elements.splice(i, 1);
        }
    };


    // 把Snake暴露给window
    window.Snake = Snake;
}());