import contactHTML from "../html/contact.html";
import { el, mount } from "redom";

class Contact {
    constructor (parentContainer)  {

    }
    draw() {
        this.container = el(".contact-container", {innerHTML: contactHTML});
        mount(document.body, this.container);
    }
}

export default Contact;