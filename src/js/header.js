import "particles.js";
import anime from "animejs";
import headerHTML from "../html/header.html";
import { el, mount } from "redom";
import GlslCanvas from "glslCanvas";

class Header {
  constructor(parent) {
    this.container = null;
    this.headerContent = null;
    this.parent = parent;
    this.particleColors = [
      "#bc7df1",
      "#8332fc",
      "#08fcea",
      "#ffffff",
      "#4683ea",
      "#b9f7ff",
    ];
  }

  draw() {
    if (this.container) this.container.remove();

    this.container = el(".header", {
      innerHTML: '<canvas></canvas>',
    });
    let height = window.innerHeight;

    this.container.style.height = `${height}px`;

    mount(this.parent, this.container);

    // this.drawParticles();
    this.drawCanvas();
  }

  drawTextAnimation() {
    if (this.headerContent) this.headerContent.remove();

    this.headerContent = el(".header-content", { innerHTML: headerHTML });
    mount(this.parent, this.headerContent);

    // Wrap every letter in a span
    var textWrapper = this.headerContent.querySelector(".ml11 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: false })
      .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml11 .line",
        translateX: [
          0,
          document.querySelector(".ml11 .letters").getBoundingClientRect()
            .width + 20,
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add(
        {
          targets: ".ml11 .letter",
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 600,
          offset: "-=775",
          delay: (el, i) => 34 * (i + 1),
        },
        700
      )
      .add({
        targets: ".line",
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 200,
      });

    anime.timeline({ loop: false }).add(
      {
        targets: [
          this.headerContent.querySelector("h2"),
          this.headerContent.querySelector(".big-button"),
        ],
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1),
      },
      700
    );
  }

  drawCanvas() {
    const canvas = this.container.querySelector("canvas");

    // set the size of the drawingBuffer
    var devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;


    const sandbox = new GlslCanvas(canvas);
    // // Created by inigo quilez - iq/2013
    // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

    var string_frag_code = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;

    float circle (vec2 p, vec2 position, float radius) {
      return floor(distance(p, position)*10.);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      uv.x *=  u_resolution.x / u_resolution.y;
    
        // background	 
      vec3 color = vec3(0.580+uv.y*0.664,0.68+uv.y*0.232,1.+uv.y*3.164);
    
        // bubbles	
      for( int i=0; i<30; i++ )
      {
            // bubble seeds
        float pha =      sin(float(i)*546.434+0.896)*0.476 + 0.5;
        float siz = pow( sin(float(i)*651.460+5.0)*0.5 + 0.5, 4.0 );
        float pox =      sin(float(i)*321.55+4.1) * u_resolution.x / u_resolution.y;
    
            // buble size, position and color
        float rad = 0.028 + -0.020*siz;
        vec2  pos = vec2( pox, rad + (0.916+1.864*rad)*mod(pha+0.101*u_time*(0.056+0.544*siz),1.0));
        float dis = length( uv - pos );
        vec3  col = mix( vec3(0.,0.136,0.118), vec3(0.190,0.225,0.), 0.052+0.5*sin(float(i)*1.792+0.900));
           // col+= 8.0*smoothstep( rad*0.95, rad, dis );
        
            // render
        float f = length(uv-pos)/rad;
        f = sqrt(clamp(0.916-f,0.076,0.480));
        color -= col.zyx *(0.96-smoothstep( rad*0.70, rad, dis )) * f;
      }
    
        // vigneting	
      // color *= sqrt(1.4-0.7*length(uv));
    
      gl_FragColor = vec4(color,1.0);
    }
    `;
    console.log(string_frag_code);
    sandbox.load(string_frag_code);
  }

  drawParticles() {
    particlesJS("particles-js", {
      particles: {
        number: { value: 50, density: { enable: false, value_area: 100 } },
        color: { value: this.particleColors },
        // shape: {
        //   type: "edge",
        //   stroke: { width: 0, color: "#000000" },
        //   polygon: { nb_sides: 100 },
        // },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 15,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 2,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "bubble" },
          onclick: { enable: false, mode: "repulse" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 0.5 } },
          bubble: {
            distance: 400,
            size: 4,
            duration: 0.3,
            opacity: 1,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  }

}

export default Header;
