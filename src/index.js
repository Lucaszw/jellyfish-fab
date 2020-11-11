import "jquery";
import "bootstrap/dist/js/bootstrap.bundle";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './scss/main.scss';
import _ from 'lodash';
import Navbar from './js/navbar';
import Header from './js/header';
import Vision from './js/vision';
import Contact from './js/contact';
import isOverlapping from './js/utils/overlap';

function main() {
    const navbar = new Navbar(document.body);
    const header = new Header(document.body);
    const vision = new Vision(document.body);
    const contact = new Contact(document.body);

    setImmediate(()=> {
        header.draw();
        navbar.draw();
        vision.draw();
        contact.draw();

        document.addEventListener("scroll", _.debounce(()=> {
            let overlapping = isOverlapping(navbar.container, header.container);
            if (!overlapping) navbar.container.style.backgroundColor = "#1f1f2c";
            if (overlapping) navbar.container.style.backgroundColor = "#1f1f2cad";
        },20,{leading: true, trailing: true}));

    })
}

main();