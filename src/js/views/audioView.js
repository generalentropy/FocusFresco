import View from './view';

class AudioView extends View {
  addHandlerVolumeChange(callback) {
    this.volumeSlider.addEventListener('input', (e) => callback(e));
  }
}

export default new AudioView();
