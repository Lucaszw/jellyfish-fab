import "particles.js";
import anime from "animejs";
import headerHTML from '../html/header.html';
import { el, mount } from "redom";

class Header {
    constructor(parentContainer) {
        this.container = null;
        this.particleColors = ["#fb000f","#fc3242", "#fc4708", "#ffffff", "#fec409", "#ffff0b"];
    }
    draw() {
        if (this.container) this.container.remove();
        this.container = el(".header", {innerHTML: '<div id="particles-js"></div>'});
        let {height} = document.body.getBoundingClientRect();
        this.container.style.height = `${height}px`;
        let headerContent = el(".header-content", {innerHTML: headerHTML});
        console.log({height});
        mount(document.body, this.container);
        mount(document.body, headerContent);

        anime.timeline({loop: false})
        .add({
          targets: [
            headerContent.querySelector("h1"),
            headerContent.querySelector("h2"),
            headerContent.querySelector(".big-button")
          ],
          scale: [0, 1],
          duration: 1500,
          elasticity: 600,
          delay: (el, i) => 45 * (i+1)
        });

        particlesJS("particles-js", {
            particles: {
              number: { value: 300, density: { enable: true, value_area: 400 } },
              color: { value: this.particleColors },
              shape: {
                type: "edge",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 }
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
              },
              size: {
                value: 8,
                random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
              },
              line_linked: {
                enable: true,
                distance: 70,
                color: "#fc3242",
                opacity: 0.3,
                width: 1,
              },
              move: {
                enable: true,
                speed: 2,
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
                onhover: { enable: true, mode: "bubble" },
                onclick: { enable: false, mode: "repulse" },
                resize: true,
              },
              modes: {
                grab: { distance: 400, line_linked: { opacity: 0.5 } },
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