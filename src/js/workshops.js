import { el, mount, setStyle } from "redom";
import headerHTML from "../html/workshops/header.html";
import workshopTableHTML from "../html/workshops/workshop-table.html";
import backdropHTML from "../html/workshops/window-backdrop.html";
import headerTexHTML from "../html/workshops/header-text.html";
import contentHTML from "../html/workshops/content.html"
import Arrow from "./arrow";

import _ from "lodash";

const minWidth = 800;


class Workshops {
    constructor(navbar) {
        this.navbar = navbar;
        window.addEventListener("resize", _.debounce(this.drawHeader.bind(this),100,{leading: false, trailing: true}));
    }

    resizeSvg(svg, fixedElement, w) {
        w = w || minWidth;
        let originalWidth = parseInt(svg.getAttribute("width"));
        let originalHeight = parseInt(svg.getAttribute("height"));
        let scaleX, scaleY;

        scaleY = window.innerHeight/originalHeight;

        if (window.innerWidth <= w) {
            scaleX = window.innerWidth/originalWidth;
        } else {
            scaleX = w/originalWidth;
        }
        fixedElement.setAttribute("transform", `scale(${scaleX})`);
        const {width, height} = fixedElement.getBoundingClientRect();
        
        svg.setAttribute("width", `${width}px`);
        svg.setAttribute("height", `${height}px`);
        svg.setAttribute("viewbox", `0 0 ${width} ${height}`);
        fixedElement.setAttribute("transform", "");

        setStyle(svg.parentNode, {
            left: `calc(50% - ${width}px/2)`,
            position: 'absolute',
            bottom: '0px'
        });

    }

    drawContent() {
        if (!this.container) return;
        if (this.content) this.content.remove();
        this.content = el(".content", {innerHTML: contentHTML, style: `height: ${window.innerHeight}px`});
        mount(this.container, this.content);
    }

    drawHeader() {
        if (!this.container) return;
        if (this.header) this.header.remove();
        this.header = el(".header", {innerHTML: headerHTML, style: `height: ${window.innerHeight}px`});
        mount(this.container, this.header);
        this.drawHeaderText();

        this.drawBackdrop();
        this.drawWindowDivider();
        this.drawWorkbench();

        this.navbar.container.style.backgroundColor = "rgb(38,38,38)";
        this.navbar.container.querySelector(".logo-text").style.color = "white";
    }

    drawWindowDivider() {
        mount(this.header, el(".window-divider.left"));
        mount(this.header, el(".window-divider.right"));
    }

    drawBackdrop() {
        this.header.querySelector("#backdrop-container").innerHTML = "";
        mount(this.header.querySelector("#backdrop-container"), el("div", {innerHTML: backdropHTML}));
    
        const svg = this.header.querySelector("#backdrop-container svg");
        const backdropPage = this.header.querySelector("#backdrop-page");

        this.resizeSvg(svg, backdropPage);
        setStyle(svg.parentNode, {bottom: "50px", left: "0px"});

        const skyBBox = this.header.querySelector("#sky").getBoundingClientRect();
        const oceanFiller = el(".ocean-filler", {style: {top: `${skyBBox.bottom}px`}});
        mount(this.header, oceanFiller);
    }

    drawWorkbench() {
        this.header.querySelector("#workshop-container").innerHTML = "";
        mount(this.header.querySelector("#workshop-container"), el("div", {innerHTML: workshopTableHTML}));

        const svg = this.header.querySelector("#workshop-container svg");
        const workshopPage = this.header.querySelector("#workshop-page");

        this.resizeSvg(svg, workshopPage);

        const bbox = svg.getBoundingClientRect();

        const bottomFiller = el(".workshop-filler", {style: `height: ${0.75*bbox.height}`});
        mount(this.header, bottomFiller);
    }
    drawHeaderText() {
        this.headerText = el(".header-text", {innerHTML: headerTexHTML});
        mount(this.header, this.headerText);

        let bbox = this.headerText.getBoundingClientRect();
        setStyle(this.headerText, {
            top: `calc(50% - ${bbox.height/2}px)`
        });
    }
    draw() {
        this.remove();
        this.container = el(".workshops");
        mount(document.body, this.container);

        this.drawHeader();
        this.drawContent();

        this.arrow = new Arrow();
        this.arrow.draw();
    }

    remove() {
        if (!this.container) return;

        this.navbar.container.style.backgroundColor = "";
        this.navbar.container.querySelector(".logo-text").style.color = "";

        this.container.remove();
        this.container = null;
        if (this.arrow) this.arrow.remove();
    }
}

export default Workshops;