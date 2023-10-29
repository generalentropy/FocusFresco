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
