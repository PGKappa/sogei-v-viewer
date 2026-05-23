import React from "react";
import "./ReplayAnimation.scss";
import RacerNumber from "../RacerNumber/RacerNumber.jsx";
import Cockade from "../Cockade";
import {isAValidRacerNumber} from "../../utils";

import Titlebar from "../Titlebar";

const ReplayAnimation = ({dict, names, arrival, metadata, videoCurrentTime, channel}) => {

  const validMetadata = metadata && metadata.positions && metadata.positions.length > 3;

  const metaPositions = validMetadata && metadata.positions.filter(x => x);
  let ticks = 
    validMetadata
    ? metaPositions.slice(Math.max(metaPositions.length - 3, 0)).map(x => x.ts)
    : [];


    
  let appearTs = (ticks[0] || Infinity) - 1;

  if (validMetadata) {
    if (appearTs !== Infinity && appearTs < videoCurrentTime) {
      let results = ticks.filter(x => x < videoCurrentTime);
      
return <div className="replayOuterContainer">
        <Titlebar className="replayResultsHeader" text={dict.page_video.track.arrival_panel.header}/>
      

        <div className="replayResultsMain">
          {
            results.map((_, idx) => {
              const racerNumber = arrival && arrival[idx] && arrival[idx].number;
              const racerName = names && names[racerNumber - 1] || '';
              if (isAValidRacerNumber(racerNumber))
                return <div key={idx} className="replayResultContainer">
                  <div className="replayRacerContainer">
                    <div className="racerData">
                      <RacerNumber num={racerNumber}/>
                    </div>
                    <div className="medalContainer">
                      <Cockade type={idx}/>
                      <p className="medaltext">{dict.page_video.track.position_texts[idx]}</p>
                    </div>
                  </div>
                  <p className="racerName">{racerName}</p>
                </div>
              
return null;
            })
          }

        </div>
      </div>
    }
  }

  return null;

}

export default ReplayAnimation;
