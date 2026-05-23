import React, { Fragment, useEffect, useMemo } from 'react';

import HeaderCountdown from "./Countdown/HeaderCountdown.jsx";

const Header = ({
  showTagReal,
  dict,
  palimpsestId,
  eventId, channel, startTime, getCountdown,
  trackName = "",
  global = {} }) => {
  const { mode = {} } = global;
  const { HIDE_EVENT_TIME = false, HIDE_CHANNEL = false } = mode;

  const r = useMemo(() => {
    if (!dict) return {
      nextRaceDescText: '',
      nextRaceTimeDescText: '',
      nextRacePalDescText: '',
      nextRaceCodeDescText: '',
      gameNameText: '',
    };

    let nextRaceDescText = '',
        nextRaceTimeDescText = '',
        nextRacePalDescText = '',
        nextRaceCodeDescText = '',
        gameNameText = '';

      if (dict.main_header) {
        nextRaceDescText = dict.main_header.next_race_desc;
        nextRaceTimeDescText = dict.main_header.next_race_time_desc;
        nextRacePalDescText = dict.main_header.next_race_pal_desc;
        nextRaceCodeDescText = dict.main_header.next_race_code_desc;
        gameNameText = !showTagReal ? ((dict.main_header.full_game_name || "").toUpperCase()) : dict.main_header.game_name;
      }

      return {
        nextRaceDescText: nextRaceDescText,
        nextRaceTimeDescText: nextRaceTimeDescText,
        nextRacePalDescText: nextRacePalDescText,
        nextRaceCodeDescText: nextRaceCodeDescText,
        gameNameText: gameNameText
      };

  }, [dict]);

  const tagReal = dict.main_header.tag_real,
    shouldShowTagReal = showTagReal && tagReal,
    gameName = r.gameNameText;


  useEffect(() => {
    document.body.classList.add('header-v1');
    return () => {
      document.body.classList.remove('header-v1');
    }
  }, []);

  return (<section id="header" className="v1">
    <div className="primary">
      <div className="partner-logo"></div>
    </div>

    <div className="secondary">
      <div className="left">
        <div className="game-details">
          <div className="game-icon-wrapper"></div>
          <p className="game-name">{gameName} {!!!HIDE_CHANNEL && channel}</p>
          <p className="event-name pal2">{trackName}</p>
        </div>

        <div className="event-details">
          <span className="next-event-desc">{r.nextRaceDescText}</span>
          {
            !!!mode.HIDE_EVENT_TIME && <Fragment>
              <span className="next-event-time-desc">{r.nextRaceTimeDescText}</span>
              <span className="next-event-time">{startTime}</span>
            </Fragment>
          }
          <p className="pal-and-code pal2">{r.nextRacePalDescText} {" "} {palimpsestId} - {r.nextRaceCodeDescText} {" "} {eventId}</p>

        </div>
      </div>
      <div className="right">
        <HeaderCountdown getCountdown={getCountdown} />
      </div>
    </div>
  </section>)
};
export default Header;
