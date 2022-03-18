/**
 * 鼠标点击动效
 */

const clickstyle = () => {
  // 点击冒泡效果
  window.onclick = function (event) {
    let heart: any = document.createElement("b");

    heart.onselectstart = new Function("event.returnValue=false");

    document.body.appendChild(heart).innerHTML = "🐯";

    heart.style.cssText = "position: fixed;left:-100%;";

    let f = 16, // 字体大小
      x = event.clientX - f / 2, // 横坐标
      y = event.clientY - f, // 纵坐标
      c = randomColor(), // 随机颜色
      a = 0.8, // 透明度
      s = 1.5; // 放大缩小

    let timer = setInterval(function () {
      if (a <= 0) {
        document.body.removeChild(heart);

        clearInterval(timer);
      } else {
        heart.style.cssText =
          "font-size:16px;cursor: default;position: fixed;color:" +
          c +
          ";left:" +
          x +
          "px;top:" +
          y +
          "px;opacity:" +
          a +
          ";transform:scale(" +
          s +
          ");";

        y--;
        a -= 0.016;
        s += 0.002;
      }
    }, 12);
  };
  // 冒泡效果随机颜色
  function randomColor() {
    return (
      "rgb(" +
      ~~(Math.random() * 255) +
      "," +
      ~~(Math.random() * 255) +
      "," +
      ~~(Math.random() * 255) +
      ")"
    );
  }
  // 炫彩形状背景
  function attr(node, attr, default_value) {
    return Number(node.getAttribute(attr)) || default_value;
  }

  // get user config
  var scripts = document.getElementsByTagName("script"),
    script = scripts[scripts.length - 1]; // 当前加载的script
  var config = {
    z: attr(script, "zIndex", -1), // z-index
    a: attr(script, "alpha", 0.5), // alpha
    s: attr(script, "size", 200), // size
  };

  var canvas = document.createElement("canvas"),
    g2d = canvas.getContext("2d"),
    pr = window.devicePixelRatio || 1,
    width = window.innerWidth,
    height = window.innerHeight,
    f = config.s,
    q,
    t,
    m = Math,
    r = 0,
    pi = m.PI * 2,
    cos = m.cos,
    random = m.random;
  canvas.width = width * pr;
  canvas.height = height * pr;
  g2d.scale(pr, pr);
  g2d.globalAlpha = config.a;
  canvas.style.cssText =
    "opacity: " +
    config.a +
    ";position:fixed;top:0;left:0;z-index: " +
    config.z +
    ";width:100%;height:100%;pointer-events:none;";
  // create canvas
  document.getElementsByTagName("body")[0].appendChild(canvas);

  function redraw() {
    g2d.clearRect(0, 0, width, height);
    q = [
      {
        x: 0,
        y: height * 0.7 + f,
      },
      {
        x: 0,
        y: height * 0.7 - f,
      },
    ];
    while (q[1].x < width + f) draw(q[0], q[1]);
  }

  function draw(i, j) {
    g2d.beginPath();
    g2d.moveTo(i.x, i.y);
    g2d.lineTo(j.x, j.y);
    var k = j.x + (random() * 2 - 0.25) * f,
      n = line(j.y);
    g2d.lineTo(k, n);
    g2d.closePath();
    r -= pi / -50;
    g2d.fillStyle =
      "#" +
      (
        ((cos(r) * 127 + 128) << 16) |
        ((cos(r + pi / 3) * 127 + 128) << 8) |
        (cos(r + (pi / 3) * 2) * 127 + 128)
      ).toString(16);
    g2d.fill();
    q[0] = q[1];
    q[1] = {
      x: k,
      y: n,
    };
  }

  function line(p) {
    t = p + (random() * 2 - 1.1) * f;
    return t > height || t < 0 ? line(p) : t;
  }

  document.onclick = redraw;
  document.ontouchstart = redraw;
  redraw();
};

export default clickstyle;
