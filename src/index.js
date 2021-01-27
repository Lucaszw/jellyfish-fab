import "jquery";
import "bootstrap/dist/js/bootstrap.bundle";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './scss/main.scss';
import _ from 'lodash';
import { el, mount } from "redom";

import Navbar from './js/navbar';
import Sliding from './js/sliding';
import Home from './js/home';
import Team from './js/team';
import Projects from './js/projects';
import Workshops from './js/workshops';
import Services from './js/services';
import footerHTML from "./html/footer.html";


const navbar = new Navbar(document.body);
const sliding = new Sliding(document.body);
const home = new Home(navbar);
const team = new Team(navbar);
const projects = new Projects(navbar);
const workshops = new Workshops(navbar);
const services = new Services(navbar);
const pages = [home, team, projects, workshops, services];
const footer = el(".footer", {innerHTML: footerHTML});

function main() {
    navbar.draw();
    home.draw();
    // services.draw();
    // navbar.container.style.backgroundColor = "rgba(0,0,0,0)";
    navbar.onChangePage = (elem) => {
        const {page} = elem.dataset;
        navbar.container.classList.add("hidden");
        sliding.easeInOut(()=>{
            for (let page of pages) page.remove();
            footer.remove();
            // navbar.container.style.backgroundColor = "";

            if (page == "home") {
                home.draw();
                home.header.drawTextAnimation();
            }
            if (page == "team") team.draw();
            if (page == "projects") projects.draw();
            if (page == "workshops") workshops.draw();
            if (page == "services") services.draw();

            document.body.appendChild(footer);
        }, () => {
            navbar.container.classList.remove("hidden");
        });
    };
    sliding.easeOut(()=>{
        home.header.drawTextAnimation();
    });

    document.body.appendChild(footer);

    let links = {};
    links.instagram = "https://www.instagram.com/jellyfishfab/";
    links.facebook = "https://www.facebook.com/jellyfishfab";
    links.linkedin = "https://www.linkedin.com/company/jellyfishfab";
    links.youtube = "https://www.youtube.com/channel/UChsD2mI8WvD7gzc6uwOVr8Q";

    _.map(links, (link, name) => {
        footer.querySelector(`.${name}-button`).onclick = () => {
            window.location.href = link;
        }
    });
    
}

document.addEventListener("DOMContentLoaded", function(event) { 
    main();
});
