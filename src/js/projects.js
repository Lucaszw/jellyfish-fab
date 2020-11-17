import { el, mount } from "redom";
import _ from "lodash";

import circleSVG from "../html/projects/orbit-circle-1.html";
import randInt from "random-int";

class Projects {
  constructor(navbar) {
    this.navbar = navbar;
    // window.addEventListener("resize", _.debounce(this.draw.bind(this), 500));
  }
  draw() {
    this.remove();
    this.container = el(".projects");
    mount(document.body, this.container);

    this.crosshairs = el(".crosshairs", {style: `height: ${window.innerHeight}px; width: 100%;`});
    // this.gallery = el(".gallery", {
    //   style: `height: ${window.innerHeight}px; width: 100%;`,
    // });

    mount(this.container, this.crosshairs);

    this.constructCircle(0.7);
    this.constructCircle(0.3);
    this.constructCircle(0.1);

    this.verticalCrosshair = el(".crosshair.vertical");
    mount(this.crosshairs, this.verticalCrosshair);

    this.horizontalCrosshair = el(".crosshair.horizontal");
    mount(this.crosshairs, this.horizontalCrosshair);
    this.drawDashes();
    // mount(this.container, this.gallery);
    // this.drawGrid(this.gallery);
  }

  constructCircle(scale) {
    let circle = el(".circle", {
      innerHTML: circleSVG,
      style: {transform: `rotateZ(${randInt(0,360)}deg)`}
    });

    circle
      .querySelector(".circle-group")
      .setAttribute("transform", `translate(50,50) scale(${scale})`);
    mount(this.crosshairs, circle);

    let { width: circleW, height: circleH } = circle
      .querySelector(".page")
      .getBBox();

    circle.querySelector("svg").style.width = `${circleW + 100}px`;
    circle.querySelector("svg").style.height = `${circleH + 100}px`;
    circle.style.left = `calc(50% - ${(circleW + 100) / 2}px)`;
    circle.style.top = `calc(50% - ${(circleH + 100) / 2}px)`;
  }

  getGridOptions() {
    let {
      height: verticalHeight,
    } = this.verticalCrosshair.getBoundingClientRect();
    let {
      width: horizontalWidth,
    } = this.horizontalCrosshair.getBoundingClientRect();

    let dashInterval = _.max([verticalHeight, horizontalWidth]) / 12;

    let h = verticalHeight / 2;
    let w = horizontalWidth / 2;

    return { verticalHeight, horizontalWidth, dashInterval, h, w };
  }
  drawGrid(container, spread) {
    spread = spread || 4;
    for (let i = 0; i < spread; i++) {
      const bigOffset = (i * 100) / spread;
      [
        el(".big-dash.vertical.thin", { style: `left:${bigOffset}%;` }),
        el(".big-dash.horizontal.thin", { style: `top:${bigOffset}%` }),
      ].forEach((el) => {
        mount(container, el);
      });
    }
  }
  drawDashes(spread) {
    spread = spread || 5;
    this.drawGrid(this.crosshairs, spread);
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

  remove() {
    if (this.container) this.container.remove();
  }
}
export default Projects;
