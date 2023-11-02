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

  addHandlerOpenAbout(handler) {
    this.openAboutModalBtn.addEventListener("click", handler);
  }

  addHandlerCloseAbout(handler) {
    this.closeAboutModalBtn.addEventListener("click", handler);
  }

  openAbout() {
    this.modalAbout.style.display = "flex";
  }
  closeAbout() {
    this.modalAbout.style.display = "none";
  }

  displayNone(...divs) {
    divs.forEach((div) => (div.style.display = "none"));
  }

  visibilityHidden(...divs) {
    divs.forEach((div) => (div.style.visibility = "hidden"));
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
