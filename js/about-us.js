window.onload = function () {
  const bars = document.querySelector(".bars");

  bars.addEventListener("click", function (e) {
    bars.classList.toggle("active");
    if (bars.classList.contains("active")) {
      gsap.to(".menu", {
        duration: 0.2,
        display: "flex",
        ease: "power1.inOut",
      });
      gsap.to([".navBefore", ".nav"], {
        duration: 0.6,
        stagger: 0.15,
        delay: 0.2,
        top: "0",
        ease: "power1.inOut",
      });
      gsap.to([".navigation", ".facts", ".copyright", ".social"], {
        duration: 0.8,
        opacity: "1",
        delay: 0.6,
        ease: "power1.inOut",
      });
    } else {
      gsap.to([".navigation", ".facts", ".copyright", ".social"], {
        duration: 0.2,
        opacity: "0",
        ease: "power1.inOut",
      });
      gsap.to([".nav", ".navBefore"], {
        duration: 0.55,
        stagger: 0.15,
        top: "-100vh",
        delay: 0.2,
        ease: "power1.inOut",
      });
      gsap.to(".menu", {
        duration: 0.75,
        display: "none",
        delay: 0.55,
        ease: "power1.inOut",
      });
    }
  });
};

//Mjolnir animation
var container = document.getElementById("who-container");
var inner = document.getElementById("who-image");

var counter = 0;
var updateRate = 10;
var isTimeToUpdate = function () {
  return counter++ % updateRate === 0;
};

var onMouseEnterHandler = function (event) {
  update(event);
};
var onMouseLeaveHandler = function () {
  inner.style = "";
};
var onMouseMoveHandler = function (event) {
  if (isTimeToUpdate()) {
    update(event);
  }
};

// Mouse
var mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  updatePosition: function (event) {
    var e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
  },
  setOrigin: function (e) {
    this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
    this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
  },
  show: function () {
    return "(" + this.x + ", " + this.y + ")";
  },
};
// Track the mouse position relative to the center of the container.
mouse.setOrigin(container);

var update = function (event) {
  mouse.updatePosition(event);
  updateTransformStyle(mouse.y.toFixed(2) / 20, mouse.x.toFixed(2) / 20);
};

var updateTransformStyle = function (x, y) {
  var style = "translateX(" + (x - 50) + "%) translateY(" + (y / 2 - 50) + "%)";
  inner.style.transform = style;
  inner.style.webkitTransform = style;
  inner.style.mozTransform = style;
  inner.style.msTransform = style;
  inner.style.oTransform = style;
};

container.onmouseenter = onMouseEnterHandler;
container.onmouseleave = onMouseLeaveHandler;
container.onmousemove = onMouseMoveHandler;
