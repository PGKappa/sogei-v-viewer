import data from "../../data";
import pages from "./pages";
import webfontConfig from "../../webfontconfig";
import { pageDelegates } from "./lifecycle";

export { data };
export { pages };
export { webfontConfig };
export { pageDelegates };

const GameOptions = {
  data,
  pages,
  webfontConfig,
  initializePages,
  pageDelegates,
};
export default GameOptions;

export function initializePages() {
  const statics = data.statics,
    videoStart = statics.game_total_duration,
    videoEnd = videoStart - data.event.previous.video.duration,
    resultStart = videoEnd - 1,
    resultEnd = resultStart - statics.page_results_duration;

  if (data.event.previous.isVoid) {
    data.pages = [
      {
        id: pages.ERROR,
        start: videoStart,
        end: videoStart - statics.page_error_duration,
      },
    ];
  } else {
    data.pages = [
      {
        id: pages.VIDEO,
        start: videoStart,
        end: videoEnd,
      },
      {
        id: pages.RESULTS,
        start: resultStart,
        end: resultEnd,
      },
    ];
  }

  var leftTime = data.pages[data.pages.length - 1].end;

  var flag = true,
    cycle = [
      {
        id: pages.MAIN,
        duration: statics.page_main_duration,
      },
      {
        id: pages.TRIFECTA,
        duration: statics.page_trifecta_duration,
      },
    ];

  while (leftTime > 1) {
    var idx = flag ? 0 : 1;
    leftTime--;
    var start = leftTime;
    leftTime -= cycle[idx].duration;
    //var end = ( leftTime > 0 ? leftTime : 1 );
    var end = leftTime > 1 ? leftTime : 0;
    data.pages.push({ id: cycle[idx].id, start: start, end: end });
    flag = !flag;
  }
}
