import { el, mount } from "redom";
import visionHTML from "../html/vision.html";
import "appear/dist/appear";
import anime from "animejs";

class Vision {
  constructor() {
    this.contianer = null;
  }

  draw() {
    this.container = el(".vision-container", { innerHTML: visionHTML });
    mount(document.body, this.container);

    let h1 = this.container.querySelector("h1");
    let h2 = this.container.querySelector("h2");
    // h1.style.transform = "scale(0.9)";
    // h2.style.transform = "scale(0.9)";

    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml14 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
    );
    
    appear({
      elements: () => [h1],
      appear: () => {
        anime
          .timeline({ loop: false })
          .add({
            targets: ".ml14 .line",
            scaleX: [0, 1],
            opacity: [0.5, 1],
            easing: "easeInOutExpo",
            duration: 900,
          })
          .add({
            targets: ".ml14 .letter",
            opacity: [0, 1],
            translateX: [40, 0],
            translateZ: 0,
            scaleX: [0.3, 1],
            easing: "easeOutExpo",
            duration: 800,
            offset: "-=600",
            delay: (el, i) => 25 * i,
          }, 100);
      },
    });
  }
}

export default Vision;
