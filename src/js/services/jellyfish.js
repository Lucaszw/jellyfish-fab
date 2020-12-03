import { el, mount, setStyle } from "redom";

import * as THREE from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

let camera, scene, renderer;
let geometry, material, manager;
let materials, mesh, object;

manager = new THREE.LoadingManager();

let mtlLoader = new MTLLoader(manager);
let objLoader = new OBJLoader();

window.THREE = THREE;

class JellyFish {
  constructor(parent) {
    this.parent = parent;
  }

  loadMaterials() {
    return new Promise((res, rej) => {
      mtlLoader.load("/assets/Jellyfish.mtl", (m) => {
        m.preload();
        res(m);
      });
    });
  }

  loadObject(materials) {
    return new Promise((res, rej) => {
      objLoader
        .setMaterials(materials)
        .load("/assets/Jellyfish.obj", (object) => {
        
        console.log("BEFORE")
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            // child.material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 30, flatShading: true } )
            child.geometry.center();
          }
        });
        console.log("AFTER")
        res(object);
      });
    });
  }

  addLights() {
    let lights = this.lights = [null, null, null];

	lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );

    lights[0].position.x = 0.5
    lights[0].position.y = -0.8;
    lights[0].position.z = -0.23;
    lights[0].position.normalize();
    scene.add( lights[0] );

    lights[1] = new THREE.PointLight( 0xffffff, 1 );
    lights[1].position.normalize();
    scene.add(lights[1]);
    camera.add(lights[1]);

	lights[2] = new THREE.DirectionalLight( 0xffffff, 1 );
    lights[2].position.x = -0.5
    lights[2].position.y = 0.8;
    lights[2].position.z = 0.23;
    lights[2].position.normalize();
    scene.add( lights[2] );
  }
  async draw() {
    this.container = el(".jelly-3d-container");
    mount(this.parent, this.container);

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      10000
    );
    camera.position.z = 250;
    
    scene = new THREE.Scene();
    scene.background = null;
    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    materials = await this.loadMaterials(manager);
    object = await this.loadObject(materials);
    mesh = object.children[0];
    material = new THREE.MeshNormalMaterial();

    this.addLights();

    scene.add(object);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({alpha: false, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.container.appendChild(renderer.domElement);

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    // object.rotation.x += 0.01;
    // object.rotation.y += 0.02;

    renderer.render(scene, camera);
  }
}

export default JellyFish;