import { el, mount } from "redom";
import navbarHTML from '../html/navbar.html';

class Navbar {
    constructor(parentContainer) {
        this.container = null;
        this.onChangePage = () => {console.error("Implement Me")};
    }
    draw() {
        if (this.container) this.container.remove();
        this.container = el(".navbar", {innerHTML: navbarHTML});
        mount(document.body, this.container);

        this.setupSubnav();
    }
    collapse() {
        const subnav = this.container.querySelector(".nav-sub");
        const expandBtn = this.container.querySelector("#navexpand");
        const collapseBtn = this.container.querySelector("#navcollapse");

        subnav.style.maxHeight = "0px";
        expandBtn.style.display = "block";
        collapseBtn.style.display = "none";
    }

    expand() {
        const subnav = this.container.querySelector(".nav-sub");
        const expandBtn = this.container.querySelector("#navexpand");
        const collapseBtn = this.container.querySelector("#navcollapse");

        subnav.style.maxHeight = "450px";
        expandBtn.style.display = "none";
        collapseBtn.style.display = "block";
    }
    setupSubnav() {
        // Expand / Collapse Sub Nav
        const expandBtn = this.container.querySelector("#navexpand");
        const collapseBtn = this.container.querySelector("#navcollapse");

        expandBtn.onclick = this.expand.bind(this);
        collapseBtn.onclick = this.collapse.bind(this);

        let navItems = this.container.querySelectorAll(".navitem");
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