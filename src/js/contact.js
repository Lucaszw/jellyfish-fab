import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyC2W1ABNlAybUOiS_TXnapjppGcqC2r2pE",
  authDomain: "jellyfishfab.com",
  databaseURL: "https://jellyfish-fab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jellyfish-fab",
  storageBucket: "jellyfish-fab.appspot.com",
  messagingSenderId: "361684785078",
  appId: "1:361684785078:web:5265edbc19df8cf046d317",
  measurementId: "G-HSKP5SWWMY"
};


firebase.initializeApp(firebaseConfig);

const database = firebase.database();

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