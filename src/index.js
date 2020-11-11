import "jquery";
import "bootstrap/dist/js/bootstrap.bundle";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './scss/main.scss';
import Navbar from './js/navbar';
import Header from './js/header';

function main() {
    const navbar = new Navbar(document.body);
    const header = new Header(document.body);
    header.draw();
    navbar.draw();
}

main();