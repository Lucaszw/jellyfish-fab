import "particles.js";
import anime from "animejs";
import headerHTML from "../html/header.html";
import { el, mount } from "redom";

class Header {
  constructor(parent) {
    this.container = null;
    this.headerContent = null;
    this.parent = parent;
    this.particleColors = [
      "#bc7df1",
      "#8332fc",
      "#08fcea",
      "#ffffff",
      "#4683ea",
      "#b9f7ff",
      "#fc52a5"
    ];
  }

  draw() {
    if (this.container) this.container.remove();

    this.container = el(".header", {
      innerHTML: '<div id="particles-js"></div>',
    });
    let height = window.innerHeight;

    this.container.style.height = `${height}px`;

    mount(this.parent, this.container);

    this.drawParticles();
    // this.drawBubbly();
  }

  drawTextAnimation() {
    if (this.headerContent) this.headerContent.remove();

    this.headerContent = el(".header-content", { innerHTML: headerHTML });
    mount(this.parent, this.headerContent);

    // Wrap every letter in a span
    var textWrapper = this.headerContent.querySelector(".ml11 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: false })
      .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml11 .line",
        translateX: [
          0,
          document.querySelector(".ml11 .letters").getBoundingClientRect()
            .width + 20,
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add(
        {
          targets: ".ml11 .letter",
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 600,
          offset: "-=775",
          delay: (el, i) => 34 * (i + 1),
        },
        700
      )
      .add({
        targets: ".line",
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 200,
      });
  }

  drawParticles() {
    particlesJS("particles-js", {
      particles: {
        number: { value: 15, density: { enable: false, value_area: 100 } },
        color: { value: this.particleColors },
        // shape: {
        //   type: "edge",
        //   stroke: { width: 0, color: "#000000" },
        //   polygon: { nb_sides: 100 },
        // },
        opacity: {
          value: 1,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 15,
          random: true,
          anim: { enable: false, speed: 20, size_min: 0.1, sync: true },
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 1,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "bubble" },
          onclick: { enable: false, mode: "repulse" },
          resize: true,
        },
        modes: {
          grab: { distance: 100, line_linked: { opacity: 0.5 } },
          bubble: {
            distance: 400,
            size: 4,
            duration: 0.3,
            opacity: 1,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  }

}

export default Header;
