import { el, mount } from "redom";
import _ from "lodash";

import randInt from "random-int";
import isOverlapping from "./utils/overlap";
import Header from "./projects/header";
import Gallery from "./projects/gallery";
import Arrow from "./arrow";

class Projects {
  constructor(navbar) {
    this.navbar = navbar;
    document.addEventListener(
      "scroll",
      _.debounce(this.onScroll.bind(this), 20, {
        leading: true,
        trailing: true,
      })
    );
  }

  draw() {
    this.remove();
    this.container = el(".projects");
    mount(document.body, this.container);
    
    this.header = new Header(this.container);
    this.header.draw();

    this.gallery = new Gallery(this.container);
    this.gallery.draw();

    this.gallery.onEnterFullScreen = () => {
      this.navbar.container.classList.add("hidden");
    }

    this.gallery.onExitFullScreen = () => {
      this.navbar.container.classList.remove("hidden");
    }

    this.arrow = new Arrow();
    this.arrow.draw();
  }


  remove() {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    if (this.arrow) this.arrow.remove();
  }
  onScroll() {
    if (!this.container) return;
    let overlapping = isOverlapping(this.navbar.container, this.gallery.container);
    if (!overlapping) this.navbar.container.classList.remove("opaque");
    if (overlapping) this.navbar.container.classList.add("opaque");
  }
}
export default Projects;
