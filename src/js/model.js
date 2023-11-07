import Timer from 'easytimer.js';
import * as config from './config';

export const state = {
  sound: true,
  ambiance: 'muted',
  isSessionActive: false,
  currentAudio: null,
  audioVolume: config.audioConfig.defaultAudioVolume,
  sessionDurationHour: config.TIMER_HOUR,
  sessionDurationMin: config.TIMER_MIN,
  sessionDurationSec: config.TIMER_SEC,
  currentState: '',
  timer: new Timer(),
  alertEndTimer: new Audio(config.audioConfig.soundAlertUrl),
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
    state.sessionDurationMin = sessionDuration;
    console.log(`Current session duration : ${state.sessionDurationMin}`);
  },

  setIsSessionActive(current) {
    state.isSessionActive = current;
  },

  setGlobalVolume(newVolume) {
    state.audioVolume = newVolume;

    if (!state.currentAudio) return;

    state.currentAudio.volume = newVolume;
  },

  // Set current sound volume (slider)
  setAmbianceVolume(newVolumeEvent) {
    const newVolume = newVolumeEvent.target.value / 100;
    console.log(newVolume);
    methods.setGlobalVolume(newVolume);
  },

  getAmbiance() {
    return state.ambiance;
  },

  getTimer() {
    return state.timer;
  },

  getSessionDuration() {
    return state.sessionDurationMin;
  },

  getIsSessionActive() {
    return state.isSessionActive;
  },

  stopTimer() {
    state.timer.stop();
  },

  startTimer(callbacks) {
    const { timer } = state;

    timer.start({
      countdown: true,
      startValues: {
        minutes: state.sessionDurationMin,
        seconds: state.sessionDurationSec,
      },
    });

    state.timer.addEventListener('secondsUpdated', callbacks.onUpdate);
    state.timer.addEventListener('targetAchieved', callbacks.onFinish);

    return timer;
  },

  restartTimer() {
    // check if there is an active session
    if (!this.getIsSessionActive()) return console.log('session not started');
    state.timer.stop();
    state.timer.start({
      countdown: true,
      startValues: { minutes: state.sessionDurationMin },
    });
    console.log(
      `Timer restarted with session duration : ${state.sessionDurationMin}`
    );
  },

  isSoundAllowedToPlay() {
    if (state.ambiance === 'muted') {
      console.log('Not allowed, sound is muted');
      return false;
    }

    return true;
  },

  stopAudio() {
    if (!state.currentAudio)
      return console.log('No audio set, nothing to stop');

    try {
      state.currentAudio.pause();
      state.currentAudio.currentTime = 0;
    } catch (error) {
      console.error('Failed to stop audio:', error);
      return 'Failed to stop audio';
    }
  },

  loadAudio() {
    // check if sound is muted
    if (!this.isSoundAllowedToPlay()) return;
    state.currentAudio = new Audio(
      `${config.audioConfig.audioUrl}${state.ambiance}${config.audioConfig.extension}`
    );

    // Set the current user volume (default 0.5)
    state.currentAudio.volume = state.audioVolume;

    // Init loop
    state.currentAudio.loop = true;

    return state.currentAudio;
  },

  playAlertSound() {
    state.alertEndTimer.play();
  },

  async playAudio() {
    if (!state.currentAudio) return console.log('No audio set');
    if (!this.isSoundAllowedToPlay()) return;

    try {
      await state.currentAudio.play();
    } catch (error) {
      console.error('Failed to play audio:', error);
      return 'Failed to play audio';
    }
  },
};
