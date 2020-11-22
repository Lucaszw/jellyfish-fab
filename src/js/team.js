import { el, mount } from "redom";

import Video from "./team/video";
import Member from "./team/member";
import isOverlapping from "./utils/overlap";
import _ from "lodash";

class Team {
  constructor(navbar) {
    this.navbar = navbar;
    this.video = null;
    document.addEventListener(
      "scroll",
      _.debounce(this.updateNav.bind(this), 20, {
        leading: true,
        trailing: true,
      })
    );
  }
  draw() {
    this.remove();
    this.container = el(".team");
    mount(document.body, this.container);

    this.video = new Video(this.container);
    this.video.draw();

    for (let name of _.shuffle(["cristina", "lucas", "yue"])) {
      this[name] = new Member(this.container, name);
      this[name].draw();
    }
    // this.updateNav();
  }
  remove() {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
  updateNav() {
    if (!this.container) return;
    let overlapping = isOverlapping(this.navbar.container, this.video.container);
    if (overlapping)
      this.navbar.container.classList.remove("opaque");
    if (!overlapping)
        this.navbar.container.classList.add("opaque");
  }
}
export default Team;
