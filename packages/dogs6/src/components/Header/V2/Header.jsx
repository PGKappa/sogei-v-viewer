import React, { Fragment, useMemo } from 'react';

import "./Header.scss";
import HeaderCountdown from "./Countdown/HeaderCountdown.jsx";

const Header = ({
  trackName,
  showNextEventDescription = true,
  dict,
  palimpsestId,
  eventId,
  channel,
  startTime,
  getCountdown,
  showCountdown = true,
  global = {},
  showTagReal = false,
  showPartnerLogo = true
}) => {
  const { mode = {} } = global;
  const { HIDE_EVENT_TIME = false, HIDE_CHANNEL = false, SHOW_PARTNER_LOGO = false } = mode;
  const shouldShowPartnerLogo = showPartnerLogo && SHOW_PARTNER_LOGO;

  const r = useMemo(() => {
    if (!dict) return {
      nextRaceDescText: '',
      nextRaceTimeDescText: '',
      nextRacePalDescText: '',
      nextRaceCodeDescText: '',
      mainHeaderTagRealText: '',
      gameNameText: '',
    }

    let nextRaceDescText = '',
        nextRaceTimeDescText = '',
        nextRacePalDescText = '',
        nextRaceCodeDescText = '',
        mainHeaderTagRealText = '',
        gameNameText = '';

      if (dict.main_header) {
        nextRaceDescText = dict.main_header.next_race_desc;
        nextRaceTimeDescText = dict.main_header.next_race_time_desc;
        nextRacePalDescText = dict.main_header.next_race_pal_desc;
        nextRaceCodeDescText = dict.main_header.next_race_code_desc;
        mainHeaderTagRealText = dict.main_header.tag_real;
        gameNameText = !showTagReal ? ((dict.main_header.full_game_name || "").toUpperCase()) : dict.main_header.game_name;
      }

      return {
        nextRaceDescText: nextRaceDescText,
        nextRaceTimeDescText: nextRaceTimeDescText,
        nextRacePalDescText: nextRacePalDescText,
        nextRaceCodeDescText: nextRaceCodeDescText,
        mainHeaderTagRealText: mainHeaderTagRealText,
        gameNameText: gameNameText
      };
  }, [dict]);
  const tagReal = r.mainHeaderTagRealText,
    shouldShowTagReal = showTagReal && tagReal,
    gameName = r.gameNameText;


  return (<section id="header-v2">
    {shouldShowPartnerLogo && <div className="primary trasparenza">
      <div className="partner-logo-header"></div>
    </div>}

    <div className="secondary">
      <div className={"left " + (!showCountdown ? 'full' : '')}>
        <div className="game-details">
          <div className="primary">
            <div className="game-icon-wrapper"></div>
            <p className="game-name">{gameName}{shouldShowTagReal && <span className="tag-real empty">{tagReal}</span>}</p>
            {!!!HIDE_CHANNEL && false && <p className="channel-name">{channel}</p>}
          </div>
          <div className="secondary">
            <p className="event-name pal2">{trackName}</p>
          </div>
        </div>

        <div className="event-details">
          <p className="row1">
            {showNextEventDescription && <span className="next-event-desc">{r.nextRaceDescText}</span>}
            {
              !!!HIDE_EVENT_TIME && <Fragment>
                <span className="next-event-time-desc">{r.nextRaceTimeDescText}</span>
                <span className="next-event-time">{startTime}</span>
              </Fragment>
            }
          </p>

          <p className="pal-and-code pal2">{r.nextRacePalDescText} {" "} {palimpsestId} - {r.nextRaceCodeDescText} {" "} {eventId}</p>

        </div>
      </div>
      {
        showCountdown && <div className="right">
          <HeaderCountdown getCountdown={getCountdown} />
        </div>
      }

    </div>
  </section>)
};
export default Header;