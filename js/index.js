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
  // play_video.addEventListener("click", function (e) {
  //   e.preventDefault();
  //   video_overlay.classList.add("open");
  // });

  // video_close.addEventListener("click", function (e) {
  //   e.preventDefault();
  //   close_video();
  // });

  // document.addEventListener("keyup", function (e) {
  //   if (e.code === "Escape") {
  //     close_video();
  //   }
  // });

  // function close_video() {
  //   video_overlay.classList.remove("open");
  // }

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

  //Exit popup

  const lightbox = document.querySelector(".lightbox");
  const close = document.querySelector(".close");

  close.addEventListener("click", () => {
    lightbox.style.opacity = 0;
    lightbox.style.pointerEvents = "none";
  });
  let count = 0;
  document.addEventListener("mouseout", (event) => {
    if (event.toElement == null && event.relatedTarget == null && count < 1) {
      lightbox.style.opacity = 1;
      lightbox.style.pointerEvents = "all";
      count++;
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
