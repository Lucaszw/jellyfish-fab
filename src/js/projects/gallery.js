import { el, mount } from "redom";
import _ from "lodash";
import { loremIpsum } from "lorem-ipsum";

import iconNames from "./icon-names";
import Grid from "./grid";
import inView from "../utils/inview";

import {enableScroll, disableScroll} from "../utils/disableScroll";

class Gallery extends Grid {
    constructor(parent) {
        super();
        this.parent = parent;
        this.projects = [];

        let hFcn = _.debounce(this.highlight.bind(this), 20, {leading: true, trailing: true});
        document.addEventListener("scroll",hFcn);
        window.addEventListener("resize", hFcn);

        this.onEnterFullScreen = _.noop;
        this.onExitFullScreen = _.noop;
    }

    draw() {
        this.container = el(".gallery", {
            style: `width: 100%;`,
        });
        mount(this.parent, this.container);        
        this.randomlyGenerateProjects();
    }
    highlight() {
        for (let project of this.projects) project.classList.remove("glow");

        for (let project of this.projects) {
            if (inView(project)) {
                project.classList.add("glow");
                return;
            }
        }
    }
    randomlyGenerateProjects() {
        for (let project of this.projects) project.remove();
        this.projects = [];

        for (let i=0;i<30;i++) {
            const title1 = loremIpsum({count: 2, units: "words"});
            const title2 = loremIpsum({count: 2, units: "words"});

            const project = el(".project", {innerHTML: `
                <br/>
                <h1>${title1}<br/>${title2}</h1>
                <i class="fa fa-${_.sample(iconNames)}"></i>
                <i class="close-icon fas fa-times"></i>
            `});
            mount(this.container, project);
            this.projects.push(project);

            project.onclick = this.onEnterFullScreen.bind(this, project);
        }
    }
}

export default Gallery;