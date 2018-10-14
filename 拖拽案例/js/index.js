window.onload = () => {
  let dj = document.querySelector(".top");
  let bg = document.querySelector(".bg");
  let dl = document.querySelector(".dl");
  let gb = document.querySelector(".gb");
  let h = document.querySelector("h3");

  dj.onclick = e => {
    bg.style.display = "block";
    dl.style.display = "block";
    // window.event.cancelBubble = true;
    e.stopPropagation();
  };

//   document.onclick = () => {
//     bg.style.display = "none";
//     dl.style.display = "none";
//   };

  gb.onclick = () => {
    bg.style.display = "none";
    dl.style.display = "none";
  };

  h.onmousedown = e => {
    //  获取此时可视区域的横坐标
    let spaceX = e.clientX - dl.offsetLeft;
    let spaceY = e.clientY - dl.offsetTop;
    // 移动事件
    document.onmousemove = e => {
      let x = e.clientX - spaceX;
      let y = e.clientY - spaceY;
      dl.style.left = x + "px";
      dl.style.top = y + "px";
    };
  };
  
  document.onmouseup = () => {
    document.onmousemove = null;
  }
};
