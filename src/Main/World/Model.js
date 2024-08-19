import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

import Main from "../Main";
import Slider from "../Slider";

import soupVertexShader from "../../shaders/soup/vertex.glsl";

export default class Model {
  constructor() {
    this.main = new Main();
    this.scene = this.main.scene;
    this.resources = this.main.resources;
    this.time = this.main.time;

    // slider
    this.slider = new Slider();
    this.slider.on("rangeChanged", () => {
      const rangeValue = this.slider.rangeElement.value;
      this.updateBoilingFrequency(rangeValue);
    });

    this.debug = this.main.debug;
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("model");
    }
    this.debugObject = {};

    // Setup
    this.resource = this.resources.items.ramenModel;

    this.setModel();
    this.setSoupMaterial();
  }

  setSoupMaterial() {
    this.soupMaterial = new CustomShaderMaterial({
      // CSM
      baseMaterial: THREE.MeshStandardMaterial,
      vertexShader: soupVertexShader,
      uniforms: {
        uTime: new THREE.Uniform(0),

        uBigWavesElevation: new THREE.Uniform(0.06),
        uBigWavesFrequency: new THREE.Uniform(new THREE.Vector2(2.85, 0.5)),
        uBigWavesSpeed: new THREE.Uniform(0.75),

        uSmallWavesElevation: new THREE.Uniform(0.05),
        uSmallWavesFrequency: new THREE.Uniform(7),
        uSmallWavesSpeed: new THREE.Uniform(2),
        uSmallWavesIterations: new THREE.Uniform(4),
      },

      // MeshStandardMaterial
      side: 2,
      opacity: 0.5,
      transparent: true,
      color: { isColor: true, r: 1, g: 0.485, b: 0.0762 },
      roughness: 0.3,
    });

    if (this.debug.active) {
      this.debugFolder.bigWaveFolder = this.debugFolder.addFolder("big wave");
      this.debugFolder.bigWaveFolder
        .add(this.soupMaterial.uniforms.uBigWavesElevation, "value", 0, 1, 0.001)
        .name("uBigWavesElevation");
      this.debugFolder.bigWaveFolder
        .add(this.soupMaterial.uniforms.uBigWavesFrequency.value, "x", 0, 10, 0.001)
        .name("uBigWavesFrequencyX");
      this.debugFolder.bigWaveFolder
        .add(this.soupMaterial.uniforms.uBigWavesFrequency.value, "y", 0, 10, 0.001)
        .name("uBigWavesFrequencyY");
      this.debugFolder.bigWaveFolder
        .add(this.soupMaterial.uniforms.uBigWavesSpeed, "value", 0, 4, 0.001)
        .name("uBigWavesSpeed");

      this.debugFolder.smallWaveFolder = this.debugFolder.addFolder("small wave");
      this.debugFolder.smallWaveFolder
        .add(this.soupMaterial.uniforms.uSmallWavesElevation, "value", 0, 1, 0.001)
        .name("uSmallWavesElevation");
      this.debugFolder.smallWaveFolder
        .add(this.soupMaterial.uniforms.uSmallWavesFrequency, "value", 0, 30, 0.001)
        .name("uSmallWavesFrequency");
      this.debugFolder.smallWaveFolder
        .add(this.soupMaterial.uniforms.uSmallWavesSpeed, "value", 0, 4, 0.001)
        .name("uSmallWavesSpeed");
      this.debugFolder.smallWaveFolder
        .add(this.soupMaterial.uniforms.uSmallWavesIterations, "value", 0, 5, 1)
        .name("uSmallWavesIterations");
    }

    this.soup = this.resource.scene.children.find((child) => child.name === "soup");
    this.soup.material = this.soupMaterial;
  }

  updateBoilingFrequency(rangeValue = 0.3) {
    this.soupMaterial.uniforms.uSmallWavesFrequency.value = rangeValue * 10;
    this.soupMaterial.uniforms.uSmallWavesSpeed.value = (rangeValue * 10) / 2;
  }

  setModel() {
    this.model = this.resource.scene;
    this.scene.add(this.model);

    if (this.debug.active) {
      this.debugFolder.add(this.model.position, "x").min(-10).max(10).step(0.001);
      this.debugFolder.add(this.model.position, "y").min(-10).max(10).step(0.001);
      this.debugFolder.add(this.model.position, "z").min(-10).max(10).step(0.001);
    }
  }

  update() {
    this.soupMaterial.uniforms.uTime.value = this.time.elapsed * 0.001;
  }
}
