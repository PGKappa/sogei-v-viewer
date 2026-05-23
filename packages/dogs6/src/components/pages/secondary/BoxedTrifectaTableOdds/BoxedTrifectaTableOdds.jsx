import React, { useState, useEffect } from 'react';

import "./BoxedTrifectaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const BoxedTrifectaTableOdds = ({ dict, sortedBoxedTrifectaOdds = [], sortedBoxedTrifectaOddsByValue = [] }) => {
  const boxedTrifectaMinOdds = sortedBoxedTrifectaOddsByValue[0],
    boxedTrifectaMaxOdds = sortedBoxedTrifectaOddsByValue[sortedBoxedTrifectaOddsByValue.length - 1];

  let boxedTrifectaCount = -1;

  const [r, setR] = useState({
    boxedTrifectaHeaderText: ''
  });

  useEffect(() => {
    if (dict) {
      let boxedTrifectaHeaderText = '';
      if (dict.page_odds) {
        boxedTrifectaHeaderText = dict.page_odds.boxedtrifecta_header;
      }

      setR({
        boxedTrifectaHeaderText
      });
    }
  }, [dict]);
  return (<section id="boxedtrifecta-table-odds">
    <Titlebar text={r.boxedTrifectaHeaderText} className="boxedtrifecta-table-title-bar" />
    <div className="boxedtrifecta-table-content">
      {
        [0, 1, 2, 3, 4].map((item) => {
          return (<div className="boxedtrifecta-table-column" key={item}>
            {
              [0, 1, 2, 3].map((idx) => {
                boxedTrifectaCount++;

                const data = sortedBoxedTrifectaOdds[boxedTrifectaCount];
                const odds = data ? data.odds : "";
                let type = "";

                if (odds) {
                  if (boxedTrifectaMinOdds === data.odds) {
                    type = "min";
                  } else if (boxedTrifectaMaxOdds === data.odds) {
                    type = "max";
                  }
                }
                const racers = data ? data.racers || [] : [];

                return <div className={`boxedtrifecta-table-entry ${type}`} key={item + idx}>
                  <div className="boxedtrifecta-table-num-container">
                    {racers.map((racer, racerIdx) => <RacerNumber num={racer} key={racerIdx} />)}
                  </div>

                  <div className="boxedtrifecta-table-odds">{odds}</div>
                </div>
              })
            }
          </div>)
        })
      }
    </div>
  </section>);
};

export default BoxedTrifectaTableOdds;
