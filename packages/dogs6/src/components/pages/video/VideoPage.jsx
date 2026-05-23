import React, { useState, useEffect, useMemo, useRef, Fragment } from "react";
import "./VideoPage.scss";
import TrackAnimation from "../../TrackAnimation/TrackAnimation.jsx";
import ReplayAnimation from "../../ReplayAnimation/ReplayAnimation.jsx";
import Multiplier from "../../Multiplier/Multiplier.jsx";

import ReactPlayer from "react-player/file";

const VideoPage = ({
  dict,
  inizioGiorno,
  fineGiorno,
  channel,
  trackName,
  previousEvent,
  nextEvent,
  video,
  videoTime,
  metadata,
  global,
  multiEnabled = false,
  showTagReal = false,
}) => {
  const { isFullMode, isAudioMuted = (_) => true, mode = {} } = global;
  const {
    HIDE_EVENT_TIME = false,
    HIDE_CHANNEL = false,
    SHOW_PARTNER_LOGO = true,
  } = mode;
  const isMuted = isAudioMuted();
  const {
    palimpsestId,
    eventId,
    odds,
    startTime,
    racerNames,
    arrival,
    multi = 1,
  } = previousEvent;

  const playerRef = useRef(null),
    [isVideoStarted, setVideoStarted] = useState(false),
    [videoCurrentTime, setVideoCurrentTime] = useState(videoTime),
    [videoSynced, setVideoSynced] = useState(false);

  const r = useMemo(() => {
    if (!dict)
      return {
        mainHeaderTagRealText: "",
        gameNameText: "",
        raceDescText: "",
        timeDescText: "",
        palDescText: "",
        codeDescText: "",
        nextRaceDescText: "",
      };

    let mainHeaderTagRealText = "",
      raceDescText = "",
      timeDescText = "",
      palDescText = "",
      codeDescText = "",
      nextRaceDescText = "",
      gameNameText = "";

    if (dict.main_header) {
      mainHeaderTagRealText = dict.main_header.tag_real;
      gameNameText = !showTagReal
        ? (dict.main_header.full_game_name || "").toUpperCase()
        : dict.main_header.game_name;
    }

    if (dict.page_video) {
      raceDescText = dict.page_video.race_desc;
      timeDescText = dict.page_video.time_desc;
      palDescText = dict.page_video.pal_desc;
      codeDescText = dict.page_video.code_desc;
      nextRaceDescText = dict.page_video.next_race_desc;
    }

    return {
      mainHeaderTagRealText: mainHeaderTagRealText,
      gameNameText: gameNameText,
      raceDescText: raceDescText,
      timeDescText: timeDescText,
      palDescText: palDescText,
      codeDescText: codeDescText,
      nextRaceDescText: nextRaceDescText,
    };
  }, [dict]);

  const tagReal = r.mainHeaderTagRealText,
    shouldShowTagReal = showTagReal && tagReal,
    gameName = r.gameNameText;

 // const showVideoAndTracks = isVideoStarted && videoSynced;
  const showVideoAndTracks = true;

  useEffect(() => {

   console.log("Inizio Giorno ", inizioGiorno);
   // console.log("Fine Giorno ", fineGiorno);
   

    if (!videoSynced) {
      if (videoTime > 0) {
        if (playerRef) {
          const playerEl = playerRef.current;
          if (playerEl && playerEl.seekTo) {
            try {
              playerEl.seekTo(  parseFloat((videoTime-2)>0?(videoTime-2):videoTime) , "seconds");
            } catch (error) {
              console.warn(error);
              setVideoSynced(true);
            }
          }
        }
      } else {
        setVideoSynced(true);
      }
    }

    return () => {
      setVideoStarted(false);
      setVideoSynced(false);
    };
  }, []);

  return (
    <>
      {" "}
      {!inizioGiorno && !fineGiorno && (
        <section className="page videoSection">
          {
            <div
              style={{
                position: "absolute",
                top: 105,
                left: 0,
                width: "100%",
                zIndex: 999999,
                color: "white",
              }}
              className="partner-logo"
            >
              {" "}
            </div>
          }

          {
            <Fragment>
              {" "}
              <p
                style={{
                  position: "absolute",
                  textShadow: "3px 3px #333",
                  fontSize: 45,
                  top: 70,
                  right: 30,
                  zIndex: 999999,
                  color: "white",
                }}
                className="event-starttime"
              >
                {channel == "CH1" && <div className="cani-logo"></div>}
                {channel == "CH2" && <div className="cavalli-logo"></div>}
              </p>{" "}
            </Fragment>
          }

          <div className="headSection header">
            {/* SHOW_PARTNER_LOGO && <div className="partner-logo"></div> **/}
            <div className="headTextContainer">
              <p className="current-event-desc">{r.raceDescText}</p>
              {!!!HIDE_EVENT_TIME && (
                <Fragment>
                  <p className="event-starttime">
                    {r.timeDescText + " "}
                    {startTime}
                  </p>
                </Fragment>
              )}
              <p className="event-pal-code">
                {" " + r.palDescText + " "}
                {palimpsestId} - {" " + r.codeDescText + " "}
                {eventId}
              </p>

              {multiEnabled && (
                <Multiplier value={multi} enableAppearAnimation={false} />
              )}
            </div>
          </div>

          <div
            className={"mainSection " + (!showVideoAndTracks ? " loading" : "")}
          >
            <div
              className={
                "player-wrapper" + (!showVideoAndTracks ? " loading" : "")
              }
            >
              <ReactPlayer
                onStart={() => {
                  setVideoStarted(true);
                }}
                ref={playerRef}
                onProgress={({ playedSeconds }) => {
                  setVideoCurrentTime(playedSeconds);
                }}
                onSeek={(e) => {
                  console.warn(e);
                  setVideoSynced(true);
                }}
                className="react-player"
                url={video}
                width="100%"
                height="100%"
                playing={true}
                playsinline={true}
                muted={isMuted}
              />
            </div>
              <Fragment>
                <TrackAnimation
                  odds={odds}
                  names={racerNames}
                  dict={dict}
                  metadata={metadata}
                  videoCurrentTime={videoCurrentTime}
                  channel={channel}
                />
                <ReplayAnimation
                  odds={odds}
                  arrival={arrival}
                  channel={channel}
                  names={racerNames}
                  dict={dict}
                  metadata={metadata}
                  videoCurrentTime={videoCurrentTime}
                />
              </Fragment>
          </div>

          <div className="footerSection">
            <div className="left">
              <div className="game-icon-wrapper"></div>
              <p className="game-name">
                {gameName}
                {shouldShowTagReal && (
                  <span className="tag-real empty">{tagReal}</span>
                )}
              </p>
              {!!!HIDE_CHANNEL && false && (
                <p className="channel-name">{channel}</p>
              )}
              <p className="event-name">{trackName}</p>
            </div>

            <div className="right">
              <p className="nextEvent">{r.nextRaceDescText}</p>

              {!!!HIDE_EVENT_TIME && (
                <p className="nextEventTime">
                  {r.timeDescText + " "} {nextEvent.startTime}
                </p>
              )}
              <p className="nextEventCode">
                {" " + r.palDescText + " "}
                {nextEvent.palimpsestId} - {" " + r.codeDescText + " "}
                {nextEvent.eventId}
              </p>

              <p className="next-event-countdown">{nextEvent.countdown}</p>
            </div>
          </div>
        </section>
      )}{" "}
    </>
  );
};

export default VideoPage;
