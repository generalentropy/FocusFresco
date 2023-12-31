import controlView from './views/controlView';
import * as model from './model.js';
import audioView from './views/audioView.js';

/* TODO

 [x] keep volume constan across app
 [x] Bouton mute
 [ ] Audio pause button
 [ ] Buttons active

*/

const ambianceChange = (ambiance) => {
  // Set the current ambiance
  model.methods.setAmbiance(ambiance);
  // Stop current audio
  model.methods.stopAudio();
  //  Load audio
  model.methods.loadAudio();
  //  Play audio
  model.methods.playAudio();
};

// Set current state
const stateChange = (state) => {
  model.methods.setGlobalState(state);
};

// Set timer duration
const timerChange = (sessionDuration) => {
  model.methods.setSessionDuration(sessionDuration);
};

// Start main timer
const startTimer = () => {
  const callbacks = {
    onUpdate: () => {},
    onFinish: model.methods.playAlertSound,
  };

  // Initializes timer
  const timer = model.methods.startTimer(callbacks);
  // Passing object timer to the view
  controlView.addHandlerStartTimer(timer);
  // Fix 1sec delay
  controlView.fixStartDelay(model.state);
  // Set session to active
  model.methods.setIsSessionActive(true);
  // Display timer control buttons
  controlView.displayControlbuttons();
  // Hide and clean information texts
  // controlView.cleanInfosDivs();
};

// Pause timer
const pauseTimer = () => {
  if (model.methods.getTimer().isPaused()) return;
  console.log('pause');
  model.methods.getTimer().pause();
};

// Reset timer
const resetTimer = () => {
  console.log('Reset');
  controlView.fixStartDelay(model.state);
  model.methods.getTimer().reset();
};

// Resume timer
const resumeTimer = () => {
  //  countdown: true : if not, timer start in chrono mode
  model.methods.getTimer().start({
    countdown: true,
  });
  console.log('resume timer');
};

// Restart timer with selected session duration
const restartTimer = () => {
  if (!model.state.isSessionActive) return;
  controlView.fixStartDelay(model.state);
  model.methods.restartTimer(model.state.sessionDurationMin);
};

// prettier-ignore
const init = function () {
  controlView.addHandlerOpenAbout(controlView.openAbout.bind(controlView));
  controlView.addHandlerCloseAbout(controlView.closeAbout.bind(controlView));
  controlView.addHandlerOpenSettings(controlView.openSettings.bind(controlView));
  controlView.addHandlerCloseSettings(controlView.closeSettings.bind(controlView));
  controlView.addHandlerToggleVolume(controlView.toggleVolumePanel.bind(controlView));
  controlView.adHandlerSetTimerDuration(timerChange, restartTimer);
  controlView.adHandlerSetAmbiance(ambianceChange);
  controlView.addHandlersetGlobalState(stateChange);
  controlView.addHandlerStartSession(startTimer);
  controlView.addHandlerPauseTimer(pauseTimer);
  controlView.addHandlerResetTimer(resetTimer);
  controlView.addHandlerResumeTimer(resumeTimer);
  audioView.addHandlerVolumeChange(model.methods.setAmbianceVolume);
  audioView.addHandlerMute(model.methods.muteVolume)
};

init();
