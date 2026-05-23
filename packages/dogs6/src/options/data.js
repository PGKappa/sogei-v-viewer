const data = {
  global: {
    mode: {},
  },
  error: null,
  countdown: NaN,
  pages: [],
  statics: {},
  event: {
    next: {
      int_palimpsest_id: "",
      int_event_id: "",
      ext_palimpsest_id: "",
      ext_event_id: "",
    },
    current: {
      int_palimpsest_id: "",
      int_event_id: "",
      ext_palimpsest_id: "",
      ext_event_id: "",
      since: "",
    },
    previous: {
      results: "",
      odds: "",
    },
    previousChannelResults: {
      results: "",
    },
  },
  storeInitializationData,
  storeEventInfoData,
};
export default data;

export function storeInitializationData(v) {
  document.body.classList.remove("dogs");
  document.body.classList.remove("harness");
  document.body.classList.remove("horses");
  document.body.classList.add(v.game_statics.game_name);
  let g = v.game_statics;
 // console.log("DATA ARRIVED", v);
  data.statics = {
    game_total_duration: v.game_statics.game_total_duration || 240,
    page_main_duration: v.game_statics.page_main_duration || 20,
    page_trifecta_duration: v.game_statics.page_trifecta_duration || 10,
    page_results_duration: v.game_statics.page_results_duration || 15,
    page_error_duration: v.game_statics.page_error_duration || 20,
    gameId: v.game_statics.game_id,
    channel: {
      id: v.game_statics.channel_id,
      name: (v.game_statics.channel_name || "").toUpperCase(),
      track_name: v.game_statics.channel_track_name,
    },

    dict: v.game_statics.dict,

    jackpotMode: v.jackpotmode,
    multiplierEnabled: (function () {
      try {
        return JSON.parse(
          String(v.game_statics.multiplier_enabled || "false").toLowerCase()
        );
      } catch (ex) {}
      return false;
    })(),
  };
  data.event = {
    next: {
      int_palimpsest_id: v.next_event.int_pal_id,
      int_event_id: v.next_event.int_event_id,
      gameName: v.game_statics.gameName,
    },
  };
}

// NOTES
// - don't forget to read the slidingText from dict.
// - removed videoURL from init request
/*
export function storeGameInitializationData(v) {
  let g = v.game;

  data.statics = {
    game_total_duration: g.game_total_duration || 240,
    page_main_duration: g.page_main_duration || 20,
    page_trifecta_duration: g.page_trifecta_duration || 10,
    page_results_duration: g.page_trifecta_duration || 15,
    gameid: g.gameid,
    channel: g.channel,
    videoURL: g.videoURL,
    dict: v.dict,
    jackpotMode: v.jackpotmode,
    slidingText: v.txt.bottom_scroll
  };
  data.nextEvent.id = g.nextgameid;
};
*/

export function storeEventInfoData(v) {
 // console.log("storeEventInfoData", v);
  document.body.classList.remove("dogs");
  document.body.classList.remove("harness");
  document.body.classList.remove("horses");
  document.body.classList.add(v.current.game_name);

  data.statics = {
    ...data.statics,
    previousChannel: {
      id: v.previous.game_statics.channel_id,
      name: (v.previous.game_statics.channel_name || "").toUpperCase(),
      track_name: v.previous.game_statics.channel_track_name,
    },
    previousDict: v.previous.game_statics.dict,
  };

//  console.log("STATICS:",data.statics);
  data.statics.channel.track_name = v.game_statics.channel_track_name;

  console.log("data.v: ", v);
   if (v.current.since > 900) {
     /* refresh se il since è maggiore di 15 minuti */
     setTimeout(() => {
       window.location.reload();
     }, 180000);
   }
  data.statics.game_total_duration = v.current.game_duration;

  (data.statics.dict = v.game_statics.dict),
    (data.event = {
      current: {
        posizione: v.current.posizione,
        gameId: v.game_statics.game_id,
        channel: {
          id: v.game_statics.channel_id,
          name: (v.game_statics.channel_name || "").toUpperCase(),
          track_name: v.game_statics.channel_track_name,
        },
        dict: v.game_statics.dict,
        int_palimpsest_id: v.current.int_pal_id,
        int_event_id: v.current.int_event_id,
        ext_palimpsest_id: v.current.ext_pal_id,
        ext_event_id: v.current.ext_event_id,
        since: v.current.since,
        racers: (v.current.racers || []).map((x) => ({
          ...x,
          name: x.name.toUpperCase(),
        })),
        odds: v.current.odds,
        start_time: v.current.start_time,
        latecomers: v.current.latecomers,
        gameName: v.current.game_name,
      },
      ...(v.previous && {
        previous: {
          posizione: v.previous.posizione,
          gameName: v.previous.game_name,
          palimpsestId: v.previous.ext_pal_id,
          eventId: v.previous.ext_event_id,
          isVoid: v.previous.is_void,
          ...(!v.previous.is_void && {
            racers: (v.previous.racers || []).map((x) => ({
              ...x,
              name: x.name.toUpperCase(),
            })),
            results: (v.previous.results || []).map((r) => ({
              ...r,
              arrival: (r.arrival || []).map((a) => ({
                ...a,
                name: a.name.toUpperCase(),
              })),
            })),
            odds: v.previous.odds,
            multi: v.previous.multi,
            ...(v.previous.video
              ? {
                  video: {
                    src: v.previous.video.src,
                    metadata: v.previous.video.metadata,
                    duration: v.previous.video.duration,
                  },
                }
              : {
                  video: {
                    duration: 120,
                  },
                }),
          }),
        },
      }),
      ...(v.next && {
        next: {
          posizione: v.next.posizione,
          int_palimpsest_id: v.next.int_pal_id,
          int_event_id: v.next.int_event_id,
          ext_palimpsest_id: v.next.ext_pal_id,
          ext_event_id: v.next.ext_event_id,
        },
      }),
      ...(v.previous_channel_result && {
        previousChannelResults: v.previous_channel_result,
      }),
    });

  data.timeCountdownWasSet = +new Date();
  //data.timeCountdownWasSet = new Date().getTime();
  console.log("data.event.current.since: ", data.event.current.since);
  data.countdown = data.event.current.since;

  const trifectaOdds = data.event.current.odds["trifecta"];

  const sortedTrifectaOdds = [];
  Object.keys(trifectaOdds).forEach(function (first) {
    Object.keys(trifectaOdds[first]).forEach(function (second) {
      Object.keys(trifectaOdds[first][second]).forEach(function (third) {
        // console.log("first: ", first, "second:", second, "third:", third);
        sortedTrifectaOdds.push({
          racers: [first, second, third],
          odds: trifectaOdds[first][second][third],
        });
      });
    });
  });

  data.event.current.sortedTrifectaOdds = sortedTrifectaOdds;
  var sortedTrifectaOddsByValue = Object.values(sortedTrifectaOdds)
    .sort(function (b, a) {
      return b.odds - a.odds;
    })
    .map(function (x) {
      return x.odds;
    });

  data.event.current.sortedTrifectaOddsByValue = sortedTrifectaOddsByValue;

  const exactaOdds = data.event.current.odds["exacta"];
  var sortedExactaOdds = [];
  // var t0 = performance.now();
  Object.keys(exactaOdds).forEach(function (first) {
    Object.keys(exactaOdds[first]).forEach(function (second) {
      //console.log(first + "-" + second);
      sortedExactaOdds.push({
        racers: [first, second],
        odds: exactaOdds[first][second],
      });
    });
  });
  // var t0 = performance.now();
  data.event.current.sortedExactaOdds = sortedExactaOdds;

  var sortedExactaOddsByValue = Object.values(sortedExactaOdds)
    .sort((a, b) => a.odds - b.odds)
    .map((x) => x.odds);
  data.event.current.sortedExactaOddsByValue = sortedExactaOddsByValue;

  const boxedTrifectaOdds = data.event.current.odds["boxedtrifecta"];
  var sortedBoxedTrifectaOdds = [];

  Object.keys(boxedTrifectaOdds).forEach((first) => {
    const firstNode = boxedTrifectaOdds[first];
    Object.keys(firstNode).forEach((second) => {
      const secondNode = firstNode[second];
      Object.keys(secondNode).forEach((third) => {
        const thirdNode = secondNode[third];
        sortedBoxedTrifectaOdds.push({
          racers: [first, second, third],
          odds: thirdNode,
        });
      });
    });
  });

  data.event.current.sortedBoxedTrifectaOdds = sortedBoxedTrifectaOdds;

  var sortedBoxedTrifectaOddsByValue = Object.values(sortedBoxedTrifectaOdds)
    .sort((a, b) => a.odds - b.odds)
    .map((x) => x.odds);
  data.event.current.sortedBoxedTrifectaOddsByValue =
    sortedBoxedTrifectaOddsByValue;

//  console.log("data after storeEventData", data);
}
/*
export function storeEventData(v) {
  let i = v.info,
    o = v.odd,
    p = v.prev;
  data.nextEvent.id = i.nextGameId;
  data.nextEvent.currentId = i.gameId;
  data.nextEvent.time = i.gameTime;
  data.nextEvent.since = i.gameSince;

  data.nextEvent.racers = v.racers;
  data.nextEvent.odds = o;

  //data.timeCountdownWasSet = +new Date();
  data.timeCountdownWasSet = new Date().getTime();

  data.lastResultsData = p.results.map(function(lastResultData) {
    lastResultData.event = lastResultData.id;
    lastResultData.arrival = lastResultData.arrivo.split('-').map(function(number, idx) {
      return {
        number: number,
        name: lastResultData.names[idx + 1]
      }
    });

    return lastResultData;
  });

  data.lateComersData = {};
  Object.keys(v.latecomers).forEach(function(marketKey) {
    data.lateComersData[marketKey] = {
      racers: v.latecomers[marketKey].latecomer.toString().split('-'),
      delay: v.latecomers[marketKey].value
    };
  });

  // NAMES MUST BE TAKEN FROM DB IN DEBUG MODE
  let prevResult = data.lastResultsData[0];

  data.prev = {
    event: prevResult.event,
    names: p.racers,
    time: prevResult.time,
    video: p.video,
    video_duration: p.video_duration || 50,
    multi: p.multi,
    metadata: p.metadata,
    arrival: {
      racers: prevResult.arrival.map(function(dogData) {
        return dogData.name
        //return names[mockupNameIdxs[winnerIdxs[mockupWinnerIdx] - 1]]
      }),
      numbers: prevResult.arrival.map(function(dogData) {
        return dogData.number
        //return winnerIdxs[mockupWinnerIdx]
      })
    },
    odds: p.odd
  };

  data.countdown = i.gameSince;

};
*/
