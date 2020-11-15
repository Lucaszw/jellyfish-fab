import { el, mount } from "redom";

import cristinaHTML from "../../html/team/cristina.html";

class Member {
    constructor(parent, memberName) {
        this.parent = parent;
        this.memberName = memberName;
        this.mouseDown = false;
        this.defaultX = 0.875;
        if (memberName == "cristina") this.html = cristinaHTML;

        document.addEventListener("mousemove", this.mouseMoved.bind(this));
        window.addEventListener("resize", this.renderBackground.bind(this, null));
    }
    draw() {
        this.container = el(`#${this.memberName}.member`, {innerHTML: this.html});
        mount(this.parent, this.container);
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