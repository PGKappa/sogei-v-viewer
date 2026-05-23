import React, { useEffect, useState } from 'react';

import "./ExactaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const ExactaTableOdds = ({ dict, sortedExactaOdds, sortedExactaOddsByValue }) => {
  const exactaMinOdds = sortedExactaOddsByValue[0],
    exactaMaxOdds = sortedExactaOddsByValue[sortedExactaOddsByValue.length - 1];

  const [exactaOffset, setExactaOffset] = useState(0);
  let exactaCount = 0;

  const [showContent, setShowContent] = useState(true);
  
  useEffect(() =>  {

      setExactaOffset(showContent ? 0 : sortedExactaOdds.length / 2); 
      
      setTimeout(() => {
        setShowContent(!showContent);
      }, 5000);
      
  }, [showContent]);

  useEffect(() => {
    return () => {
      setExactaOffset(0);
      setShowContent(true);
    }    
  }, []);

  return (<section id="exacta-table-odds">
    <Titlebar text={dict.page_odds.exacta_header} className="exacta-table-title-bar" />
    <div className="content">      
      <div className={"exacta-table-content-"+(showContent ? 1 : 2)} >
        {
          Array(7).fill().map((_, item) => {
            return (<div className="exacta-table-column" key={item}>
              {
                Array(4).fill().map((_, idx) => {
                  let type = "";                  
                  const data = sortedExactaOdds[exactaOffset + exactaCount++];
                  if (data) {
                    if (exactaMinOdds === data.odds) {
                      type = "min";
                    } else if (exactaMaxOdds === data.odds) {
                      type = "max";
                    }
                  }

                  return <div className="exacta-table-entry" key={idx}>
                    <div className="exacta-table-num-container">
                      {((data && data.racers) || []
                      ).map((racer, racerIdx) => <RacerNumber num={racer} key={racerIdx} />)}
                    </div>
                    <div className={`exacta-table-odds ${type}`}>{data && data.odds}</div>

                  </div>
                })
              }
            </div>)
          })
        }
      </div>

    </div>
  </section>);
};

export default ExactaTableOdds;