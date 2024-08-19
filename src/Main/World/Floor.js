import * as THREE from "three";

import Main from "../Main";

export default class Floor {
  constructor() {
    this.main = new Main();
    this.scene = this.main.scene;
    this.resources = this.main.resources;

    this.debug = this.main.debug;
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("floor");
    }
    this.debugObject = {};

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  setMaterial() {
    this.debugObject.color = "#faeee4";
    this.material = new THREE.MeshStandardMaterial();
    if (this.debug.active) {
      this.debugFolder.addColor(this.debugObject, "color").onChange(() => {
        this.material.color.set(this.debugObject.color);
      });
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }
}
