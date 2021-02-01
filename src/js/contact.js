import {database, analytics} from "./load-firebase.js";

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

            let d = new Date();
            let time = d.toTimeString();
            let day = d.toDateString();

            let ref = day + '/' + email + ' ' + time;
            ref = ref.replace(/[|&;$%@".<>()+,]/g, "");

            emailField.value = "";
            messageField.value = "";

            if (!email || !message) {
                alert("Must provide an email and a message");
                return;
            }

            analytics.logEvent("sent_message", {email, message});
            database.ref(ref).set({
                email, message
            });

            alert("Thank you for your message! We will get back shortly");
        };
    }
}

export default Contact;