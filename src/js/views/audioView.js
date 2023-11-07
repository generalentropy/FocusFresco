import View from './view';

class AudioView extends View {
  addHandlerVolumeChange(callback) {
    this.volumeSlider.addEventListener('input', (e) => callback(e));
  }

  addHandlerMute(handler) {
    this.btnMute.addEventListener('click', handler);
  }
}

export default new AudioView();
