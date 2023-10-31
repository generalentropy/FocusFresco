import Timer from "easytimer.js";
import * as config from "./config";

export const state = {
  sound: true,
  ambiance: "muted",
  isSessionActive: false,
  currentAudio: null,
  sessionDuration: "25",
  currentState: "",
  timer: new Timer(),
};

export const methods = {
  setAmbiance(ambiance) {
    state.ambiance = ambiance;
    console.log(`Current ambiance : ${state.ambiance}`);
  },

  setGlobalState(currentState) {
    state.currentState = currentState;
    console.log(`Current state : ${state.currentState}`);
  },

  setSessionDuration(sessionDuration) {
    state.sessionDuration = sessionDuration;
    console.log(`Current session duration : ${state.sessionDuration}`);
  },

  setIsSessionActive(current) {
    state.isSessionActive = current;
  },

  getTimer() {
    return state.timer;
  },

  getSessionDuration() {
    return state.sessionDuration;
  },

  getIsSessionActive() {
    return state.isSessionActive;
  },

  stopTimer() {
    state.timer.stop();
  },

  startTimer() {
    const timer = state.timer;

    timer.start({
      countdown: true,
      startValues: { minutes: state.sessionDuration },
    });

    return timer;
  },

  restartTimer() {
    // check if there is an active session
    if (!this.getIsSessionActive()) return console.log("session not started");
    state.timer.stop();
    state.timer.start({
      countdown: true,
      startValues: { minutes: state.sessionDuration },
    });
    console.log(
      `Timer restarted with session duration : ${state.sessionDuration}`
    );
  },

  isSoundAllowedToPlay() {
    if (state.ambiance === "muted") {
      console.log("Not allowed, sound is muted");
      return false;
    }

    return true;
  },

  stopAudio() {
    if (!state.currentAudio)
      return console.log("No audio set, nothing to stop");

    try {
      state.currentAudio.pause();
      state.currentAudio.currentTime = 0;
    } catch (error) {
      console.error("Failed to stop audio:", error);
      return "Failed to stop audio";
    }
  },

  loadAudio() {
    // check if sound is muted
    if (!this.isSoundAllowedToPlay()) return;
    state.currentAudio = new Audio(
      `${config.audioConfig.audioUrl}${state.ambiance}${config.audioConfig.extension}`
    );

    // Init loop
    state.currentAudio.loop = true;

    return state.currentAudio;
  },

  async playAudio() {
    if (!state.currentAudio) return console.log("No audio set");
    if (!this.isSoundAllowedToPlay()) return;

    try {
      await state.currentAudio.play();
    } catch (error) {
      console.error("Failed to play audio:", error);
      return "Failed to play audio";
    }
  },
};
