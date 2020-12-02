import { el, mount, setStyle } from "redom";


import * as THREE from 'three';

import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';

let camera, scene, renderer;
let geometry, material;
let materials, mesh, object;

let mtlLoader = new MTLLoader();
let objLoader = new OBJLoader();

window.THREE = THREE;

class JellyFish {
    constructor(parent) {
        this.parent = parent;
    }

    loadMaterials() {
        return new Promise((res, rej) => {
            mtlLoader.load('/assets/Jellyfish.mtl', (m) => {
                m.preload();
                res(m);
            });
        });
    }

    loadObject(materials) {
        console.log({materials});
        objLoader.setMaterials(materials);
        return new Promise((res, rej) => {
            objLoader.load('/assets/Jellyfish.obj', (object) => {
                object.traverse(function(child) {
                    console.log({child});
                    if (child instanceof THREE.Mesh) {
                        // child.material.color = 0xffb830;
                        // child.material = new THREE.MeshNormalMaterial();
                        child.geometry.center();
                    }
                });

                res(object);
            });
        });
    }

    addLights() {
        let lights = [null,null,null];

        lights[0] = new THREE.AmbientLight(0x00ff00, 0.3);
        lights[0].position.set( 50, 50, 50 );
        scene.add( lights[0] );
        camera.add( lights[0] );

        lights[1] = new THREE.PointLight( 0xff0000, 1 );
        lights[1].position.set( 100, 0, 150 );
        scene.add( lights[1] );
        camera.add( lights[1] );

        lights[2] = new THREE.PointLight( 0xff0000, 1, 100 );
        lights[2].position.set( 100, 50, 450 );
        scene.add( lights[2] );

    }
    async draw() {
        this.container = el('.jelly-3d-container');
        mount(this.parent, this.container);

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.001, 10000 );
        camera.position.z = 250;
     
        scene = new THREE.Scene();
        scene.background = null;
        console.log({scene});
        geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        materials = await this.loadMaterials();

        object = await this.loadObject(materials);
        mesh = object.children[0];
        material = new THREE.MeshNormalMaterial();
        mesh.material = material;

        scene.add( mesh );
        
        this.addLights();

        renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.toneMapping = THREE.ReinhardToneMapping;
        
        this.container.appendChild( renderer.domElement );

        this.animate();
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        
        object.rotation.x += 0.01;
        object.rotation.y += 0.02;
     
        renderer.render( scene, camera );
    }
}

export default JellyFish;