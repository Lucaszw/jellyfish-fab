import { el, mount } from "redom";

import memberHTML from "../../html/team/member.html";
import memberData from "./member-data";

import {enableScroll, disableScroll} from "../utils/disableScroll";

// import isMultiline from "../utils/multiline";

class Member {
  constructor(parent, memberName) {
    this.parent = parent;
    this.memberName = memberName;
    this.mouseDown = false;
    this.defaultX = 0.875;
    this.memberData = memberData[memberName];

    document.addEventListener("mousemove", this.mouseMoved.bind(this));
    document.addEventListener("touchmove", this.mouseMoved.bind(this));

    window.addEventListener("resize", this.renderBackground.bind(this, null));
  }
  setupData() {
    this.container
      .querySelector(".member-background-color")
      .classList.add(`${this.memberName}-background`);
    this.container
      .querySelector(".member-background-bw")
      .classList.add(`${this.memberName}-background`);
    this.container.querySelector(
      ".member-text h1"
    ).innerHTML = this.memberData.fullname;
    this.container.querySelector(
      ".member-text p"
    ).innerHTML = this.memberData.description;
    for (let i = 0; i < this.memberData.skills.length; i++) {
      const skill = this.memberData.skills[i];
      this.container
        .querySelector(`.skill-${i} i`)
        .classList.add(`fa-${skill.icon}`);
      this.container.querySelector(`.skill-${i} span`).innerHTML = skill.text;
    }
  }
  draw() {
    this.container = el(`#${this.memberName}.member`, {
      innerHTML: memberHTML,
    });
    mount(this.parent, this.container);
    this.setupData();
    this.slider = this.container.querySelector(".slider");
    this.sliderCircle = this.container.querySelector(".slider-circle");
    this.colorBackground = this.container.querySelector(
      ".member-background-color"
    );
    this.bwBackground = this.container.querySelector(".member-background-bw");
    this.memberText = this.container.querySelector(".member-text");

    this.sliderCircle.addEventListener("mousedown", () => {
      this.mouseDown = true;
      disableScroll();
    });
    this.sliderCircle.addEventListener("touchstart", () => {
      this.mouseDown = true;
      disableScroll();

    });

    document.body.addEventListener("mouseup", () => {
      this.mouseDown = false;
      enableScroll();
    });
    this.sliderCircle.addEventListener("touchend", () => {
      this.mouseDown = false;
      enableScroll();
    });
    this.sliderCircle.addEventListener("touchcancel", () => {
      this.mouseDown = false;
      enableScroll();
    });

    this.renderBackground();
  }

  mouseMoved(e) {
    let x = e.x || _.get(e, "touches[0].pageX");
    if (!this.mouseDown) return;
    this.renderBackground(x);
  }

  renderBackground(x) {
    if (!this.slider) return;
    if (!x) {
      let { width } = document.body.getBoundingClientRect();
      x = width * this.defaultX;
    }
    this.slider.style.left = `${x}px`;
    this.sliderCircle.style.left = `${x - 20}px`;
    this.colorBackground.style.width =
      this.bwBackground.getBoundingClientRect().width + "px";
    this.colorBackground.parentElement.style.width = `${x}px`;

    let off = this.memberText.getBoundingClientRect();
    if (x > off.x) this.memberText.parentElement.style.width = `${x - off.x}px`;
    if (x <= off.x)
      this.memberText.parentElement.style.width = `${x - off.x}px`;
  }
}

export default Member;
