import contactHTML from "../html/contact.html";
import { el, mount } from "redom";

class Contact {
    constructor (parent)  {
        this.parent = parent;
    }
    draw() {
        this.container = el(".contact-container", {innerHTML: contactHTML});
        mount(this.parent, this.container);
    }
}

export default Contact;