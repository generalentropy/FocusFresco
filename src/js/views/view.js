import { MAIN_TIMER_FOCUS_MIN, MAIN_TIMER_PAUSE_MIN } from "../config";
import Timer from "easytimer.js";

class View {
  sessionState = false;
  currentAmbiance = "mute";
  currentAudio = null;
  timer = new Timer();
  divTimer = document.querySelector(".timer");
  startButton = document.querySelector(".start-button");
  pauseButton = document.querySelector(".pause-button");
  resetButton = document.querySelector(".reset-button");
  timerInfo = document.querySelector(".timer-info");
  ambianceIcons = document.querySelectorAll(".ambiance");
  ambianceIconsContainer = document.querySelector(".container");
  mainStartSessionBtn = document.querySelector(".main-session-button");
  btnsContainer = document.querySelector(".buttons-container");
  btnMuted = document.querySelector(".ambiance-5");

  addhandlerStartTimer(handler) {
    this.startButton.addEventListener("click", () => handler());
  }

  addhandlerPauseTimer(handler) {
    this.pauseButton.addEventListener("click", () => handler());
  }

  addhandlerResetTimer(handler) {
    this.resetButton.addEventListener("click", () => handler());
  }

  addhandlerListenAmbianceClick(handler) {
    handler();
  }

  startPomodoro() {
    this.startSession();
    this.sessionState = true;

    if (this.timer.isRunning()) return;
    if (!this.timer.isPaused())
      this.divTimer.textContent = `00:${MAIN_TIMER_FOCUS_MIN}:00`;

    this.resumeAmbianceAudio();

    this.timer.start({
      countdown: true,
      startValues: { minutes: MAIN_TIMER_FOCUS_MIN },
    });

    this.timer.addEventListener(
      "secondsUpdated",
      this.updateDisplay.bind(this)
    );
    this.timer.addEventListener(
      "targetAchieved",
      this.pomodoroFinished.bind(this)
    );
  }

  startSession() {
    this.mainStartSessionBtn.addEventListener("click", () => {
      this.startPomodoro();

      this.btnsContainer.classList.remove("displaynone");
      if (this.currentAmbiance === "mute") {
        this.btnMuted.classList.add("active");
      }
      if (this.currentAmbiance !== "mute")
        this.loadAmbianceAudio(this.currentAmbiance);
    });
  }

  updateDisplay() {
    const time = this.timer.getTimeValues().toString();
    this.divTimer.textContent = time;
  }

  pomodoroFinished() {
    this.timerInfo.textContent = "Session finished";
  }

  pausePomodoro() {
    this.timer.pause();
    if (this.currentAudio === null) return;
    this.currentAudio.pause();
  }

  resetPomodoro() {
    this.divTimer.textContent = this.timer.reset();
    this.divTimer.textContent = `00:${MAIN_TIMER_FOCUS_MIN}:00`;
    this.stopAmbianceAudio();
    this.loadAmbianceAudio(this.currentAmbiance);
  }

  removeAllActive() {
    this.ambianceIcons.forEach((e) => e.classList.remove("active"));
  }

  updateAmbianceState(ambianceValue) {
    this.currentAmbiance = ambianceValue;
    console.log(`currentAmbiance updated to: ${this.currentAmbiance}`);
  }

  ambianceIconsAddActive(handler) {
    this.ambianceIconsContainer.addEventListener("click", (e) => {
      const clickedIcon = e.target.closest(".ambiance");
      if (!clickedIcon) return;
      this.removeAllActive();
      clickedIcon.classList.add("active");
      const ambianceValue = clickedIcon.dataset.ambiance;

      this.updateAmbianceState(ambianceValue);
      console.log(ambianceValue);

      if (!this.sessionState || this.timer.isPaused()) return;
      if (this.sessionState) {
        console.log("Audio is playing");
        this.stopAmbianceAudio();
        this.loadAmbianceAudio(this.currentAmbiance);
      }
    });
  }

  loadAmbianceAudio(ambiance) {
    if (ambiance === "muted") return "muted";

    // Stop the currently playing audio (if any) before playing a new one.
    if (this.currentAudio) {
      this.pauseAmbianceAudio();
      this.currentAudio.currentTime = 0;
    }
    // https://assets.visualartisan.fr/focusfresco/storm.mp3
    this.currentAudio = new Audio(
      `https://assets.visualartisan.fr/focusfresco/${ambiance}.mp3`
    );
    this.currentAudio.play();
  }

  stopAmbianceAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0; // Set audio time to the beginning.
      this.currentAudio = null; // Reset the current audio.
    }
  }

  pauseAmbianceAudio() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }
  }

  resumeAmbianceAudio() {
    console.log(this.currentAudio);
    if (this.currentAudio && this.currentAudio.paused) {
      const url = this.currentAudio.src;
      const fileName = url.substring(
        url.lastIndexOf("/") + 1,
        url.lastIndexOf(".mp3")
      );
      console.log("current playing url :", fileName);
      console.log(this.currentAmbiance);
      this.currentAudio.play();
    }

    // Si l'utilisateur a changé d'ambiance sonore pendant que la pause est active
  }

  isAudioPlaying(currentAudio) {
    return (
      !this.currentAudio.paused &&
      this.currentAudio.currentTime > 0 &&
      !this.currentAudio.ended
    );
  }
}

export default new View();
