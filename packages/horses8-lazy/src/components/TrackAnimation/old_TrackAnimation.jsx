import React, { useState, useRef, useEffect } from 'react';

import "./TrackAnimation.scss";
import RacerNumber from "../RacerNumber/RacerNumber.jsx";

const TrackAnimation = ({ dict, names, odds, metadata, videoCurrentTime }) => {
  const [started, setStarted] = useState(false);
  const [showIdx, setShowIdx] = useState(0);

  useEffect(() => {
    return () => {
      setStarted(false);
      setShowIdx(0);
    }
  }, []);

  const hasValidNames = names && Array.isArray(names),
    validMetadata = metadata && metadata.positions && metadata.positions.length > 3;

  const filteredMetadataPositions = validMetadata && metadata.positions.filter(x => x);

  const overtakings =
    validMetadata
      ? filteredMetadataPositions.slice(0, metadata.positions.length - 3)
      : [],
    replays =
      validMetadata
        ? filteredMetadataPositions.slice(overtakings.length)
        : [],
    metaPositions =
      validMetadata
        ? overtakings[showIdx]
        : [],
    metaRacers =
      (validMetadata && metaPositions.racers)
        ? metaPositions.racers
        : [],
    metaTs =
      (validMetadata && metaPositions.ts)
        ? metaPositions.ts
        : 0;

  const liveOddsIsUnder = metaRacers[0] <= 3,
    liveOddsUnderOverSelection = liveOddsIsUnder
      ? 'under'
      : 'over',
    liveOddsUnderOverOddsValue = odds.underover[liveOddsUnderOverSelection],
    liveOddsIsEven = metaRacers[0] % 2 === 0,
    liveOddsEvenOddSelection = liveOddsIsEven
      ? 'even'
      : 'odd',
    liveOddsEvenOddOddsValue = odds.evenodd[liveOddsEvenOddSelection];

  const timeToHide = (
    replays[0]
      ? replays[0].ts - 3
      : 0);

  const positionMarkers = validMetadata && metaPositions.racers.map(x => useRef());
  const racerContainers = validMetadata && metaPositions.racers.map(x => useRef());

  const boxedTrifectaArrival = metaRacers.slice(0, 3).sort();

  if (validMetadata) {
    if (videoCurrentTime >= metaTs && videoCurrentTime < timeToHide) {
      if (!started) {
        setStarted(true);
      }
      if ((showIdx < overtakings.length - 1) && overtakings[showIdx + 1].ts <= videoCurrentTime) {
        setShowIdx(showIdx + 1);
      }
      metaRacers.forEach((racer, idx) => {
        const racerRef = racerContainers[racer - 1];
        if (racerRef) {
          const el = racerRef.current;
          if (el) {
            const positionMarkerEl = positionMarkers[idx].current;
            if (positionMarkerEl) {
              el.style.transform = `translateX(${positionMarkers[idx].current.offsetLeft - el.offsetLeft}px)`;
              if (idx > 5)
                el.style.display = "none";
            }
          }
        }
      }
      );

    } else {
      if (videoCurrentTime >= timeToHide) {
        if (started) {
          setStarted(false);
        }
      }
    }
  }

  if (!started)
    return null;
  return (<div className={`track-animation ${!started
    ? 'hidden'
    : ''}`}>
    <div className="track-animation-primary">
      {
        [2,8,1,4,3,6].map((_, key) => {
          // > commented for mockups
          //
          // const racerNumber = key + 1;
          //
          //
          const racerNumber = _;
          return (<div className="racerContainer" key={key}>
            <div className="racerPosition">
              <p className="position">{dict.page_video.track.position_texts[key]}</p>
            </div>

            <div ref={positionMarkers[key]} className="positionMarker"></div>

            <div className="racerActualContainer" ref={racerContainers[key]}>
              <div className={"racerActual racerActual" + key}>
                <RacerNumber num={racerNumber} />

                <div className="racerTextContainer">
                  {hasValidNames && <p className="racerName">{names[key]}</p>}
                  <p className="position">{odds.winner[racerNumber]}</p>
                </div>
              </div>
            </div>
          </div>)
        })
      }
    </div>

    <div className="track-animation-secondary">
      <div className="oddsTitle">{dict.page_video.track.live_odds}</div>

      <div className="textContainer">
        <div className="panelBottomOddsContainer">

          <p className="marketTitle">{dict.page_video.track.markets.trifecta}</p>

          <div className="bottomRacersContainer">
            {[0, 1, 2].map((idx) => <RacerNumber num={metaRacers[idx]} key={"trifecta_racer_" + idx} />)}
          </div>

          <p className="marketOdds">{odds.trifecta[metaRacers[0]][metaRacers[1]][metaRacers[2]]}</p>
          <p className="marketTitleDash">-</p>



          <p className="marketTitle">{dict.page_video.track.markets.boxedtrifecta}</p>

          <div className="bottomRacersContainer">
            {[0, 1, 2].map((idx) => <RacerNumber num={boxedTrifectaArrival[idx]} key={"boxedtrifecta_racer_" + idx} />)}
          </div>

          <p className="marketOdds">{odds.boxedtrifecta[boxedTrifectaArrival[0]][boxedTrifectaArrival[1]][boxedTrifectaArrival[2]]}</p>
          <p className="marketTitleDash">-</p>




          <p className="marketTitle">{dict.page_video.track.markets.exacta}</p>

          <div className="bottomRacersContainer">
            {[0, 1].map((idx) => <RacerNumber num={metaRacers[idx]} key={"exacta_racer_" + idx} />)}
          </div>

          <p className="marketOdds">{odds.exacta[metaRacers[0]][metaRacers[1]]}</p>
          <p className="marketTitleDash">-</p>

          <p className="marketTitle">{dict.page_video.track.markets.quinella}</p>

          <div className="bottomRacersContainer">
            {[0, 1].map((idx) => <RacerNumber num={metaRacers[idx]} key={"quinella_racer_" + idx} />)}
          </div>

          <p className="marketOdds">{odds['quinella'][Math.min(metaRacers[0], metaRacers[1])][Math.max(metaRacers[0], metaRacers[1])]}</p>

          <div className="finalOdds">
            <p className="marketTitleDash">-</p>

            <p className="marketTitle">{dict.page_video.track.markets[liveOddsUnderOverSelection]}</p>
            <p className="marketOdds">{liveOddsUnderOverOddsValue}</p>

            <p className="marketTitleDash">-</p>
            <p className="marketTitle">{dict.page_video.track.markets[liveOddsEvenOddSelection]}</p>
            <p className="marketOdds">{liveOddsEvenOddOddsValue}</p>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default TrackAnimation;
