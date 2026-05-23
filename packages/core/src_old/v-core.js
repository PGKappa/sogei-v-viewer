import utils, {GETParam, temporaryDisableCSSAnimations} from './v-utils';

import Api from './v-api';

import {decrementCountdown, getCurrentSceneId} from './v-scene-manager';
import GameOptions, {data, webfontConfig, sceneDelegates} from './options';

import "./components/styles/main.scss";

let countdownInterval;

let firstRunTime = true,
  isFullMode = parseInt(GETParam('full')) == 1,
  audioActived = parseInt(GETParam('audio')) == 1,
  isMuted = !audioActived;

function initialize(options) {
  data.global = {
    isFullMode: () => isFullMode,
    isAudioActived: () => audioActived,
    isMuted: () => isMuted,
    isFirstRunTime: () => firstRunTime,
    isHostReachable: Api.isHostReachable
  };

  Api.config({
    endPoint: window.endpoint,
    monitorId: options.monitorId,
    macAddress: options.macAddress,
    gameIdGetter: () => data.statics.gameid,
    channelIdGetter: () => data.statics.channel,
    nextEventIdGetter: () => data.nextEvent.id
  });

  Api.requestGameInit((res) => {
    data.storeGameInitializationData(res);
    cycle();
  });

}

function cycle() {
  Api.requestEventInfo((res) => {
    data.storeEventData(res);
    GameOptions.initializeScenes();

    currentSceneDelegate();
    countdownInterval = setInterval(countdownIntervalListener, 1000);
  }, () => {});
}

function countdownIntervalListener() {
  currentSceneDelegate();
  if (decrementCountdown() <= 0) {
    _onCycleComplete();
  }
}

function _onCycleComplete() {
  clearInterval(countdownInterval);
  cycle();
}

function currentSceneDelegate() {
  var sceneId = getCurrentSceneId();
  if (sceneId) {
    sceneDelegates[sceneId]();
  }
}

function launch() {
  if (isFullMode) {
    document.body.classList.add("full");
  } else {
    document.body.classList.add("embedded");
  }

  initialize({monitorId: GETParam('monitor'), macAddress: GETParam('macaddress')});

  window.addEventListener("message", function(e) {
    let shouldDisableCSSAnimations = false;
    if (e.data == 'full') {
      document.body.classList.remove("embedded");
      document.body.classList.add("full");
      shouldDisableCSSAnimations = true;
    } else if (e.data == 'embedded') {
      document.body.classList.remove("full");
      document.body.classList.add("embedded");
      shouldDisableCSSAnimations = true;
    } else if (e.data == 'mute') {
      isMuted = true;
    } else if (e.data == 'unmute') {
      isMuted = false;
    }

    console.log("window.onmessage: ", e);
    if (shouldDisableCSSAnimations) {
      temporaryDisableCSSAnimations();
    }
  });

};

window.WebFontConfig = Object.assign({}, webfontConfig, {
    active: function() {
    console.log("ACTIVE");
    if (webfontConfig.active) {
      webfontConfig.active();
    }
    launch();
  },
  inactive: function() {
    console.log("INACTIVE");
    if (webfontConfig.inactive) {
      webfontConfig.inactive();
    }
    launch();
  },
  fontinactive: function(familyName, fvd) {
    console.warn(familyName, fvd);
    if (webfontConfig.fontinactive) {
      webfontConfig.fontinactive();
    }
  }
});

const wf = document.createElement("script");
wf.src = "./lib/webfont.js";
wf.type = "text/javascript";
wf.async = "true";
const s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(wf, s);

window.addEventListener("resize", function(e) {
  temporaryDisableCSSAnimations();
  console.log("onresize", e);
});
