window.onload = () => {
    let wrap = document.querySelector(".wrap");
    let min = document.querySelector(".min");
    let min_img = document.querySelector(".min img");
    let min_wrap = document.querySelector(".min_wrap");
    let max_img = document.querySelector(".max_wrap img");
    let max_wrap = document.querySelector(".max_wrap");

    // 鼠标进入框架显示遮罩和大图
    min.onmouseenter = () => {
        min_wrap.style.display = "block";
        max_wrap.style.display = "block";
    }
    // 鼠标离开框架隐藏遮罩和大图
    min.onmouseleave = () => {
        min_wrap.style.display = "none";
        max_wrap.style.display = "none";
    }

    // 鼠标移动事件
    wrap.onmousemove = e => {
        // 兼容写法
        var e = e || window.event;
        // 获取鼠标的移动位置
        let x = e.clientX - wrap.offsetLeft - min_wrap.offsetWidth / 2;
        let y = e.clientY - wrap.offsetTop - min_wrap.offsetHeight / 2;

        // 判断不要超出框架
        if (x < 0) {
            x = 0;
        } else if (x > min_img.offsetWidth - min_wrap.offsetWidth) {
            x = min_img.offsetWidth - min_wrap.offsetWidth;
        }

        if (y < 0) {
            y = 0;
        } else if (y > min_img.offsetHeight - min_wrap.offsetHeight) {
            y = min_img.offsetHeight - min_wrap.offsetHeight;
        }

        // 设置遮罩移动
        min_wrap.style.left = x + "px";
        min_wrap.style.top = y + "px";

        // 计算比例
        let bl = (max_img.offsetWidth-max_wrap.offsetWidth) / (min.offsetWidth - min_wrap.offsetWidth);
        
        // 设置大图移动
        max_img.style.left = -x * bl + "px";
        max_img.style.top = -y * bl + "px";
    }
}