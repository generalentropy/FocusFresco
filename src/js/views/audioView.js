import View from "./view";
import { TIMER_MIN, TIMER_SEC, PAUSE_MIN, PAUSE_SEC } from "../config";
import * as model from "../model";

class AudioView extends View {
  addHandlerVolumeChange(callback) {
    this.volumeSlider.addEventListener("input", callback);
  }
}

export default new AudioView();
