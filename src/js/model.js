import Timer from "easytimer.js";

export const state = {
  sound: true,
  ambiance: "mute",
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

    // timer.addEventListener("secondsUpdated", callbacks.onUpdate);
    // timer.addEventListener("targetAchieved", callbacks.onFinish);

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
};
