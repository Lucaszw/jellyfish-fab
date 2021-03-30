import { el, mount } from "redom";
import _ from "lodash";
import { loremIpsum } from "lorem-ipsum";

import iconNames from "./icon-names";
import Grid from "./grid";
import inView from "../utils/inview";

import {enableScroll, disableScroll} from "../utils/disableScroll";

const URL_PREFIX = "https://firebasestorage.googleapis.com/v0/b/jellyfish-fab.appspot.com/o/";

class Gallery extends Grid {
    constructor(parent) {
        super();
        this.parent = parent;
        this.projects = [];
        this.projectDetails = [
            {name: "GlowHome", icon: "/assets/01_GlowHome.svg", url: URL_PREFIX + "01_GlowHome.pdf?alt=media"},
            {name: "SuperTempo", icon: "/assets/02_SuperTempo.svg", url: URL_PREFIX + "02_SuperTempo.pdf?alt=media"},
            {name: "Spot", icon: "/assets/03_Spot.svg", url: URL_PREFIX + "03_Presentation_Spot.pdf?alt=media"}
        ];

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
        this.generateProjects();
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
    generateProjects() {
        for (let project of this.projects) project.remove();
        this.projects = [];

        for (let i=0;i<this.projectDetails.length;i++) {
            const title = this.projectDetails[i].name;

            const project = el(".project", {innerHTML: `
                <h1>${title}</h1>
                <div class="project-icon" style="background-image: url(${this.projectDetails[i].icon})"></div>
                <i class="close-icon fas fa-times"></i>
            `});
            mount(this.container, project);
            this.projects.push(project);

            project.onclick = this.onEnterFullScreen.bind(this, project, this.projectDetails[i]);
        }
    }
}

export default Gallery;