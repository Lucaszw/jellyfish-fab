import { el, mount, setStyle } from "redom";
import Arrow from "./arrow";

import Jellyfish from "./services/jellyfish";

import _ from "lodash";


class Services {
    constructor(navbar) {
        this.navbar = navbar;
    }

    draw() {
        this.remove();
        this.container = el(".services");
        this.jellyfish = new Jellyfish(this.container);
        mount(document.body, this.container);
        this.jellyfish.draw();
    }

    remove() {
        if (!this.container) return;

        this.container.remove();
        this.container = null;
        if (this.arrow) this.arrow.remove();
    }
}

export default Services;