import "jquery";
import "bootstrap/dist/js/bootstrap.bundle";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './scss/main.scss';
import _ from 'lodash';

import Navbar from './js/navbar';
import Sliding from './js/sliding';
import Home from './js/home';
import Team from './js/team';
import Projects from './js/projects';

const navbar = new Navbar(document.body);
const sliding = new Sliding(document.body);
const home = new Home(navbar);
const team = new Team(navbar);
const projects = new Projects(navbar);

const pages = [home, team, projects];

function main() {
    navbar.draw();
    projects.draw();
    navbar.container.style.backgroundColor = "rgba(0,0,0,0)";
    navbar.onChangePage = (elem) => {
        const {page} = elem.dataset;
        sliding.easeInOut(()=>{
            for (let page of pages) page.remove();
            navbar.container.style.backgroundColor = "";

            if (page == "home") {
                home.draw();
                home.header.drawTextAnimation();
            }
            if (page == "team") team.draw();
            if (page == "projects"){
                projects.draw();
                navbar.container.style.backgroundColor = "rgba(0,0,0,0)";
            }
        });
    };
    // sliding.easeOut(()=>{
    //     home.header.drawTextAnimation();
    // });

    
}

document.addEventListener("DOMContentLoaded", function(event) { 
    main();
});
