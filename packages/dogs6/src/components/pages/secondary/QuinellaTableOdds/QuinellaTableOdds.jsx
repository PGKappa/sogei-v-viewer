import React, { useEffect, useState } from 'react';

import "./QuinellaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const QuinellaTableOdds = ({ dict, odds }) => {
  var sortedQuinellaOdds = [];

  Object.keys(odds).forEach(function (first) {
    Object.keys(odds[first]).forEach(function (second) {
      sortedQuinellaOdds.push({
        racers: [
          first, second
        ],
        odds: odds[first][second]
      });
    });
  });

  var sortedQuinellaOddsByValue = Object.values(sortedQuinellaOdds).sort(function (a, b) {
    return a.odds - b.odds;
  }).map(function (x) {
    return x.odds;
  });

  const quinellaMinOdds = sortedQuinellaOddsByValue[0],
    quinellaMaxOdds = sortedQuinellaOddsByValue[sortedQuinellaOddsByValue.length - 1];

  let array = [0, 1, 2, 3, 4];
  let quinellaCount = -1;

  const [r, setR] = useState({
    quinellaHeaderText: ''
  });

  useEffect(() => {
    if (dict) {
      let quinellaHeaderText = ''
      if (dict.page_odds) {
        quinellaHeaderText = dict.page_odds.quinella_header;
      }
      setR({
        quinellaHeaderText: quinellaHeaderText
      });
    }
  }, [dict]);

  return <div id="quinella-table-odds" > <Titlebar text={r.quinellaHeaderText} className="quinella-table-title-bar" />

    <div className="quinella-table-content">
      {
        
        [0, 1, 2, 3, 4].map((item) => {
          return (<div className="quinella-table-column" key={item}>
            {
              array.map((idx) => {
                if (item <= idx && item < 5) {
                  quinellaCount++;
                }

                const data = sortedQuinellaOdds[quinellaCount];

                let type = "";

                if (quinellaMinOdds === data.odds) {
                  type = "min";
            
                } else if (quinellaMaxOdds === data.odds) {
                  type = "max";
              
                }

                if (item < 5) {

                  if(item >idx){
                    type = "";
                  }

                 // console.log('DATA TYPE-----',data.odds,type,item ,idx)
                  return (<div className={`quinella-table-entry ${type}`} key={item + idx}>
                    <div className="quinella-table-num-container">
                      {data.racers.map((racer, racerIdx) => item <= idx && <RacerNumber num={racer} key={racerIdx} />)}
                    </div>

                    {item <= idx && <div className="quinella-table-odds">{data.odds}</div>}
                  { type = ""}
                  </div>)
                   
                }
                return null;
              })
            }
          </div>)
        })
      }
    </div>
  </div>;
};

export default QuinellaTableOdds;