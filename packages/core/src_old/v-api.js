//( function(){
export let timeout = 3000;
export let monitorId;
export let macAddress;
export let endPoint;
export let gameIdGetter;
export let channelIdGetter;
export let nextEventIdGetter;
export let nextPalimpsestIdGetter;
export let shopid = '1011';

let retryTimeout;

function handleEvent(e) {
  console.warn(`${e.type}: ${e.loaded} bytes transferred\n`);
}

export function isHostReachable(callback) {

  // Handle IE and more capable browsers
  var xhr = new XMLHttpRequest();
  console.log(window.location.hostname);
  // Open new request as a HEAD to the root hostname with a random param to bust the cache
  xhr.open("HEAD", "http://" + window.location.hostname + "/?rand=" + Math.floor((1 + Math.random()) * 0x10000), true);
  //xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
  //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

  // Issue request and handle response
  try {
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        console.log("reachable xhr.readyState = 4 && xhr.status:", xhr.status);
        const isReachable = (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304));
        xhr = null;
        callback(isReachable);
      }
    }, false);
    xhr.send();
    console.log("reachable xhr.status:", xhr.status);

  } catch (error) {
    console.warn("reachable error: ", error);
    xhr = null;
    callback(false);
  }

}

function asyncGet(url, callback, errorCallback) {
  if (retryTimeout) {
    clearTimeout(retryTimeout);
    retryTimeout = undefined;
  }

  if (navigator && navigator.onLine) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.ontimeout = function(e) {
      if (errorCallback) {
        errorCallback();
      }
    };

    xmlHttp.addEventListener('loadstart', handleEvent);
    xmlHttp.addEventListener('load', handleEvent);
    xmlHttp.addEventListener('loadend', handleEvent);
    xmlHttp.addEventListener('progress', handleEvent);
    xmlHttp.addEventListener('error', handleEvent);
    xmlHttp.addEventListener('abort', handleEvent);

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4) {
        console.warn(xmlHttp.responseText);
        if (xmlHttp.status == 200) {
          const response = xmlHttp.responseText;
          xmlHttp = null;
          callback(response);
        } else {
          xmlHttp = null;
          retryTimeout = setTimeout(function() {
            //console.log( url );
            retryTimeout = null;
            asyncGet(url, callback, errorCallback)
          }, 1000);
          if (errorCallback) {
            errorCallback();
          }
        }
      }
    }

    console.warn(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.timeout = timeout;
    xmlHttp.send(null);
  } else if (undefined === retryTimeout) {
    // TO DO:
    // a callback should be invoked for this exception
    retryTimeout = setTimeout(function() {
      retryTimeout = null;
      asyncGet(url, callback, errorCallback);
    }, 1000);

    if (errorCallback) {
      errorCallback();
    }
  }

};

const Api = {
  setGameIdGetter,
  gameIdGetter,
  setNextEventIdGetter,
  nextEventIdGetter,

  requestGameInit,
  requestEventInfo,
  isHostReachable,
  monitorId,
  macAddress,
  endPoint,
  timeout,
  config
}
export default Api;
