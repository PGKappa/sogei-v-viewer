import {storage} from '.';

let options = {};
export default {
  initializePages: () => options.initializePages(),
  pageDelegates: () => options.pageDelegates
};

export function config(opt) {
  options.initializePages = opt.initializePages;
  options.pageDelegates = opt.pageDelegates;
  // console.warn(options);
};

function getPageIdOfREC(currentTime, l, r) {
  
  if (r >= l) {
    var mid = parseInt(l + (r - l) / 2);
    var currentPage = storage.pages[mid];
    if (currentPage.start >= currentTime && currentPage.end <= currentTime) {
      return currentPage.id;
    }
    if (currentPage.start > currentTime)
      return getPageIdOfREC(currentTime, mid + 1, r);

    return getPageIdOfREC(currentTime, l, mid - 1);
  }

  return undefined;
};

export function getPageIdOf(currentTime) {
  if (currentTime < 0)
    return undefined;
  return getPageIdOfREC(currentTime, 0, storage.pages.length);
};

function getCurrentPageId() {
  // console.log("getCurrentPageId");
  return getPageIdOf(storage.countdown);
};

export function currentPageDelegate() {
  var pageId = getCurrentPageId();
  if (pageId) {
    options.pageDelegates[pageId]();
  }
}

export function decrementCountdown() {
  var msElapsed = (new Date().getTime()) - storage.timeCountdownWasSet;
  var secElapsed = parseInt((msElapsed) / 1000);

  storage.countdown = storage.event.current.since - secElapsed;
  return storage.countdown;
};
