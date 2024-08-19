import * as THREE from "three";

import Main from "./Main";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Camera {
  constructor() {
    this.main = new Main();
    this.canvas = this.main.canvas;
    this.sizes = this.main.sizes;
    this.scene = this.main.scene;
    this.debug = this.main.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");
    }

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(65, this.sizes.width / this.sizes.height, 0.1, 100);
    this.instance.position.set(0, 3.6908, 4.345);
    this.scene.add(this.instance);

    if (this.debug.active) {
      this.debugFolder.add(this.instance.position, "x").min(-10).max(10).step(0.001);
      this.debugFolder.add(this.instance.position, "y").min(-10).max(10).step(0.001);
      this.debugFolder.add(this.instance.position, "z").min(-10).max(10).step(0.001);
    }
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;

    const position = new THREE.Vector3(0, 1, 0);
    this.controls.target = position;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
