import React from 'react';

import "./QuinellaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const QuinellaTableOdds = React.memo(({dict, odds}) => {
  var sortedQuinellaOdds = [];

  Object.keys(odds).forEach(function(first) {
    Object.keys(odds[first]).forEach(function(second) {
      sortedQuinellaOdds.push({
        racers: [
          first, second
        ],
        odds: odds[first][second]
      });
    });
  });

  var sortedQuinellaOddsByValue = 
  Object.values(sortedQuinellaOdds)
  .sort((a, b) => a.odds - b.odds).map(x => x.odds);

  const quinellaMinOdds = sortedQuinellaOddsByValue[0],
    quinellaMaxOdds = sortedQuinellaOddsByValue[sortedQuinellaOddsByValue.length - 1];

  let array = [0, 1, 2, 3, 4];
  let quinellaCount = -1;

  return (<div id = "quinella-table-odds" > <Titlebar text={dict.page_odds.quinella_header} className="quinella-table-title-bar"/>

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
                 console.log('DATA TYPE',data.odds,type)
                return (<div className={`quinella-table-entry ${type}`} key={item + idx}>
                  <div className="quinella-table-num-container">
                    {data.racers.map((racer, racerIdx) => item <= idx && <RacerNumber num={racer} key={racerIdx}/>)}
                  </div>

                  {item <= idx && <div className="quinella-table-odds">{data.odds}</div>}
                </div>)
              }
              return null;
            })
          }
        </div>)
      })
    }
  </div>
</div>);
});

export default QuinellaTableOdds;
//{<MainPageOthersTableOdds/>}
