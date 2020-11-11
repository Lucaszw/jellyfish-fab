import { el, mount } from "redom";
import visionHTML from "../html/vision.html";
import "appear/dist/appear";
import anime from "animejs";

class Vision {
    constructor() {
        this.contianer = null;
    }

    draw() {
        this.container = el(".vision-container", {innerHTML: visionHTML});
        mount(document.body, this.container);

        let h1 = this.container.querySelector("h1");
        let h2 = this.container.querySelector("h2");
        // h1.style.transform = "scale(0.9)";
        // h2.style.transform = "scale(0.9)";

        appear({elements: () => [h1], appear: () => {
            anime.timeline({loop: false})
            .add({
              targets: [h1,h2],
              scale: [0, 1],
              duration: 2500,
              elasticity: 1000,
              delay: (el, i) => 15 * (i+1)
            });
        }})
    }
}

export default Vision;