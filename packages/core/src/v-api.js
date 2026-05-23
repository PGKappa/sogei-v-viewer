const axios = require("axios");

axios.defaults.headers.common["UI-Type"] = "viewer";

const options = {
  endPoint: "",
  monitor: 1,
  channelId: 1,
  operatorId: "",
  nextPalimpsestIdGetter: () => "",
  nextEventIdGetter: () => "",
  platform: "web",
  controllerId: "",
};

export function requestInit(opt) {
  axios
    /* .post(
      `${options.endPoint}/init/viewer/${options.monitor}/${options.channelId}`
    ) */
    .post(`${options.endPoint}/init/viewer/${options.controllerId}`)
    .then((response) => {
      if (opt.onSuccess) {
        opt.onSuccess(response.data);
      }
    })
    .catch((error) => {
      if (opt.onError) {
        opt.onError(error);
      }
    });
}

export function requestEventInfo(opt) {
  axios
    .get(
      `${options.endPoint}/event/info/${
        options.monitor
      }/${options.nextPalimpsestIdGetter()}/${options.nextEventIdGetter()}`
    )
    .then((response) => {
      if (opt.onSuccess) {
        opt.onSuccess(response.data);
      }
    })
    .catch((error) => {
      if (opt.onError) {
        opt.onError(error);
      }
    });
}

export function config(opt) {
  Object.assign(options, opt);
  axios.defaults.headers.common["Authorization"] = `Bearer ${options.initCode}`;
  axios.defaults.headers.common["Operator"] = options.operatorId;
}

export function setNextEventIdGetter(v) {
  nextEventIdGetter = v;
}

export function isHostReachable(callback) {
  const params = {
    rand: Math.floor((1 + Math.random()) * 0x10000),
  };

  axios
    .head("/", {
      params: params,
    })
    .then((response) => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
    });
}

export default {
  requestInit,
  requestEventInfo,
  config,
  isHostReachable,
};
