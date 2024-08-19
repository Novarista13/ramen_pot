import Main from "./Main";
import EventEmitter from "./Utils/EventEmitter";

let instance = null;

export default class Slider extends EventEmitter {
  constructor(rangeElement) {
    super();
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this.rangeElement = rangeElement;
    this.options = {
      min: 0,
      max: 1,
      cur: 0.3,
    };

    this.rangeElement.addEventListener("input", this.updateSlider.bind(this));
    this.init();
  }

  init() {
    this.rangeElement.setAttribute("min", this.options.min);
    this.rangeElement.setAttribute("max", this.options.max);
    this.rangeElement.setAttribute("step", 0.01);
    this.rangeElement.value = this.options.cur;

    this.updateSlider();
  }

  generateBackground() {
    let value = parseFloat(this.rangeElement.value);
    if (value === this.options.min) {
      return;
    }

    let percentage = ((value - this.options.min) / (this.options.max - this.options.min)) * 100;

    return (
      "linear-gradient(to right, #ff4500 " +
      percentage +
      "%, #ff8c00 " +
      percentage +
      "%, #ffd700 " +
      percentage +
      "%, #ffe4b5 100%)"
    );
  }

  updateSlider() {
    let background = this.generateBackground();
    if (background) {
      this.rangeElement.style.background = background;
    }
    this.trigger("rangeChanged");
  }
}
