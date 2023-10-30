import view from "./views/view";
import * as model from "./model.js";

const init = function () {
  view.addhandlerStartTimer(view.startPomodoro.bind(view));
  view.addhandlerPauseTimer(view.pausePomodoro.bind(view));
  view.addhandlerResetTimer(view.resetPomodoro.bind(view));
  view.addhandlerListenAmbianceClick(view.ambianceIconsAddActive.bind(view));
  view.startSession();
};

init();

// Récupération des éléments
const modal = document.querySelector(".modal-wrapper");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

// Ouverture de la modale
openModalBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

// Fermeture de la modale
closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Fermeture de la modale en cliquant en dehors
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
