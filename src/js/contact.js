import {database} from "./load-firebase.js";

import contactHTML from "../html/contact.html";
import { el, mount } from "redom";

class Contact {
    constructor (parent)  {
        this.parent = parent;
    }
    draw() {
        this.container = el(".contact-container", {innerHTML: contactHTML});
        mount(this.parent, this.container);

        this.container.querySelector(".big-button").onclick = () => {
            const emailField = this.container.querySelector("#email");
            const messageField = this.container.querySelector("#message");

            const email = emailField.value;
            const message = messageField.value;

            let ref = email + ' ' + (new Date()).toTimeString();
            ref = ref.replace(/[|&;$%@".<>()+,]/g, "");

            emailField.value = "";
            messageField.value = "";

            if (!email || !message) {
                alert("Must provide an email and a message");
                return;
            }

            database.ref(ref).set({
                email, message
            });

            alert("Thank you for your message! We will get back shortly");
        };
    }
}

export default Contact;