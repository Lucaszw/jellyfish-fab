import { el, mount } from "redom";
import _ from "lodash";
import { loremIpsum } from "lorem-ipsum";

import iconNames from "./icon-names";
import Grid from "./grid";
import inView from "../utils/inview";

class Gallery extends Grid {
    constructor(parent) {
        super();
        this.parent = parent;
        this.projects = [];
        document.addEventListener(
            "scroll",
            _.debounce(this.onScroll.bind(this), 20, {
              leading: true,
              trailing: true,
            })
          );
    }

    draw() {
        this.container = el(".gallery", {
            style: `height: ${window.innerHeight}px; width: 100%;`,
        });
        mount(this.parent, this.container);        
        this.randomlyGenerateProjects();
        // this.drawGrid(this.container);
    }
    onScroll() {
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
                <i class="fa fa-${_.sample(iconNames)}"></i>
                <h1>${title1}<br/>${title2}</h1>
            `});
            mount(this.container, project);
            this.projects.push(project);
        }
    }
}

export default Gallery;