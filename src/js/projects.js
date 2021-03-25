import { el, mount } from "redom";
import _ from "lodash";

import randInt from "random-int";
import isOverlapping from "./utils/overlap";
import Header from "./projects/header";
import Gallery from "./projects/gallery";
import Arrow from "./arrow";
import * as pdfjsLib from 'pdfjs-dist';
import PDFJSWorker from 'pdfjs-dist/build/pdf.worker.min';

const SAMPLE_PDF = '/assets/glow-worm.pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;
let docPromise = pdfjsLib.getDocument(SAMPLE_PDF).promise;

class Projects {
  constructor(navbar) {
    this.navbar = navbar;
    document.addEventListener(
      "scroll",
      _.debounce(this.onScroll.bind(this), 20, {
        leading: true,
        trailing: true,
      })
    );
  }

  draw() {
    this.remove();
    this.container = el(".projects");
    mount(document.body, this.container);
    
    this.header = new Header(this.container);
    this.header.draw();

    this.gallery = new Gallery(this.container);

    this.gallery.onEnterFullScreen = () => {
      // this.navbar.container.classList.add("hidden");
      this.loadPDF();
    }

    this.gallery.onExitFullScreen = () => {
      this.navbar.container.classList.remove("hidden");
    }

    this.gallery.draw();

    this.arrow = new Arrow();
    this.arrow.draw();

    this.openProjectWrapper = el(".open-project-wrapper");
    this.closeProjectBtn =  el('.close-btn');
    mount(this.container, this.openProjectWrapper);
    mount(this.openProjectWrapper, this.closeProjectBtn);

    this.closeProjectBtn.onclick = () => {
      this.openProjectWrapper.classList.remove("isOpen");
      const canvases = this.openProjectWrapper.querySelectorAll("canvas");
      for (let canvas of canvases) {
        canvas.remove();
      }
    }
  }
  remove() {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    if (this.arrow) this.arrow.remove();
  }
  onScroll() {
    if (!this.container) return;
    let overlapping = isOverlapping(this.navbar.container, this.gallery.container);
    if (!overlapping) this.navbar.container.classList.remove("opaque");
    if (overlapping) this.navbar.container.classList.add("opaque");
  }

  async loadPDF() {
    this.openProjectWrapper.classList.add("isOpen");
    let doc = await docPromise;

    const pages = doc._pdfInfo.numPages;

    for (let page = 0; page < pages; page ++) {
      const canvas = el("canvas");
      mount(this.openProjectWrapper, canvas);
      await this.renderPage(page+1, canvas, doc);
    }

  }

  async renderPage(num, canvas, doc) {
    const page = await doc.getPage(num);
    const ctx = canvas.getContext("2d");

    let viewport = page.getViewport({scale: 0.8})
    let scale = window.innerWidth / viewport.width;
    viewport = page.getViewport({scale});

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    page.render(renderContext).promise;
  }


}
export default Projects;
