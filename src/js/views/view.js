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
  volumeSlider = document.getElementById("volume-slider");

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
    // Ajoutez des gestionnaires d'événements pour mouseenter et mouseleave
    this.volumePanel.onmouseenter = () => {
      // L'utilisateur survole l'élément, annuler le timeout existant
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    };

    const setHideTimeout = () => {
      // Définir le timeout pour masquer le panneau après 2 secondes
      this.timeoutId = setTimeout(() => {
        this.volumePanel.classList.remove("slide-in-right");
        this.volumePanel.classList.add("slide-out-right");
      }, 2000);
    };

    this.volumePanel.onmouseleave = () => {
      // L'utilisateur ne survole plus l'élément, redéfinir le timeout
      setHideTimeout();
    };

    // Utilisez touchend pour gérer la fin d'un toucher sur les appareils mobiles
    this.volumePanel.ontouchend = () => {
      // L'utilisateur ne touche plus l'élément, redéfinir le timeout
      setHideTimeout();
    };

    // Toggle la visibilité du panneau
    if (this.volumePanel.classList.contains("slide-out-right")) {
      this.volumePanel.classList.remove("slide-out-right");
      this.volumePanel.classList.add("slide-in-right");

      // Si l'utilisateur ne survole pas déjà, définir le timeout
      if (!this.timeoutId) {
        setHideTimeout();
      }
    } else {
      this.volumePanel.classList.remove("slide-in-right");
      this.volumePanel.classList.add("slide-out-right");

      // Annuler le timeout car le panneau est en train de se fermer
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
      button.classList.remove("active");
    });

    // Add active class to the clicked button
    clickedBtn.classList.add("active");
  }
}
