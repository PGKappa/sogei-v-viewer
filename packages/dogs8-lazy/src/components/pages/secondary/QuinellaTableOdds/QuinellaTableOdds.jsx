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

  let array = [0, 1, 2, 3];
  let quinellaCount = -1;

  return (<div id = "quinella-table-odds" > <Titlebar text={dict.page_odds.quinella_header} className="quinella-table-title-bar"/>

  <div className="quinella-table-content">
    {
      Array(7).fill().map((_, item) => {
        return (<div className="quinella-table-column" key={item}>
          {
            Array(4).fill().map((_, idx) => {
              quinellaCount++;
            
              let type = "";
              const data = sortedQuinellaOdds[quinellaCount];
              if (data) {
                if (quinellaMinOdds === data.odds) {
                  type = "min";
                } else if (quinellaMaxOdds === data.odds) {
                  type = "max";
                }
              }
                return (<div className="quinella-table-entry" key={item + idx}>
                  <div className="quinella-table-num-container">
                    {(data && data.racers || []).map((racer, racerIdx) =>  <RacerNumber num={racer} key={racerIdx}/>)}
                  </div>
                  <div className={`quinella-table-odds ${type}`}>{data && data.odds}</div>
                </div>)
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
