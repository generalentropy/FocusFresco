import controlView from "./views/controlView";
import audioView from "./views/audioView";
import * as model from "./model.js";

// Set state.ambiance
const handleAmbianceChange = (ambiance) => {
  model.methods.setAmbiance(ambiance);

  // Stop current audio
  model.methods.stopAudio();
  //  Load audio
  model.methods.loadAudio();
  //  Play audio
  model.methods.playAudio();
};

// Set current state
const handleStateChange = (state) => {
  model.methods.setGlobalState(state);
};

// Set timer duration
const handleTimerChange = (sessionDuration) => {
  model.methods.setSessionDuration(sessionDuration);
};

// Start main timer
const handlerStartTimer = () => {
  // Initializes timer
  const timer = model.methods.startTimer();
  // Passing object timer to the view / which set up its own view-related event
  controlView.addHandlerStartTimer(timer);
  // Fix 1sec delay
  controlView.fixStartDelay(model.state.sessionDuration);
  // Set sesstion to active
  model.methods.setIsSessionActive(true);
  // Display control buttons
  controlView.displayControlbuttons();
};

// Pause timer
const handlePauseTimer = () => {
  if (model.methods.getTimer().isPaused()) return;
  console.log("pause");
  model.methods.getTimer().pause();
};

// Reset timer
const handleResetTimer = () => {
  console.log("Reset");
  controlView.fixStartDelay(model.state.sessionDuration);
  model.methods.getTimer().reset();
};

// Restart timer with selected session duration
const handleRestartTimer = () => {
  if (!model.state.isSessionActive) return;
  controlView.fixStartDelay(model.state.sessionDuration);
  model.methods.restartTimer(model.state.sessionDuration);
};

// prettier-ignore
const init = function () {
  controlView.addHandlerOpenAbout(controlView.openAbout.bind(controlView));
  controlView.addHandlerCloseAbout(controlView.closeAbout.bind(controlView));
  controlView.adHandlerSetTimerDuration(handleTimerChange, handleRestartTimer);
  controlView.adHandlerSetAmbiance(handleAmbianceChange);
  controlView.addHandlersetGlobalState(handleStateChange)
  controlView.addHandlerStartSession(handlerStartTimer)
  controlView.addHandlerPauseTimer(handlePauseTimer);
  controlView.addHandlerResetTimer(handleResetTimer);
  
 
 
};

init();
