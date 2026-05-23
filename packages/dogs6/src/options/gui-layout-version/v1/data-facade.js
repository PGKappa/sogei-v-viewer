import data from "../../data";
import pages from "./pages";

const oraInizioGiorno = window.v_param_pal_start;
const oraFineGiorno = window.v_param_pal_end;

export function getErrorPageOptions() {
  return {
    cmd: "go-page",
    page: pages.ERROR,
    data: {},
  };
}

function getCountdownCallback() {
  const decreasedCountdown = data.countdown - 1;
  return {
    text: decreasedCountdown.toString().toMMSS(),
    percentage: 100 - parseInt((5 * decreasedCountdown) / 12),
  };
}

export function getVideoPageOptions() {
 // console.log('VerificaDATAvideo',data);
  return {
    cmd: "go-page",
    page: pages.VIDEO,
    data: {
      inizioGiorno:
        data.event.current.posizione == "P" ? true : false,
      gameName: data.event.previous.gameName,
      fineGiorno:
        data.event.previous.posizione == "U" ? true
          : false,
      global: data.global,
      countdown: data.countdown.toString().toMMSS(),
      multiEnabled: data.statics.multiplierEnabled,
      channel: data.statics.previousChannel.name,
      trackName: data.statics.previousChannel.track_name,
      dict: data.statics.previousDict,
      video: data.event.previous.video.src,
      //video: "http://xpegma.eu/webm/" + prev.video,
      metadata: data.event.previous.video.metadata,
      videoTime: data.statics.game_total_duration - data.countdown,
      // !!! multi: prev.multi,
      previousEvent: {
        arrival: data.event.previous.results[0].arrival,
        palimpsestId: data.event.previous.results[0].ext_pal_id,
        eventId: data.event.previous.results[0].ext_event_id,
        startTime: data.event.previous.results[0].start_time,
        odds: data.event.previous.odds,
        multi: data.event.previous.multi || 1,
        racerNames: data.event.previous.racers
          .sort((a, b) =>
            a.number > b.number ? 1 : b.number > a.number ? -1 : 0
          )
          .map((x) => x.name),
      },
      nextEvent: {
        palimpsestId: data.event.current.ext_palimpsest_id,
        eventId: data.event.current.ext_event_id,
        countdown: data.countdown,
        startTime: data.event.current.start_time,
      },
    },
  };
}

export function getResultPageOptions() {
 // console.log('VerificaDATAResult',data);
  //console.log("RESULT PAGE: getResultPageOptions", data);
  const countdownText = data.countdown.toString().toMMSS();

  const previousResultData = data.event.previous.results[0];
  let slidingText = "";

  if (data.event.current.posizione == "U") {
    setTimeout(function () {
      window.location.reload();
    }, 600000);
  }

  if (data) {
    if (data.statics) {
      if (data.statics.dict) {
        if (data.statics.dict.main_footer) {
          slidingText = (
            data.statics.dict.main_footer.sliding_text || ""
          );
        }
      }
    }
  }

  return {
    cmd: "go-page",
    page: pages.RESULTS,
    data: {
      inizioGiorno:
        data.event.current.posizione == "P" ? true : false,
     
      fineGiorno:
      data.event.current.posizione == "U" ? true
          : false,
      gameName: data.event.previous.gameName,
      global: data.global,
      multiEnabled: data.statics.multiplierEnabled,
      countdown: countdownText,
      channel: data.statics.previousChannel.name,
      trackName: data.statics.previousChannel.track_name,
      dict: data.statics.previousDict,
      previousEvent: {
        palimpsestId: previousResultData.ext_pal_id,
        eventId: previousResultData.ext_event_id,
        startTime: previousResultData.start_time,
        arrival: previousResultData.arrival,
        odds: data.event.previous.odds,
        multi: data.event.previous.multi || 1,
      },
      nextEvent: {
        palimpsestId: data.event.current.ext_palimpsest_id,
        eventId: data.event.current.ext_event_id,
        countdown: data.countdown,
        startTime: data.event.current.start_time,
      },
      slidingText: slidingText,
      animateFooter: false,
    },
  };
}

export function getMainPageOptions() {
 // console.log('VerificaDATAMain',data);
  //let statics = data.statics;
  //nextEvent = data.nextvent;
  const countdownText = data.countdown.toString().toMMSS();
  let slidingText = "";

  if (data) {
    if (data.statics) {
      if (data.statics.dict) {
        if (data.statics.dict.main_footer) {
          slidingText = (
            data.statics.dict.main_footer.sliding_text || ""
          );
        }
      }
    }
  }

  return {
    cmd: "go-page",
    page: pages.MAIN,
    data: {
      global: data.global,
      inizioGiorno: data.event.current.posizione == "P" ? true : false,

      fineGiorno: data.event.current.posizione == "U" ? true : false,
      countdown: countdownText,
      getCountdown: getCountdownCallback,
      channel: data.statics.channel.name,
      trackName: data.statics.channel.track_name,
      dict: data.statics.dict,
      palimpsestId: data.event.current.ext_palimpsest_id,
      eventId: data.event.current.ext_event_id,
      gameName: data.event.current.gameName,
      racers: data.event.current.racers,
      startTime: data.event.current.start_time,
      odds: data.event.current.odds,
      latecomersData: data.event.current.latecomers,
      lastResultsData: data.event.previousChannelResults,
      slidingText: slidingText,
      historyColumnDelay: (data.statics.page_main_duration * 1000) / 2,
      switchTabDelay: (data.statics.page_main_duration * 1000) / 2,
      headerVersion: "v1",
      footerVersion: "v1",
      version: VERSION,
    },
  };
}

export function getTrifectaPageOptions() {
  //console.log("TRIFECTA PROPS", data);
  const countdownText = data.countdown.toString().toMMSS();
  const sortedTrifectaOdds = data.event.current.sortedTrifectaOdds;
  const sortedTrifectaOddsByValue =
    data.event.current.sortedTrifectaOddsByValue;

  let slidingText = "";
  if (data) {
    if (data.statics) {
      if (data.statics.dict) {
        if (data.statics.dict.main_footer) {
          slidingText = (
            data.statics.dict.main_footer.sliding_text || ""
          );
        }
      }
    }
  }

  return {
    cmd: "go-page",
    page: pages.TRIFECTA,
    data: {
      global: data.global,
      inizioGiorno: data.event.current.posizione == "P" ? true : false,

      fineGiorno: data.event.current.posizione == "U" ? true : false,
      countdown: countdownText,
      getCountdown: getCountdownCallback,
      channel: data.statics.channel.name,
      trackName: data.statics.channel.track_name,
      dict: data.statics.dict,
      palimpsestId: data.event.current.ext_palimpsest_id,
      eventId: data.event.current.ext_event_id,
      racers: data.event.current.racers,
      gameName: data.event.current.gameName,
      startTime: data.event.current.start_time,
      odds: data.event.current.odds,
      sortedTrifectaOdds: sortedTrifectaOdds,
      sortedTrifectaOddsByValue: sortedTrifectaOddsByValue,
      latecomersData: data.event.current.latecomers,
      lastResultsData: data.event.previousChannelResults,
      slidingText: slidingText,
      switchTabDelay: (data.statics.page_main_duration * 1000) / 2,
      headerVersion: "v1",
      footerVersion: "v1",
      version: VERSION,
    },
  };
}

export function getCountdownPageOptions() {
  return {
    cmd: "go-page",
    page: pages.COUNTDOWN,
    data: {},
  };
}
