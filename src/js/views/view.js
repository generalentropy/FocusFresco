export default class View {
  durationBtn = document.querySelector(".btn-duration");
  divTimer = document.querySelector(".timer");
  btnStart = document.querySelector(".start-button");
  btnPause = document.querySelector(".pause-button");
  btnReset = document.querySelector(".reset-button");
  timerInfo = document.querySelector(".timer-info");
  ambianceBtns = document.querySelectorAll(".ambiance");
  ambianceBtnsContainer = document.querySelector(".container");
  mainStartSessionBtn = document.querySelector(".main-session-button");
  btnsContainer = document.querySelector(".buttons-container");
  btnMuted = document.querySelector(".ambiance-5");
  modalAbout = document.querySelector(".modal-wrapper");
  openAboutModalBtn = document.getElementById("open-modal");
  closeAboutModalBtn = document.getElementById("close-modal");
  btnsDuration = document.querySelector(".btn-duration-container");
  ambianceTitle = document.querySelector(".ambiance-title");
  durationTitle = document.querySelector(".duration-title");
  settingsPanel = document.querySelector(".settings-wrapper");
  openSettingsBtn = document.getElementById("open-settings");
  closeSettingsBtn = document.getElementById("close-settings");
  toggleVolumeBtn = document.querySelector(".open-volume");
  volumePanel = document.querySelector(".volume-wrapper");

  addHandlerOpenAbout(handler) {
    this.openAboutModalBtn.addEventListener("click", handler);
  }

  addHandlerCloseAbout(handler) {
    this.closeAboutModalBtn.addEventListener("click", handler);
  }

  addHandlerOpenSettings(handler) {
    this.openSettingsBtn.addEventListener("click", handler);
  }

  addHandlerCloseSettings(handler) {
    this.closeSettingsBtn.addEventListener("click", handler);
  }

  addHandlerToggleVolume(handler) {
    this.toggleVolumeBtn.addEventListener("click", handler);
  }

  openAbout() {
    this.modalAbout.style.display = "flex";
  }
  closeAbout() {
    this.modalAbout.style.display = "none";
  }

  openSettings() {
    this.settingsPanel.style.display = "flex";
  }
  closeSettings() {
    this.settingsPanel.style.display = "none";
  }

  toggleVolumePanel() {
    this.volumePanel.classList.toggle("displaynone");

    this.toggleVolumeBtn.classList.toggle("background-toggle");
  }

  setActiveClass(clickedBtn, buttonClass, parentClass) {
    // Get the parent container of the clicked button
    const container = clickedBtn.closest(parentClass);

    // Get all buttons with the specified class within the container
    const buttons = container.querySelectorAll(buttonClass);

    // Remove active class from all buttons within the container
    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    // Add active class to the clicked button
    clickedBtn.classList.add("active");
  }
}
