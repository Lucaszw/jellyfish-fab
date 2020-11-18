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
      _.debounce(this.onScroll.bind(this), 20, {
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

    this.cristina = new Member(this.container, "cristina");
    this.cristina.draw();

    this.lucas = new Member(this.container, "lucas");
    this.lucas.draw();

    this.yue = new Member(this.container, "yue");
    this.yue.draw();
  }
  remove() {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  }
  onScroll() {
    if (!this.container) return;
    let overlapping = isOverlapping(this.navbar.container, this.video.container);
    if (overlapping)
      this.navbar.container.style.backgroundColor = "rgba(0,0,0,0)";
    if (!overlapping)
        this.navbar.container.style.backgroundColor = "#2d2d2d";
  }
}
export default Team;
