import { el, mount } from "redom";
import _ from 'lodash';

class Sliding {
    constructor() {
        this.container = null;
    }

    recreateContainer(start="-100%") {
        if (this.container) this.container.remove();
        this.container = el(".sliding");
        this.container.style.left = start;
        mount(document.body, this.container);
    }

    easeInOut(callback1=_.noop, callback2=_.noop) {
        this.recreateContainer();
        setTimeout(()=> {
            this.container.style.left = "0px";
        }, 100);

        setTimeout(()=> {
            this.container.style.left = "100%";
        }, 1200);

        setTimeout(()=>{callback1();}, 1100);
        setTimeout(()=>{callback2();}, 3300);
    }

    easeOut(callback1=_.noop) {
        this.recreateContainer("0px");
        setTimeout(()=> {
            this.container.style.left = "100%";
        }, 1000);

        setTimeout(()=>{callback1();}, 2000);
    }

}

export default Sliding;