window.onload = function () {
    let slide = document.querySelector(".slide");
    let li = document.querySelectorAll("li");
    let arrow = document.querySelector(".arrow");
    let prev = this.document.querySelector(".prev");
    let next = this.document.querySelector(".next");

    let bol = true;

    let arr = [{
            width: 400,
            top: 20,
            left: 50,
            opacity: 0.2,
            zIndex: 2
        }, //0
        {
            width: 600,
            top: 70,
            left: 0,
            opacity: 0.8,
            zIndex: 3
        }, //1
        {
            width: 800,
            top: 100,
            left: 200,
            opacity: 1,
            zIndex: 4
        }, //2
        {
            width: 600,
            top: 70,
            left: 600,
            opacity: 0.8,
            zIndex: 3
        }, //3
        {
            width: 400,
            top: 20,
            left: 750,
            opacity: 0.2,
            zIndex: 2
        } //4

    ];
    fs = () => {
        for (let i = 0; i < li.length; i++) {
            fn(li[i], arr[i], () => {
                bol = true;
            });
        }
    }
    fs();

    // 左
    prev.onclick = () => {
        if (bol) {
            bol = false;
            arr.unshift(arr.pop());
            fs();
        }
    }

    // 右
    next.onclick = () => {
        if (bol) {
            bol = false;
            arr.push(arr.shift());
            fs();
        }
    }

    slide.onmouseover = () => {
        fn(arrow, {
            "opacity": 1
        })
    }
    slide.onmouseout = () => {
        fn(arrow, {
            "opacity": 0
        })
    }
}