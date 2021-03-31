import { el, mount } from "redom";
import visionHTML from "../html/vision.html";
import "appear/dist/appear";
import anime from "animejs";

class Vision {
  constructor(parent, navbar) {
    this.contianer = null;
    this.parent = parent;
    this.navbar = navbar;
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

    const offerings = this.container.querySelectorAll(".offering");
    for (let offering of offerings) {
      let page = "services"
      if (offering.classList.contains("page-workshops")) page = "workshops";

      offering.onclick = () => {
        setTimeout(()=>(this.navbar.onChangePage({dataset: {page}})), 300);
      }
    }
  }
}

export default Vision;
