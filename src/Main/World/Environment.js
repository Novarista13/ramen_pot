import * as THREE from "three";

import Main from "../Main";
// import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";

export default class Environment {
  constructor() {
    this.main = new Main();
    this.scene = this.main.scene;
    this.resources = this.main.resources;
    this.debug = this.main.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    this.setAmbient();
    this.setSunLight();
    this.setArtificial1();
    this.setArtificial2();
    this.setArtificial3();
  }

  setAmbient() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.ambientLight);
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ebe8d6", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, 5);
    this.scene.add(this.sunLight);

    this.parameters = {};
    this.parameters.sunColor = "#D8D2AF";

    // Debug
    if (this.debug.active) {
      this.debugFolder.sunLightFolder = this.debugFolder.addFolder("sun light");

      this.debugFolder.sunLightFolder.addColor(this.parameters, "sunColor").onChange(() => {
        this.sunLight.color.set(this.parameters.sunColor);
      });

      this.debugFolder.sunLightFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder.sunLightFolder
        .add(this.sunLight.position, "x")
        .name("sunLightX")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder.sunLightFolder
        .add(this.sunLight.position, "y")
        .name("sunLightY")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder.sunLightFolder
        .add(this.sunLight.position, "z")
        .name("sunLightZ")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  setArtificial1() {
    this.artificial1 = new THREE.RectAreaLight("#FFD8C0", 3, 2, 2);
    this.artificial1.position.set(0, 3.03109, 1.75);
    this.artificial1.rotateX(-45);
    this.scene.add(this.artificial1);

    // // const rectAreaLightHelper = new RectAreaLightHelper(this.artificial1);
    // this.scene.add(rectAreaLightHelper);

    // Debug
    if (this.debug.active) {
      this.debugFolder.artificial1Folder = this.debugFolder.addFolder("artificial1");

      this.debugFolder.artificial1Folder
        .add(this.artificial1, "intensity")
        .name("artifical1Intensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder.artificial1Folder
        .add(this.artificial1.position, "x")
        .name("artifical1X")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder.artificial1Folder
        .add(this.artificial1.position, "y")
        .name("artifical1Y")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder.artificial1Folder
        .add(this.artificial1.position, "z")
        .name("artifical1Z")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  setArtificial2() {
    this.artificial2 = new THREE.RectAreaLight("#FFD8C0", 3, 2, 2);
    this.artificial2.position.set(1.95, 2.7577, -1.95);
    this.artificial2.rotation.set(45, 0, 45);
    this.artificial2.rotateX(Math.PI);
    this.scene.add(this.artificial2);

    // // const rectAreaLightHelper = new RectAreaLightHelper(this.artificial2);
    // this.scene.add(rectAreaLightHelper);

    // Debug
    if (this.debug.active) {
      this.debugFolder.artificial2Folder = this.debugFolder.addFolder("artificial2");
      this.debugFolder.artificial2Folder
        .add(this.artificial2, "intensity")
        .name("artifical2Intensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder.artificial2Folder
        .add(this.artificial2.position, "x")
        .name("artifical2X")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder.artificial2Folder
        .add(this.artificial2.position, "y")
        .name("artifical2Y")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder.artificial2Folder
        .add(this.artificial2.position, "z")
        .name("artifical2Z")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  setArtificial3() {
    this.artificial3 = new THREE.RectAreaLight("#FFD8C0", 3, 2, 2);
    this.artificial3.position.set(-2.796, 3.95414, -2.796);
    this.artificial3.rotation.set(45, 0, -45);
    this.artificial3.rotateX(Math.PI);
    this.scene.add(this.artificial3);

    // // const rectAreaLightHelper = new RectAreaLightHelper(this.artificial3);
    // this.scene.add(rectAreaLightHelper);

    // Debug
    if (this.debug.active) {
      this.debugFolder.artificial3Folder = this.debugFolder.addFolder("artificial3");
      this.debugFolder.artificial3Folder
        .add(this.artificial3, "intensity")
        .name("artifical3Intensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder.artificial3Folder
        .add(this.artificial3.position, "x")
        .name("artifical3X")
        .min(-5)
        .max(5)
        .step(0.001);
      this.debugFolder.artificial3Folder
        .add(this.artificial3.position, "y")
        .name("artifical3Y")
        .min(-5)
        .max(5)
        .step(0.001);
      this.debugFolder.artificial3Folder
        .add(this.artificial3.position, "z")
        .name("artifical3Z")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }
}
