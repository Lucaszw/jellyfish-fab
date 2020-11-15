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
 
const navbar = new Navbar(document.body);
const sliding = new Sliding(document.body);
const home = new Home(navbar);
const team = new Team(navbar);

const pages = [home, team];

function main() {
    navbar.draw();
    team.draw();
    navbar.onChangePage = (elem) => {
        const {page} = elem.dataset;
        sliding.easeInOut(()=>{
            console.log({page});
            for (let page of pages) page.remove();
            if (page == "home") {
                home.draw();
                home.header.drawTextAnimation();
            }
            if (page == "team") team.draw();
        });
        console.log(home.container);
    };
    // sliding.easeOut(()=>{
    //     home.header.drawTextAnimation();
    // });

    
}

document.addEventListener("DOMContentLoaded", function(event) { 
    main();
});
