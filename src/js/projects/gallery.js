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
    expandProject(project) {
        disableScroll();
        this.onEnterFullScreen();
        let bbox = project.getBoundingClientRect();
        let expandedNode = project.cloneNode(true);
        expandedNode.querySelector(".close-icon").onclick = this.collapseProject.bind(this, project);
        expandedNode.classList.add("expanded");
        expandedNode.style.position = "absolute";
        expandedNode.style.top = `${bbox.top}px`;
        expandedNode.style.left = `${bbox.left}px`;
        expandedNode.style.zIndex = 2;
        mount(this.container, expandedNode);
        setTimeout(()=>{
            expandedNode.style.left = "0px";
            expandedNode.style.top = "0px";
            expandedNode.style.height = "100%";
            expandedNode.style.width = "100%";
        }, 500);

        project.expandedNode = expandedNode;
    }
    collapseProject(project) {
        let expandedNode = project.expandedNode;
        let bbox = project.getBoundingClientRect();
        expandedNode.style.left = `${bbox.left}px`;
        expandedNode.style.top = `${bbox.top}px`;
        expandedNode.style.height = `${bbox.height}px`;
        expandedNode.style.width = `${bbox.width}px`;
        setTimeout(()=>{
            enableScroll();
            this.onExitFullScreen();
            expandedNode.classList.remove("expanded");
            expandedNode.remove();
            project.expandedNode = null;
        }, 1500);
    }
    randomlyGenerateProjects() {
        for (let project of this.projects) project.remove();
        this.projects = [];

        for (let i=0;i<30;i++) {
            const title1 = loremIpsum({count: 2, units: "words"});
            const title2 = loremIpsum({count: 2, units: "words"});

            const project = el(".project", {innerHTML: `
                <i class="fa fa-${_.sample(iconNames)}"></i>
                <h1>${title1}<br/>${title2}</h1>
                <i class="close-icon fas fa-times"></i>
            `});
            mount(this.container, project);
            this.projects.push(project);
            project.onclick =  this.expandProject.bind(this, project);
        }
    }
}

export default Gallery;