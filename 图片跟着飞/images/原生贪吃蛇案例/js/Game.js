/*
 * @Author: yhf 
 * @Date: 2018-09-10 15:37:16 
 * @Last Modified by: yhf
 * @Last Modified time: 2018-09-11 08:30:40
 */
(function () {
    // 定义this
    var _this = null;
    // 键盘方向
    var key = 39;
    // 定时器
    var time = null;

    // 启动游戏构造函数
    function Game() {
        // 初始化食物
        this.food = new Food();
        // 初始化蛇
        this.snake = new Snake();
        // 定义画布
        this.wrap = wrap;
        // 定义this
        _this = this;
        // 判断是否点击开始
        this.bol = false;
    };

    // 添加原型启动游戏函数
    Game.prototype.init = function () {
        // 初始化食物
        this.food.init(this.wrap);
        // 初始化蛇
        this.snake.init(this.wrap);
        // 蛇动
        this.runSnake();
        // 键盘事件
        this.keyDown();
    };

    // 添加原型蛇动起来
    Game.prototype.runSnake = function () {
        // 添加名为time的定时器
        time = setInterval(function () {
            // 蛇动函数
            this.snake.move(this.food, this.wrap);
            // 初始化蛇
            this.snake.init(this.wrap);

            // 最大横纵坐标 --蛇最大可以移动的距离
            var maxX = wrap.offsetWidth / this.snake.width;
            var maxY = wrap.offsetHeight / this.snake.height;

            // 获取蛇头部横纵坐标
            var hearX = this.snake.body[0].x;
            var hearY = this.snake.body[0].y;

            // 判断是否碰到墙壁结束游戏
            if (hearX < 0 || hearX >= maxX) {
                // 清空函数
                this.empty();
            };
            if (hearY < 0 || hearY >= maxY) {
                // 清空函数
                this.empty();
            };
            if (!this.snake.stfh) {
                this.snake.stfh = true;
                this.empty();
            }
            df.innerHTML = "得分：" + this.snake.df;
            ssc.innerHTML = "蛇身长度：" + (this.snake.df + 2);

        }.bind(_this), 150);
    };

    // 添加原型方法--键盘和鼠标事件
    Game.prototype.keyDown = function () {
        // document.addEventListener("keydown", function (e) {
        //     // 此时this应该是keydown的事件对象
        //     // 所以this就是document
        //     // 获取按键值
        //     keyfn(this, e.keyCode);
        // }.bind(_this), false);

        // 鼠标拖动控制方向
        var dx = 0; //鼠标点击时的位置
        var dy = 0; //鼠标点击时的位置
        var sx = 0; //鼠标当前位置
        var sy = 0; //鼠标当前位置
        // 给页面添加监听事件
        // 监听鼠标按下
        document.onmousedown = function (e) {
            bol = true;
            dx = e.clientX;
            dy = e.clientY;
            e.preventDefault();
        }
        // 鼠标移动
        document.onmousemove = function (e) {
            sx = e.clientX;
            sy = e.clientY;
        }
        // 鼠标抬起
        document.onmouseup = function () {
            console.log(sx - dx)
            if (Math.abs(sx - dx) > Math.abs(sy - dy)) {
                if (sx - dx > 0) {
                    keyfn(this, 39);
                } else {
                    keyfn(this, 37);
                }
            } else if (sy - dy == 0) {
                keyfn(this, 39);
            } else {
                if (sy - dy > 0) {
                    keyfn(this, 40);
                } else {
                    keyfn(this, 38);
                }
            }
        }.bind(_this);

        // 给页面添加监听事件
        // 监听键盘按下
        document.onkeydown = function (e) {
            keyfn(this, e.keyCode);
        }.bind(_this);
    };
    // 添加原型-停止游戏
    Game.prototype.stop = function () {
        clearInterval(time);
        this.bol = false;
    }

    // 添加原型-结束游戏
    Game.prototype.empty = function () {
        alert("游戏结束");
        // 结束定时器
        clearInterval(time);
        // 删除清空蛇
        this.snake.empty();
        // 删除清空食物
        this.food.empty();
        // 结束游戏
        this.bol = false;
        // 清空得分
        this.snake.df = 0;
    }

    // 键盘事件
    function keyfn(_this, keys) {
        switch (keys) {
            case 37: //左
                if (key != 39 && key != 68) {
                    _this.snake.direction = "left";
                    key = keys;
                }
                break;

            case 38: //上
                if (key != 40 && key != 83) {
                    _this.snake.direction = "top";
                    key = keys;
                }
                break;

            case 39: //右
                if (key != 37 && key != 65) {
                    _this.snake.direction = "right";
                    key = keys;
                }
                break;

            case 40: //下
                if (key != 38 && key != 87) {
                    _this.snake.direction = "bottom";
                    key = keys;
                }
                break;


            case 65: //左
                if (key != 39 && key != 68) {
                    _this.snake.direction = "left";
                    key = keys;
                }
                break;

            case 87: //上
                if (key != 40 && key != 83) {
                    _this.snake.direction = "top";
                    key = keys;
                }
                break;

            case 68: //右
                if (key != 37 && key != 65) {
                    _this.snake.direction = "right";
                    key = keys;
                }
                break;

            case 83: //下
                if (key != 38 && key != 87) {
                    _this.snake.direction = "bottom";
                    key = keys;
                }
                break;
        }
    }

    // 把Game暴露给window
    window.Game = Game;
}());