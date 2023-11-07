export default class View {
  durationBtn = document.querySelector('.btn-duration');
  divTimer = document.querySelector('.timer');
  btnStart = document.querySelector('.start-button');
  btnPause = document.querySelector('.pause-button');
  btnReset = document.querySelector('.reset-button');
  timerInfo = document.querySelector('.timer-info');
  ambianceBtns = document.querySelectorAll('.ambiance');
  ambianceBtnsContainer = document.querySelector('.container');
  mainStartSessionBtn = document.querySelector('.main-session-button');
  btnsContainer = document.querySelector('.buttons-container');
  modalAbout = document.querySelector('.modal-wrapper');
  openAboutModalBtn = document.getElementById('open-modal');
  closeAboutModalBtn = document.getElementById('close-modal');
  btnsDuration = document.querySelector('.btn-duration-container');
  ambianceTitle = document.querySelector('.ambiance-title');
  durationTitle = document.querySelector('.duration-title');
  settingsPanel = document.querySelector('.settings-wrapper');
  openSettingsBtn = document.getElementById('open-settings');
  closeSettingsBtn = document.getElementById('close-settings');
  toggleVolumeBtn = document.querySelector('.open-volume');
  volumePanel = document.querySelector('.volume-wrapper');
  volumeSlider = document.getElementById('volume-slider');
  btnMute = document.getElementById('mute-volume');

  addHandlerOpenAbout(handler) {
    this.openAboutModalBtn.addEventListener('click', handler);
  }

  addHandlerCloseAbout(handler) {
    this.closeAboutModalBtn.addEventListener('click', handler);
  }

  addHandlerOpenSettings(handler) {
    this.openSettingsBtn.addEventListener('click', handler);
  }

  addHandlerCloseSettings(handler) {
    this.closeSettingsBtn.addEventListener('click', handler);
  }

  addHandlerToggleVolume(handler) {
    this.toggleVolumeBtn.addEventListener('click', handler);
  }

  openAbout() {
    this.modalAbout.style.display = 'flex';
  }
  closeAbout() {
    this.modalAbout.style.display = 'none';
  }

  openSettings() {
    this.settingsPanel.style.display = 'flex';
  }
  closeSettings() {
    this.settingsPanel.style.display = 'none';
  }

  // Show/hide volume and manage behavior (mobile/desktop)
  toggleVolumePanel() {
    // If user is hovering the slider, cancel the timeout
    this.volumePanel.onmouseenter = () => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    };

    // For touch interactions
    this.volumePanel.addEventListener(
      'touchstart',
      () => {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
      },
      { passive: false }
    ); // 'passive: false' allows you to call preventDefault()

    const setHideTimeout = () => {
      // Hide the volume panel after 2s
      this.timeoutId = setTimeout(() => {
        this.volumePanel.classList.remove('slide-in-right');
        this.volumePanel.classList.add('slide-out-right');
      }, 2000);
    };

    this.volumePanel.onmouseleave = () => {
      // When user stop hovering the volume panel, restart the timeout
      setHideTimeout();
    };

    // Manage hover effects on mobile
    this.volumePanel.ontouchend = () => {
      setHideTimeout();
    };

    // Toggle volume panel
    if (this.volumePanel.classList.contains('slide-out-right')) {
      this.volumePanel.classList.remove('slide-out-right');
      this.volumePanel.classList.add('slide-in-right');

      // If user is not hovering the panel, set timeout
      if (!this.timeoutId) {
        setHideTimeout();
      }
    } else {
      this.volumePanel.classList.remove('slide-in-right');
      this.volumePanel.classList.add('slide-out-right');

      // Cancel timeout is user is closing the panel
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }

  setActiveClass(clickedBtn, buttonClass, parentClass) {
    // Get the parent container of the clicked button
    const container = clickedBtn.closest(parentClass);

    // Get all buttons with the specified class within the container
    const buttons = container.querySelectorAll(buttonClass);

    // Remove active class from all buttons within the container
    buttons.forEach((button) => {
      button.classList.remove('active');
    });

    // Add active class to the clicked button
    clickedBtn.classList.add('active');
  }
}
