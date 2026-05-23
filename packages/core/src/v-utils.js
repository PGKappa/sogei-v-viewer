export function GETParam(parameterName) {
  var result = null,
    tmp = [];
  location.search.substr(1).split("&").forEach(function(item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName)
      result = decodeURIComponent(tmp[1]);
    }
  );

  return result;
}

String.prototype.toMMSS = function() {
  var sec_num = parseInt(this, 10);
  if  (sec_num < 0) {
    return '00:00';
  }
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  //if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ':' + seconds;
}


export function temporaryDisableCSSAnimations() {
  if (document) {
    if (document.body) {
      if (document.body.classList) {
        if (document.body.classList.add) {
          document.body.classList.add("notransition");
        }
        if (document.body.classList.remove) {
          setTimeout(() => {
            document.body.classList.remove("notransition");
          }, 500);
        }
      }
    }
  }
}
