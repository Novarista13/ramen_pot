import Main from "../Main";
import Environment from "./Environment";
import Model from "./Model";
import Floor from "./Floor";
import Steam from "./Steam";
import Fire from "./Fire";
import Audio from "./Audio";

export default class World {
  constructor() {
    this.main = new Main();
    this.resources = this.main.resources;

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
      this.audio = new Audio();
    });
  }

  update() {
    if (this.model) this.model.update();
    if (this.steam) this.steam.update();
    if (this.fire) this.fire.update();
  }
}
