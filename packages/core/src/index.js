import api from "./v-api";
import { GETParam, temporaryDisableCSSAnimations } from "./v-utils";
import pm, {
  config as configPM,
  currentPageDelegate,
  decrementCountdown,
} from "./v-page-manager";
import WebFont from "webfontloader";

const RECONNECT_DELAY = 3500;
let numberOfCycles = 0;

let storage = null,
  countdownInterval = null,
  params = {
    HIDE_EVENT_TIME:
      parseInt(GETParam("hide_event_time") || 0) == 1 ||
      window.v_param__hide_event_time,
    SHOW_PARTNER_LOGO:
      parseInt(GETParam("show_partner_logo") || 0) == 1 ||
      window.v_param__show_partner_logo,
    FULL: parseInt(GETParam("full") || 0) == 1 || window.v_param__full,
    AUDIO: parseInt(GETParam("audio") || 0) == 1 || window.v_param__audio,
    GUI_MODE: GETParam("gui_mode") || window.v_param__gui_mode || "light",
    GUI_LAYOUT_VERSION:
      GETParam("gui_layout_version") ||
      window.v_param__gui_layout_version ||
      "latest",
    INIT_CODE: GETParam("init_code") || window.v_param__init_code,
    CHANNEL_ID: GETParam("channel_id") || window.v_param__channel_id,
    OPERATOR: GETParam("operator") || window.v_param__operator,
    HIDE_CHANNEL:
      parseInt(GETParam("hide_channel") || 0) == 1 ||
      window.v_param__hide_channel ||
      false,
  },
  mode = {
    ...params,
    FIRST_RUNTIME: true,
  };

export function config(options) {
  // console.log("config()", options)

  storage = Object.assign(
    options.storage || {},
    {
      event: {
        next: {
          int_palimpsest_id: "",
          int_event_id: "",
          ext_palimpsest_id: "",
          ext_event_id: "",
        },
      },
      global: {
        mode: mode,
        version: window.version,
        isFullMode: () => mode.FULL,
        isAudioActived: () => mode.AUDIO,
        isAudioMuted: () => !mode.AUDIO,
        isFirstRuntime: () => mode.FIRST_RUNTIME,
        isHostReacheable: () => api.isHostReacheable(),
      },
    },
    options.storage
  );

  (options.getParams || []).forEach((x) => (storage.global[x] = GETParam(x)));

  configPM({
    initializePages: options.initializePages,
    pageDelegates: options.pageDelegates,
  });

  storage.webfontConfig = options.webfontConfig;
}

export function loadWebFont(opt = {}) {
  WebFont.load(
    Object.assign({}, storage.webfontConfig, {
      active: function () {
        console.log("ACTIVE");
        if (storage.webfontConfig.active) {
          storage.webfontConfig.active();
        }
        opt.active && opt.active();
      },
      inactive: function () {
        console.log("INACTIVE");
        if (storage.webfontConfig.inactive) {
          storage.webfontConfig.inactive();
        }
        opt.inactive && opt.inactive();
      },
      fontinactive: function (familyName, fvd) {
        // console.warn(familyName, fvd);
        if (storage.webfontConfig.fontinactive) {
          storage.webfontConfig.fontinactive();
        }
        opt.fontinactive && opt.fontinactive();
      },
    })
  );
}

export function init() {
  loadWebFont({
    active: completeInitialization,
    inactive: completeInitialization,
    fontinactive: completeInitialization,
  });
}

function completeInitialization() {
  // console.log("completeInitialization()");
  const api_endpoint = window.endpoint,
    // * initCode
    // - previous macaddress
    initCode = params.INIT_CODE,
    // * monitor_id
    // - retail only;
    // - optional param for web.
    monitor = GETParam("monitor") || window.monitor,
    channelId = params.CHANNEL_ID,
    operatorId = params.OPERATOR,
    controllerId = GETParam("controller_id") || window.controller_id;
  console.log("CONTROLLER ID", controllerId);
  api.config({
    endPoint: window.endpoint,
    //monitorId: monitorId,
    initCode: initCode,
    //channelIdGetter: () => storage.statics.channel.id,
    channelId: channelId,
    monitor: monitor,
    operatorId: operatorId,
    controllerId: controllerId,
    nextPalimpsestIdGetter: () => storage.event.next.int_palimpsest_id,
    nextEventIdGetter: () => storage.event.next.int_event_id,
    nextExtPalimpsestIdGetter: () => storage.event.next.ext_palimpsest_id,
    nextExtEventIdGetter: () => storage.event.next.ext_event_id,
  });

  api.requestInit({
    onSuccess: (initData) => {
      storage.storeInitializationData(initData);
      cycle();
    },
    onError: (error) => {
      setTimeout(completeInitialization, RECONNECT_DELAY);
    },
  });

  document.body.classList.add(params.FULL ? "full" : "embedded");

  if (params.SHOW_PARTNER_LOGO)
    document.body.classList.add("show-partner-logo");

  window.addEventListener("message", function (e) {
    let shouldDisableCSSAnimations = false;
    if (e.data == "full") {
      document.body.classList.remove("embedded");
      document.body.classList.add("full");
      shouldDisableCSSAnimations = true;
    } else if (e.data == "embedded") {
      document.body.classList.remove("full");
      document.body.classList.add("embedded");
      shouldDisableCSSAnimations = true;
    } else if (e.data == "mute") {
      mode.AUDIO = false;
    } else if (e.data == "unmute") {
      mode.AUDIO = true;
    }

    // console.log("window.onmessage: ", e);
    if (shouldDisableCSSAnimations) {
      temporaryDisableCSSAnimations();
    }
  });

  window.addEventListener("resize", function (e) {
    temporaryDisableCSSAnimations();
    // console.log("onresize", e);
  });
}

function cycle() {
//  console.log("cycle");
  api.requestEventInfo({
    onSuccess: (res) => {
      numberOfCycles++;
      storage.storeEventInfoData(res);
    //  console.log("after storage.storeEventInfoData", pm.initializePages);
      pm.initializePages();
    //  console.log("pm.initializePages");
      currentPageDelegate();
      countdownInterval = setInterval(countdownIntervalListener, 1000);
    },
    onError: (error) => {
      console.warn(error);
      setTimeout(() => {
        cycle();
      }, 8000);
    },
  });
}

function countdownIntervalListener() {
  const newCountdown = decrementCountdown();
  currentPageDelegate();
  if (newCountdown <= 0) {
    onCycleComplete();
  }
}

function onCycleComplete() {
  clearInterval(countdownInterval);
  cycle();
}

export function getNumOfGameCycles() {
  return numberOfCycles;
}

export { storage, params };
