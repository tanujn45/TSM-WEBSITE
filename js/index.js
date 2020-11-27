window.onload = function () {
  const play_video = document.querySelector("#play-video");
  const video_overlay = document.querySelector("#video-overlay");
  const video_close = document.querySelector(".video-overlay-close");

  const bars = document.querySelector(".bars");
  const menu = document.querySelector(".menu");

  document.querySelectorAll(".form-control").forEach((item) => {
    if (item.value.length > 0) {
      item.classList.add("has-value");
    } else {
      item.classList.remove("has-value");
    }
  });

  new Glide("#glide2", {
    type: "carousel",
    startAt: 0,
    autoplay: 1500,
    hoverpause: true,
    perView: 3,
    breakpoints: {
      900: {
        perView: 1,
      },
      500: {
        perView: 1,
      },
    },
  }).mount();

  //Video Component
  play_video.addEventListener("click", function (e) {
    e.preventDefault();
    video_overlay.classList.add("open");
  });

  video_close.addEventListener("click", function (e) {
    e.preventDefault();
    close_video();
  });

  document.addEventListener("keyup", function (e) {
    if (e.code === "Escape") {
      close_video();
    }
  });

  function close_video() {
    video_overlay.classList.remove("open");
  }

  //Animations
  gsap.to(".first", {
    duration: 2,
    delay: 6,
    // display: 'none',
    top: "-100vh",
    ease: "expo.out",
  });
  gsap.to("#main-content", {
    duration: 2,
    opacity: "1",
    delay: 6,
    ease: "power1.inOut",
  });

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

const animationDuration = 3000;
const frameDuration = 1000 / 60;
const totalFrames = Math.round(animationDuration / frameDuration);
const easeOutQuad = (t) => t * (2 - t);

const animateCountUp = (el) => {
  let frame = 0;
  const countTo = parseInt(el.innerHTML, 10);
  const counter = setInterval(() => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    const currentCount = Math.round(countTo * progress);

    if (parseInt(el.innerHTML, 10) !== currentCount) {
      el.innerHTML = currentCount;
    }

    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
};

const runAnimations = () => {
  const countupEls = document.querySelectorAll(".countup");
  countupEls.forEach(animateCountUp);
};

const counter_section = document.querySelector(".counter-section");
let positionFromTop;
let run_animation = true;
window.addEventListener("scroll", function () {
  positionFromTop = counter_section.getBoundingClientRect().top;
  if (positionFromTop - window.innerHeight <= 0 && run_animation) {
    runAnimations();
    run_animation = false;
  }
});

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
