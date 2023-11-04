import View from "./view";
import { TIMER_MIN, TIMER_SEC, PAUSE_MIN, PAUSE_SEC } from "../config";
import * as model from "../model";

class controlView extends View {
  // Set model.state.currentState
  addHandlersetGlobalState(handler) {
    this.btnsContainer.addEventListener("click", (e) => {
      const btnControlClicked = e.target.closest(".button");

      if (!btnControlClicked) return;
      const currentState = btnControlClicked.dataset.state;
      handler(currentState);
    });
  }

  addHandlerStartSession(handler) {
    this.mainStartSessionBtn.addEventListener("click", handler);
  }

  // prettier-ignore
  addHandlerStartTimer(timerObject) {
  
    // Attach events handler to object timer
    timerObject.addEventListener("secondsUpdated", () => this.updateDisplay(timerObject));
    timerObject.addEventListener("targetAchieved", () => this.pomodoroFinished(timerObject));

    console.log('Timer started');
   }

  addHandlerResumeTimer(handler) {
    this.btnStart.addEventListener("click", handler);
  }

  updateDisplay(timerObject) {
    const currentTime = timerObject.getTimeValues().toString();
    this.divTimer.textContent = currentTime;
  }

  pomodoroFinished(timerObject) {
    console.log("Timer finished");
  }

  addHandlerPauseTimer(handler) {
    this.btnPause.addEventListener("click", () => {
      handler();
    });
  }

  addHandlerResetTimer(handler) {
    this.btnReset.addEventListener("click", () => {
      handler();
    });
  }

  // Attach event listener for setting timer duration and resetting
  adHandlerSetTimerDuration(handler, reset) {
    this.btnsDuration.addEventListener("click", (e) => {
      this.handleSetTimerDuration(e, handler);
      this.handleResetTimer(reset);
    });
  }

  // Individual handler method for setting timer duration
  handleSetTimerDuration(e, handler) {
    const btnDurationClicked = e.target.closest(".btn-duration");
    if (!btnDurationClicked) return;

    const duration = btnDurationClicked.dataset.duration;

    this.setActiveClass(
      btnDurationClicked,
      ".btn-duration",
      ".btn-duration-container"
    );

    // Set state.sessionDuration with current duration
    handler(duration);
  }

  // Individual reset method
  handleResetTimer(reset) {
    reset();
  }

  fixStartDelay(state) {
    const hours = state.sessionDurationHour;
    const mins = state.sessionDurationMin;
    const secs = state.sessionDurationSec;
    this.divTimer.textContent = `${hours}:${mins}:${secs}`;
  }

  displayControlbuttons() {
    this.btnsContainer.classList.remove("displaynone");
  }

  // cleanInfosDivs() {
  //   this.displayNone(this.durationTitle);
  //   this.visibilityHidden(this.ambianceTitle);
  // }

  adHandlerSetAmbiance(handler) {
    this.ambianceBtnsContainer.addEventListener("click", (e) => {
      const btnAmbianceClicked = e.target.closest(".ambiance");

      if (!btnAmbianceClicked) return;

      const ambiance = btnAmbianceClicked.dataset.ambiance;

      this.setActiveClass(
        btnAmbianceClicked,
        ".ambiance",
        ".ambiance-container"
      );

      // Set state.ambiance with current ambiance
      handler(ambiance);
    });
  }
}

export default new controlView();
