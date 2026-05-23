import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import "./TrackAnimation.scss";
import RacerNumber from "../RacerNumber/RacerNumber.jsx";
const TrackAnimation = ({ dict, names, odds, metadata, videoCurrentTime, channel }) => {
  // videoCurrentTime  = 10;
  const [showIdx, setShowIdx] = useState(0),
    hasValidNames = names && Array.isArray(names),
    validMetadata = useMemo(() => {
      return metadata && metadata.positions && metadata.positions.length > 3;
    }, [metadata]),
    [overtakings, setOvertakings] = useState([]),
    [timeToHide, setTimeToHide] = useState(0),
    [showMeta, setshowMeta] = useState(false),
    [metaRacers, setMetaRacers] = useState(null),
    [metaTs, setMetaTs] = useState(0),
    [liveOddsInfo, setLiveOddsInfo] = useState(),
    started = useMemo(() => {
      if (!validMetadata) return false;
      if (!(videoCurrentTime >= metaTs && videoCurrentTime < timeToHide)) return false;
      return true;
    }, [validMetadata, videoCurrentTime, metaTs, timeToHide]);

  const positionMarkers = useRef(names.map(x => useRef(null)));
  const racerContainers = useRef(names.map(x => useRef(null))),
    retryToUpdateTimeout = useRef(),

    quinellaArrival = useMemo(() => {
      if (!validMetadata) return null;
      if (!metaRacers) return null;
      return metaRacers.slice(0, 2).sort();
    }, [validMetadata, metaRacers]),
    trifectaOdds = useMemo(() => {
      const newMRs = metaRacers;
      if (newMRs) {
        if (odds) {
          if (odds.trifecta) {
            if (odds.trifecta[newMRs[0]]) {
              if (odds.trifecta[newMRs[0]][newMRs[1]]) {
                if (odds.trifecta[newMRs[0]][newMRs[1]][newMRs[2]]) {
                  return odds.trifecta[newMRs[0]][newMRs[1]][newMRs[2]];
                }
              }
            }
          }
        }
      }
      return "";
    }, [metaRacers, odds]),
    boxedTrifectaArrival = useMemo(() => {
      if (!validMetadata) return null;
      if (!metaRacers) return null;
      return metaRacers.slice(0, 3).sort();
    }, [validMetadata, metaRacers]),
    boxedTrifectaOdds = useMemo(() => {
      if (!boxedTrifectaArrival) return "";
      if (boxedTrifectaArrival.length <= 2) return "";
      if (odds && odds.boxedtrifecta) {
        if (odds.boxedtrifecta[boxedTrifectaArrival[0]]) {
          if (odds.boxedtrifecta[boxedTrifectaArrival[0]][boxedTrifectaArrival[1]]) {
            const newBoxedTrifectaOdds = odds.boxedtrifecta[boxedTrifectaArrival[0]][boxedTrifectaArrival[1]][boxedTrifectaArrival[2]];
            if (newBoxedTrifectaOdds) {
              return newBoxedTrifectaOdds;
            }
          }
        }
      }
      return "";
    }, [boxedTrifectaArrival, odds]),
    exactaOdds = useMemo(() => {
      const newMRs = metaRacers;
      if (newMRs) {
        if (odds) {
          if (odds.trifecta) {
            if (odds.trifecta[newMRs[0]]) {
              if (odds.trifecta[newMRs[0]][newMRs[1]]) {
                return odds.exacta[newMRs[0]][newMRs[1]];
              }
            }
          }
        }
      }
      return "";
    }, [metaRacers, odds]),
    quinellaOdds = useMemo(() => {
      if (!quinellaArrival) return "";
      if (quinellaArrival.length <= 1) return "";
      if (!odds['quinella'][quinellaArrival[0]]) return "";
      if (!odds['quinella'][quinellaArrival[0]][quinellaArrival[1]]) return "";
      return odds['quinella'][quinellaArrival[0]][quinellaArrival[1]];
    }, [quinellaArrival, odds]);

  useEffect(() => {
    return () => {
      setShowIdx(0);
      setOvertakings([]);
      setTimeToHide(0);
    //  setMetaRacers(null);
      setMetaTs(0);
      setLiveOddsInfo();

    }
  }, []);

  useEffect(() => {

    //  console.log('Meta', 'Start1',metaRacers,metadata);
    if (metaRacers && odds) {
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

      setLiveOddsInfo({
        underOverSelection: liveOddsUnderOverSelection,
        underOverOddsValue: liveOddsUnderOverOddsValue,
        evenOddSelection: liveOddsEvenOddSelection,
        evenOddOddsValue: liveOddsEvenOddOddsValue
      });
}

  }, [metaRacers, odds]);

  useEffect(() => {

    if (!validMetadata) return;
    const filteredMetadataPositions = metadata.positions.filter(x => x);
    const newOvertakings = filteredMetadataPositions.slice(0, metadata.positions.length - 3);
    setOvertakings(newOvertakings);
    const newReplays = filteredMetadataPositions.slice(newOvertakings.length);

    setTimeToHide((
      newReplays[0]
        ? newReplays[0].ts - 3
        : 0));
  }, [validMetadata, metadata]);

  useEffect(() => {

    if (!validMetadata) return;
    const metaPositions = overtakings[showIdx];
    //console.log("metaPositions: ", metaPositions)
    if (!metaPositions) return;
    const newMRs = metaPositions.racers;
    if (!newMRs) return;
    if (newMRs.length <= 0) return;
    clearTimeout(retryToUpdateTimeout.current);
    triggerPositionsUpdate(newMRs);
 //   setMetaTs(metaPositions.ts);
  }, [validMetadata, showIdx, overtakings, triggerPositionsUpdate,metaRacers]);

  useEffect(() => {


    if (metaRacers && racerContainers.current && positionMarkers.current) {
      metaRacers.forEach((racer, idx) => {
        const racerCardRef = racerContainers.current[racer - 1];
        if (racerCardRef) {
          const el = racerCardRef.current;
          if (el) {

            const currentPositionMarker = positionMarkers.current[idx];
            if (currentPositionMarker) {
              const positionMarkerEl = currentPositionMarker.current;
              if (positionMarkerEl) {
                const delta = (idx + 1 - racer);
                const move = delta * el.parentNode.offsetWidth;
                el.style.transform = `translateX(${move}px)`;
                el.style.visibility = idx <= 5 ? 'visible' : 'hidden';
              }
            }
          }
        }
      });
    } else {
      retryToUpdateTimeout.current = setTimeout(() => {
        //console.log("retryToUpdateTimeout");
        triggerPositionsUpdate();
      }, 250);
    }
  }, [metaRacers, triggerPositionsUpdate, started]);

  useEffect(() => {

    if (started &&  overtakings) {
      if ((showIdx < overtakings.length - 1) && overtakings[showIdx + 1].ts <= videoCurrentTime) {
        // tmpdisabledformetadatatest 
        setShowIdx(showIdx + 1);
      }
    }
    let sleepstart = 9;
    if(channel == 'CH1'){
       sleepstart = 5;
     }

    if(videoCurrentTime >sleepstart ){
      setshowMeta(true);
     // console.log('Visualizza Metadati',sleepstart)
    }
  }, [started, showIdx, overtakings, videoCurrentTime]);

  const triggerPositionsUpdate = useCallback((newMetaRacers) => {

    //console.warn("triggerPositionsUpdate::newMetaRacers", newMetaRacers)
    if (Array.isArray(newMetaRacers)) {
      setMetaRacers([...newMetaRacers]);
    } else {
      if(Array.isArray(metaRacers))
     // console.warn("triggerPositionsUpdate::metaRacers", metaRacers)
      setMetaRacers([...(metaRacers )]);
    }
  }, [metaRacers]);

  useEffect(() => {
    window.addEventListener('resize', triggerPositionsUpdate);
    
    return () => {
      window.removeEventListener('resize', triggerPositionsUpdate);
    }

  }, [triggerPositionsUpdate]);

  const containerClassName = useMemo(() => {
    return `track-animation ${!started ? "hidden" : ""}`;

  }, [started]);


  if (!started)
    return null;

  if (!metaRacers)
    return null;

  return (<> {showMeta && <div className={containerClassName}>
    <div className="track-animation-primary" style={{
      overflow: "hidden",
      width: "100%"
    }}>
      {
        (racerContainers.current || []).map((_, key) => {
          const racerNumber = key + 1; // metaRacers[key];          
          
          return (<div className="racerContainer" key={key}>
            <div className="racerPosition">
              <p className="position">{dict.page_video.track.position_texts[key]}</p>
            </div>

            <div ref={positionMarkers.current[key]} className="positionMarker"></div>

            <div className="racerActualContainer" ref={racerContainers.current[key]}>
              <div className={`racerActual racerActual${key}`}>
                <RacerNumber num={racerNumber} />

                <div className="racerTextContainer">
                  {hasValidNames && <p className="racerName">{names[key]}</p>}
                  <p className="position odds">{odds.winner[racerNumber]}</p>
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

          <p className="marketOdds">{trifectaOdds}</p>
          <p className="marketTitleDash">-</p>
          <p className="marketTitle">{dict.page_video.track.markets.boxedtrifecta}</p>

          <div className="bottomRacersContainer">
            {(boxedTrifectaArrival && [0, 1, 2] || []).map((idx) => <RacerNumber num={boxedTrifectaArrival[idx]} key={"boxedtrifecta_racer_" + idx} />)}
          </div>

          <p className="marketOdds">{boxedTrifectaOdds}</p>
          <p className="marketTitleDash">-</p>

          <p className="marketTitle">{dict.page_video.track.markets.exacta}</p>

          <div className="bottomRacersContainer">
            {[0, 1].map((idx) => <RacerNumber num={metaRacers[idx]} key={"exacta_racer_" + idx} />)}
          </div>

          <p className="marketOdds">{exactaOdds}</p>
          <p className="marketTitleDash">-</p>

          <p className="marketTitle">{dict.page_video.track.markets.quinella}</p>

          <div className="bottomRacersContainer">
            {(quinellaArrival || []).map((racer, idx) => <RacerNumber num={racer} key={"quinella_racer_" + idx} />)}
          </div>

          <p className="marketOdds">{quinellaOdds}</p>

          <div className="finalOdds">
            <p className="marketTitleDash">-</p>

            <p className="marketTitle">{liveOddsInfo && dict.page_video.track.markets[liveOddsInfo.underOverSelection]}</p>
            <p className="marketOdds">{liveOddsInfo && liveOddsInfo.underOverOddsValue}</p>

            <p className="marketTitleDash">-</p>
            <p className="marketTitle">{liveOddsInfo && dict.page_video.track.markets[liveOddsInfo.evenOddSelection]}</p>
            <p className="marketOdds">{liveOddsInfo && liveOddsInfo.evenOddOddsValue}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
  </>
  
  
  )
}

export default TrackAnimation;
