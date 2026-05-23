import React, {useState, useEffect, useRef, Fragment} from 'react';
import "./VideoPage.scss";
import TrackAnimation from "../../TrackAnimation/old_TrackAnimation.jsx";
import ReplayAnimation from "../../ReplayAnimation/ReplayAnimation.jsx";
import Multiplier from "../../Multiplier/Multiplier.jsx";

import ReactPlayer from 'react-player/file';


const VideoPage = ({
  dict,
  channel,
  trackName,
  previousEvent,
  nextEvent,
  video,
  videoTime,
  metadata,
  global,
  multiEnabled,
  showTagReal
}) => {
  const {isFullMode, isAudioMuted = _ => true, mode = {}} = global;
  const { HIDE_EVENT_TIME = false, HIDE_CHANNEL = false, SHOW_PARTNER_LOGO = false} = mode;
  const isMuted = isAudioMuted();
  const {palimpsestId, eventId, odds, startTime, racerNames, arrival, multi} = previousEvent;
  const playerRef = useRef(null),
    [isVideoStarted, setVideoStarted] = useState(false),
    [videoCurrentTime, setVideoCurrentTime] = useState(videoTime),
    [videoSynced, setVideoSynced] = useState(false);

  const showVideoAndTracks = isVideoStarted && videoSynced;

  const gameName = !showTagReal ? ((dict.main_header.full_game_name || "").toUpperCase()) : dict.main_header.game_name;  

  useEffect(() => {
    if (!videoSynced) {
      if (videoTime > 0) {
        if (playerRef) {
          const playerEl = playerRef.current;
          if (playerEl && playerEl.seekTo) {
              try {
                playerEl.seekTo(parseFloat(videoTime), 'seconds');
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
    }
  }, []);

  return (<section className="page videoSection">
    <div className="headSection header">
      {SHOW_PARTNER_LOGO && <div className="partner-logo"></div>}
      <div className="headTextContainer">
        <p className="current-event-desc">{dict.page_video.race_desc}</p>
        {
        !!!HIDE_EVENT_TIME && <React.Fragment>
            <p className="event-starttime">{dict.page_video.time_desc + " "}{startTime}</p>
          </React.Fragment>
        }        
        <p className="event-pal-code pal2">
          {" " + dict.page_video.pal_desc}
          {palimpsestId}
          {" "}- {" " + dict.page_video.code_desc}
          {eventId}
        </p>

        {multiEnabled && <Multiplier value={multi} enableAppearAnimation={(
            multi !== "1"
            ? true
            : false)}/>
        }
      </div>
    </div>

    <div className={"mainSection " + (
        !showVideoAndTracks
        ? ' loading'
        : '')}>
      <div className={"player-wrapper" + (
          !showVideoAndTracks
          ? ' loading'
          : '')}>
        <ReactPlayer onStart={() => {
            setVideoStarted(true);
          }} ref={playerRef} onProgress={({playedSeconds}) => {
            setVideoCurrentTime(playedSeconds);
          }} onSeek={e => {
            console.warn(e);
            setVideoSynced(true);
          }}
          className="react-player" url={video} width="100%" height="100%" playing={true} playsinline={true} muted={isMuted}
          // > added for mockups
          // playing={false}
          //
          playing={!videoSynced}
          />
      </div>
      {
        showVideoAndTracks && <Fragment>
            <TrackAnimation odds={odds} names={racerNames} dict={dict} metadata={metadata} videoCurrentTime={videoCurrentTime}/>
            <ReplayAnimation odds={odds} arrival={arrival} names={racerNames} dict={dict} metadata={metadata} videoCurrentTime={videoCurrentTime}/>
          </Fragment>
      }
    </div>

    <div className="footerSection">
      <div className="left">
        <div className="game-icon-wrapper"></div>
        <p className="game-name">{gameName}{showTagReal && <span className="tag-real empty">{dict.main_header.tag_real}</span>}</p>
        {!!!HIDE_CHANNEL && <p className="channel-name">{channel}</p>}
        <p className="event-name">{trackName}</p>
      </div>

      <div className="right">
        <p className="nextEvent">{dict.page_video.next_race_desc}</p>

        {
          !!!HIDE_EVENT_TIME &&
          <p className="nextEventTime">{dict.page_video.time_desc + " "} {nextEvent.startTime}</p>
        }   
        <p className="nextEventCode">
          {" " + dict.page_video.pal_desc}
          {nextEvent.palimpsestId}
          {" "}- {" " + dict.page_video.code_desc}
          {nextEvent.eventId}
        </p>

        <p className="next-event-countdown">{nextEvent.countdown}</p>
      </div>
    </div>
  </section>);
}

export default VideoPage;
