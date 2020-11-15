import { el, mount } from "redom";

import videoHtml from '../../html/team/video.html';
import randInt from 'random-int';

const focusPoints = [
    {width: "200%", right: ""},
    {width: "100%", right: ""},
    {width: "200%", right: "100%"}
];

const minWidth = 781;

class Video {
    constructor(parent) {
        this.parent = parent;
        window.addEventListener("resize", _.debounce(this.changeFocus.bind(this),500,{leading: false, trailing: true}));
    }
    draw () {
        let { height } = document.body.getBoundingClientRect();

        this.container = el(".video", {innerHTML: videoHtml});
        this.container.style.height = `${window.innerHeight}px`;

        mount(this.parent, this.container);

        this.changeFocus();
    }

    changeFocus() {
        if (!this.container) return;
        const {width} = document.body.getBoundingClientRect();
        const video = this.container.querySelector("video");
        let focus;
        if (width <= minWidth) {
            focus = focusPoints[randInt(0,2)];
        } else {
            focus = focusPoints[1];
        }

        video.setAttribute("width", focus.width);
        video.style.right = focus.right;
    }
}

export default Video;