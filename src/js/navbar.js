import { el, mount } from "redom";
import navbarHTML from '../html/navbar.html';

const navbarSub = `
    <section class="navbar nav-sub" style="max-width: 0px">
        <span class="navcollapse">
            <span id="navcollapse" class="navcollapse" style="display: none"
            ><i class="fas fa-times"></i
            ></span>
        </span>

        <div class="spacer"></div>
        <div class="navitem" id="team-navbtn" data-page="team"><span>Team</span></div>
        <div class="navitem" id="projects-navbtn" data-page="projects"><span>Projects</span></div>
        <div class="navitem" id="workshops-navbtn" data-page="workshops"><span>Workshops</span></div>
        <div class="navitem" id="services-navbtn" data-page="services"><span>Services</span></div>
    </section>
`;

class Navbar {
    constructor(parentContainer) {
        this.container = null;
        this.onChangePage = () => {console.error("Implement Me")};
    }
    draw() {
        if (this.container) this.container.remove();
        this.container = el(".navbar", {innerHTML: navbarHTML});
        this.subnav = el("div", {innerHTML: navbarSub}).children[0];
        mount(document.body, this.container);
        mount(document.body, this.subnav);
        this.setupSubnav();
    }
    collapse() {
        const expandBtn = this.container.querySelector("#navexpand");
        const collapseBtn = this.subnav.querySelector("#navcollapse");

        this.subnav.style.maxWidth = "0px";
        expandBtn.style.display = "block";
        collapseBtn.style.display = "none";
    }

    expand() {
        const expandBtn = this.container.querySelector("#navexpand");
        const collapseBtn = this.subnav.querySelector("#navcollapse");

        this.subnav.style.maxWidth = "160px";
        expandBtn.style.display = "none";
        collapseBtn.style.display = "block";
    }
    setupSubnav() {
        // Expand / Collapse Sub Nav
        const expandBtn = this.container.querySelector("#navexpand");
        const collapseBtn = this.subnav.querySelector("#navcollapse");

        expandBtn.onclick = this.expand.bind(this);
        collapseBtn.onclick = this.collapse.bind(this);

        let navItems = this.subnav.querySelectorAll(".navitem");
        let logo = this.container.querySelector(".nav-left");
        let _this = this;
        for (let item of navItems) {
            item.onclick = function () {
                _this.collapse();
                _this.onChangePage(item);
            }
        }

        logo.onclick = function () {
            _this.collapse();
            _this.onChangePage(logo);
        };
    }
}

export default Navbar;