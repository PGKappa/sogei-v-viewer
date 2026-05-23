import React from 'react';

import "./TrifectaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const TrifectaTableOdds = ({ dict, sortedTrifectaOdds = [], sortedTrifectaOddsByValue = [] }) => {


  const trifectaMinOdds = sortedTrifectaOddsByValue[0],
    trifectaMaxOdds = sortedTrifectaOddsByValue[sortedTrifectaOddsByValue.length - 1];

  let trifectaCount = 0;




  return (<div id="trifecta-table-odds">
    <Titlebar text={dict.page_odds.trifecta_header} className="trifecta-table-title-bar" />

    <div className="trifecta-table-content">
      <div className="trifecta-table-content-1">
        {Array.apply(null, Array(6)).map((_, colIdx) => {
          return (<div className="trifecta-table-column" key={colIdx}>
            {
              Array.apply(null, Array(56)).map((__, rowIdx) => {
                const trifectaData = sortedTrifectaOdds[trifectaCount++];
                let type = '';
                if (trifectaData) {
                  if (trifectaData.odds === trifectaMinOdds) {
                    type = 'min';
                  } else if (trifectaData.odds === trifectaMaxOdds) {
                    type = 'max';
                  }
                }
                return (<div className="trifecta-table-entry" key={rowIdx}>
                  <div className="trifecta-table-num-container">
                    {
                      ((trifectaData && trifectaData.racers) || []).map((racer, racerIdx) => {
                        // console.log(racer)
                        return (<RacerNumber num={racer} key={racerIdx} />);
                      })
                    }
                  </div>
                  <div className={`trifecta-odds ${type}`}>{trifectaData && trifectaData.odds}</div>
                </div>);
              })
            }
          </div>);
        })}
      </div>
    </div>
  </div>);
};

export default TrifectaTableOdds;
