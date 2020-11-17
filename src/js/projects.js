import { el, mount } from "redom";
import _ from "lodash";

import circleSVG from '../html/projects/orbit-circle-1.html';
import randInt from 'random-int';

class Projects {
  constructor(navbar) {
    this.navbar = navbar;
    // window.addEventListener("resize", _.debounce(this.draw.bind(this), 500));
  }
  draw() {
    this.remove();
    this.container = el(".projects");
    mount(document.body, this.container);

    this.crosshairs = el(".crosshairs", {
      style: `height: ${window.innerHeight}px; width: ${window.innerWidth}px;`,
    });
    this.gallery = el(".gallery", {
      style: `height: ${window.innerHeight}px; width: ${window.innerWidth}px;`,
    });

    // this.constructCircle(0.7);
    this.constructCircle(0.3);
    this.constructCircle(0.1);

    mount(this.container, this.crosshairs);

    this.verticalCrosshair = el(".crosshair.vertical");
    mount(this.crosshairs, this.verticalCrosshair);

    this.horizontalCrosshair = el(".crosshair.horizontal");
    mount(this.crosshairs, this.horizontalCrosshair);
    this.drawDashes();
    mount(this.container, this.gallery);
    this.drawGrid(this.gallery);
  }

  constructCircle(scale) {
    let circle = el(".circle", {
        innerHTML: circleSVG,
        style: {transform: `rotateZ(${randInt(0,360)}deg)`}
    });

    circle.querySelector("#orbit-circle-1").setAttribute("transform",`translate(50,50) scale(${scale})`);
    mount(this.container, circle);

    let {width: circleW, height: circleH} = circle.querySelector(".page").getBBox();
    circle.querySelector("svg").style.width = `${circleW+100}px`;
    circle.querySelector("svg").style.height = `${circleH+100}px`;
    // circle.querySelector("svg").style.scale = (scale || 0.5);
    circle.style.left = `calc(50% - ${(circleW+100)/2}px)`;
    circle.style.top = `calc(50% - ${(circleH+100)/2}px)`;
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

    return {verticalHeight, horizontalWidth, dashInterval, h, w};
  }
  drawGrid(container) {
    let o = this.getGridOptions();
    for (let i = 0; i < 6; i++) {
        let x1 = o.w + o.dashInterval * i;
        let y1 = o.h + o.dashInterval * i;
        let x2 = o.w - o.dashInterval * i;
        let y2 = o.h - o.dashInterval * i;
        [
            el(".big-dash.vertical.thin", { style: `left:${x1}px;` }),
            el(".big-dash.horizontal.thin", { style: `top:${y1}px` }),
            el(".big-dash.vertical.thin", { style: `left:${x2}px;` }),
            el(".big-dash.horizontal.thin", { style: `top:${y2}px` }),
          ].forEach((el) => {
            mount(container, el);
          });
    }
  }
  drawDashes() {
    let o = this.getGridOptions();
    this.verticalCrosshair.style.left = `${o.horizontalWidth / 2}px`;
    this.horizontalCrosshair.style.top = `${o.verticalHeight / 2}px`;
    this.drawGrid(this.crosshairs);
    for (let i = 0; i < 6; i++) {
      let x1 = o.w + o.dashInterval * i;
      let y1 = o.h + o.dashInterval * i;
      let x2 = o.w - o.dashInterval * i;
      let y2 = o.h - o.dashInterval * i;
      [
        el(".big-dash.vertical", { style: `left:${x1}px;top:${o.h - 15}px` }),
        el(".big-dash.horizontal", { style: `left:${o.w - 15}px;top:${y1}px` }),
        el(".big-dash.vertical", { style: `left:${x2}px;top:${o.h - 15}px` }),
        el(".big-dash.horizontal", { style: `left:${o.w - 15}px;top:${y2}px` }),
      ].forEach((el) => {
        mount(this.crosshairs, el);
      });

      for (let j = 1; j < 5; j++) {
        let xs1 = x1 + (o.dashInterval / 5) * j;
        let ys1 = y1 + (o.dashInterval / 5) * j;
        let xs2 = x2 - (o.dashInterval / 5) * j;
        let ys2 = y2 - (o.dashInterval / 5) * j;

        [
          el(".small-dash.vertical", { style: `left:${xs1}px;top:${o.h - 5}px` }),
          el(".small-dash.horizontal", {
            style: `left:${o.w - 5}px;top:${ys1}px`,
          }),
          el(".small-dash.vertical", { style: `left:${xs2}px;top:${o.h - 5}px` }),
          el(".small-dash.horizontal", {
            style: `left:${o.w - 5}px;top:${ys2}px`,
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
