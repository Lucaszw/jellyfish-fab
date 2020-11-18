import { el, mount } from "redom";
import _ from "lodash";

class Grid {
  drawGrid(container, spread) {
    spread = spread || 5;
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

}
export default Grid;