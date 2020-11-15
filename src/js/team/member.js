import { el, mount } from "redom";

import memberHTML from "../../html/team/member.html";
import memberData from "./member-data";
// import isMultiline from "../utils/multiline";

class Member {
    constructor(parent, memberName) {
        this.parent = parent;
        this.memberName = memberName;
        this.mouseDown = false;
        this.defaultX = 0.875;
        this.memberData = memberData[memberName];

        document.addEventListener("mousemove", this.mouseMoved.bind(this));
        window.addEventListener("resize", this.renderBackground.bind(this, null));
    }
    setupData() {
        this.container.querySelector(".member-background-color").classList.add(`${this.memberName}-background`);
        this.container.querySelector(".member-background-bw").classList.add(`${this.memberName}-background`);
        this.container.querySelector(".member-text h1").innerHTML = this.memberData.fullname;
        this.container.querySelector(".member-text p").innerHTML = this.memberData.description;
        for (let i=0;i<this.memberData.skills.length;i++) {
            const skill = this.memberData.skills[i];
            this.container.querySelector(`.skill-${i} i`).classList.add(`fa-${skill.icon}`);
            this.container.querySelector(`.skill-${i} span`).innerHTML = skill.text;
        }
    }
    draw() {
        this.container = el(`#${this.memberName}.member`, {innerHTML: memberHTML});
        mount(this.parent, this.container);
        this.setupData();
        this.slider = this.container.querySelector(".slider");
        this.sliderCircle = this.container.querySelector(".slider-circle");
        this.colorBackground = this.container.querySelector(".member-background-color");
        this.bwBackground = this.container.querySelector(".member-background-bw");
        this.memberText = this.container.querySelector(".member-text");

        this.sliderCircle.addEventListener("mousedown", () => {
            this.mouseDown = true;
        });
        document.body.addEventListener("mouseup", () => {
            this.mouseDown = false;
        });

        this.renderBackground();
    }

    mouseMoved(e) {
        if (!this.mouseDown) return;
        this.renderBackground(e.x);
    }

    renderBackground(x) {
        if (!this.slider) return;
        if (!x) {
            let {width} = document.body.getBoundingClientRect();
            x = width*this.defaultX;
        }
        this.slider.style.left = `${x}px`;
        this.sliderCircle.style.left = `${x-20}px`;
        this.colorBackground.style.width = `${x}px`;
        this.bwBackground.style.left = `${x}px`;

        let off = this.memberText.getBoundingClientRect();
        // this.memberText.style.background = `linear-gradient(to right, white ${x-off.x}px, rgba(0,0,0,0) ${x-off.x}px)`;
        if (x > off.x)
            this.memberText.parentElement.style.width = `${x-off.x}px`;
        if (x <= off.x)
            this.memberText.parentElement.style.width = `${x-off.x}px`;
    }
}

export default Member;