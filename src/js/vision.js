import { el, mount } from "redom";
import visionHTML from "../html/vision.html";
import "appear/dist/appear";
import anime from "animejs";

class Vision {
  constructor(parent) {
    this.contianer = null;
    this.parent = parent;
  }

  draw() {
    this.container = el(".vision-container", { innerHTML: visionHTML });
    mount(this.parent, this.container);

    let h1 = this.container.querySelector("h1");
    let h2 = this.container.querySelector("h2");
    // h1.style.transform = "scale(0.9)";
    // h2.style.transform = "scale(0.9)";

    // Wrap every letter in a span
    for (let wrapper of this.container.querySelectorAll(".ml14 .letters")) {
      wrapper.innerHTML = wrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
    }
  }
}

export default Vision;
