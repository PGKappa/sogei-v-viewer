import React from 'react';

import "./TrifectaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const TrifectaTableOdds = React.memo(({dict, odds}) => {

  const trifectaOdds = odds.trifecta;

  const sortedTrifectaOdds = [];
  Object.keys(trifectaOdds).forEach(function(first) {
    Object.keys(trifectaOdds[first]).forEach(function(second) {
      Object.keys(trifectaOdds[first][second]).forEach(function(third) {
		  // console.log("first: ", first, "second:", second, "third:", third);
        sortedTrifectaOdds.push({
          racers: [
            first, second, third
          ],
          odds: trifectaOdds[first][second][third]
        });
      });
    });
  });

  var sortedTrifectaOddsByValue = Object.values(sortedTrifectaOdds).sort(function(b, a) {
    return b.odds - a.odds;
  }).map(function(x) {
    return x.odds;
  });

  const trifectaMinOdds = sortedTrifectaOddsByValue[0],
    trifectaMaxOdds = sortedTrifectaOddsByValue[sortedTrifectaOddsByValue.length - 1];

  let trifectaCount = 0;




  return (<div id="trifecta-table-odds">
    <Titlebar text={dict.page_odds.trifecta_header}  className="trifecta-table-title-bar"/>

    <div className="trifecta-table-content">
      {[1, 2].map(x => (
        <div className={"trifecta-table-content-"+ x} key={x}>
        {Array.apply(null, Array(6)).map((_, colIdx) => {
          return (<div className="trifecta-table-column" key={colIdx}>
            {
              Array.apply(null, Array(28)).map((__, rowIdx) => {
                const trifectaData = sortedTrifectaOdds[trifectaCount++];
                let type = '';
                if (trifectaData) {
                  if (trifectaData.odds === trifectaMinOdds)  {
                    type = 'min';
                  } else if (trifectaData.odds === trifectaMaxOdds) {
                    type = 'max';
                  }
                }
                return (<div className="trifecta-table-entry" key={rowIdx}>
                  <div className="trifecta-table-num-container">
                    {
                      (( trifectaData && trifectaData.racers) || [] ).map((racer, racerIdx) => {
                        // console.log(racer)
                        return (<RacerNumber num={racer} key={racerIdx}/>);
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
        ))
      }
    </div>
  </div>);
});

export default TrifectaTableOdds;
