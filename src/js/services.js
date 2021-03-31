import { el, mount, setStyle } from "redom";
import Arrow from "./arrow";
import _ from "lodash";
import serviceHTML from "../html/services/header.html";


class Services {
    constructor(navbar) {
        this.navbar = navbar;
    }

    draw() {
        this.remove();
        this.container = el(".services", {innerHTML: serviceHTML});
        mount(document.body, this.container);

        this.arrow = new Arrow();
        this.arrow.draw();
        
    }

    remove() {
        if (!this.container) return;

        this.container.remove();
        this.container = null;
        if (this.arrow) this.arrow.remove();
    }
}

export default Services;