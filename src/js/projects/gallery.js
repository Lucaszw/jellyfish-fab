import { el, mount } from "redom";
import _ from "lodash";

import Grid from "./grid";

class Gallery extends Grid {
    constructor(parent) {
        super();
        this.parent = parent;
    }

    draw() {

        this.container = el(".gallery", {
            style: `height: ${window.innerHeight}px; width: 100%;`,
        });
  
        mount(this.parent, this.container);
        this.drawGrid(this.container);
    }
}

export default Gallery;