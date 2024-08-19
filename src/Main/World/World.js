import Main from "../Main";
import Environment from "./Environment";
import Model from "./Model";
import Floor from "./Floor";
import Steam from "./Steam";
import Fire from "./Fire";
import Slider from "../Slider";

export default class World {
  constructor() {
    this.main = new Main();
    this.resources = this.main.resources;

    // slider
    this.slider = new Slider();

    this.slider.on("rangeChanged", () => {
      const rangeValue = this.slider.rangeElement.value;
      this.updateAudioVolume(rangeValue);
    });

    this.environment = new Environment();
    this.floor = new Floor();

    this.debug = this.main.debug;
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("audio");
    }
    this.debugObject = {};

    // Wait for resources
    this.resources.on("ready", () => {
      this.model = new Model();
      this.fire = new Fire();
      this.steam = new Steam();

      this.setSound();
    });
  }

  setSound() {
    // sound
    this.sound = new Audio("./boiling_cut.mp3");
    this.sound.loop = true;
    this.sound.volume = 0.3;

    this.sound.play();

    if (this.debug.active) {
      this.debugFolder.add(this.sound, "volume").min(0).max(1).step(0.001);
    }
  }

  updateAudioVolume(rangeValue = 0.3) {
    this.sound.volume = Math.max(rangeValue, 0.2);
  }

  update() {
    if (this.model) this.model.update();
    if (this.steam) this.steam.update();
    if (this.fire) this.fire.update();
  }
}
