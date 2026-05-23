import React, { useMemo } from 'react';

import "./ExactaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const ExactaTableOdds = ({ dict, sortedExactaOdds = [], sortedExactaOddsByValue = [] }) => {
  const exactaMinOdds = sortedExactaOddsByValue[0],
    exactaMaxOdds = sortedExactaOddsByValue[sortedExactaOddsByValue.length - 1];

  let exactaCount = 0;

  const r = useMemo(() => {
    if (!dict) return {
      exactaHeaderText: ''
    };

    let exactaHeaderText = '';
    if (dict.page_odds) {
      exactaHeaderText = dict.page_odds.exacta_header;
    }
    return {
      exactaHeaderText: exactaHeaderText
    };
  }, [dict]);

  return (<section id="exacta-table-odds">
    <Titlebar text={r.exactaHeaderText} className="exacta-table-title-bar" />
    <div className="content">
      {
        [
          0,
          1,
          2,
          3,
          4,
          5
        ].map((item) => {
          return (<div className="exacta-table-column" key={item}>
            {
              [0, 1, 2, 3, 4].map((idx) => {

                const data = sortedExactaOdds[exactaCount++];
                let type = "";
                if (exactaMinOdds === data.odds) {
                  type = "min";
                } else if (exactaMaxOdds === data.odds) {
                  type = "max";
                }

                return (<div className={`exacta-table-entry  ${type}`} key={item + idx}>

                  <div className="exacta-table-num-container">
                    {
                      data.racers.map((racer, racerIdx) => {
                        //return (<div key={racerIdx} className={`racer racer-${racer}`}>{racer}</div>);
                        return (<RacerNumber num={racer} key={racerIdx} />);
                      })
                    }
                  </div>

                  <div className="exacta-table-odds">{data.odds}</div>

                </div>)
              })
            }
          </div>)
        })
      }
    </div>
  </section>);
}

export default ExactaTableOdds;
