import { el, mount } from "redom";
import _ from "lodash";

import circleSVG from "../../html/projects/orbit-circle-1.html";
import projectsHeader from "../../html/projects/header.html";

import randInt from "random-int";
import isOverlapping from "../utils/overlap";
import Grid from "./grid";

class Header extends Grid {
  constructor(parent) {
    super();
    this.parent = parent;
  }
  draw() {
    this.crosshairs = el(".crosshairs", {
      style: `height: ${window.innerHeight}px; width: 100%;`,
    });

    this.headerInfo = el(".header", { innerHTML: projectsHeader });

    mount(this.parent, this.crosshairs);
    mount(this.crosshairs, this.headerInfo);

    this.constructCircle(0.71, 40);
    setTimeout(() => this.constructCircle(0.4, 20), 400);
    setTimeout(() => this.constructCircle(0.2, 18), 700);

    this.verticalCrosshair = el(".crosshair.vertical");
    mount(this.crosshairs, this.verticalCrosshair);

    this.horizontalCrosshair = el(".crosshair.horizontal");
    mount(this.crosshairs, this.horizontalCrosshair);
    this.drawDashes();
  }

  constructCircle(scale, speed) {
    let circle = el(".circle", {
      innerHTML: circleSVG,
    });

    circle
      .querySelector(".circle-group")
      .setAttribute("transform", `scale(${scale})`);

    mount(this.crosshairs, circle);

    let svg = circle.querySelector("svg");
    let page = circle.querySelector(".page");

    let { width: circleW, height: circleH } = page.getBBox();
    let diff =
      svg.getBoundingClientRect().top - page.getBoundingClientRect().top;

    page.style.transform = `translateY(${diff}px)`;

    const innerCircles = circle.querySelectorAll(".inner-circle");
    for (let innerCircle of innerCircles) {
      if (randInt(0, 1)) innerCircle.style.display = "block";
    }

    circle.querySelector("svg").style.width = `${circleW}px`;
    circle.querySelector("svg").style.height = `${circleH}px`;
    circle.style.left = `calc(50% - ${circleW / 2}px)`;
    circle.style.top = `calc(50% - ${circleH / 2}px)`;
    // circle.style.transform = `rotateZ(${randInt(0, 360)}deg)`;
    circle.style.animation = `spin ${speed}s linear infinite`;
  }

  drawDashes(spread) {
    spread = spread || 5;
    // this.drawGrid(this.crosshairs, spread);
    for (let i = 0; i < spread; i++) {
      const bigOffset = (i * 100) / spread;
      [
        el(".big-dash.vertical", {
          style: `left:${bigOffset}%;top:calc(50% - 15px)`,
        }),
        el(".big-dash.horizontal", {
          style: `left:calc(50% - 15px);top:${bigOffset}%`,
        }),
      ].forEach((el) => {
        mount(this.crosshairs, el);
      });

      for (let j = 1; j < 5; j++) {
        const smallOffset = ((100 / spread) * j) / 5;
        [
          el(".small-dash.vertical", {
            style: `
                    left: calc(${bigOffset}% + ${smallOffset}%);
                    top: calc(50% - 5px);
                `,
          }),
          el(".small-dash.horizontal", {
            style: `
                    left: calc(50% - 5px);
                    top: calc(${bigOffset}% + ${smallOffset}%);
                `,
          }),
        ].forEach((el) => {
          mount(this.crosshairs, el);
        });
      }
    }
  }
}

export default Header;
