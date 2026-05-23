import React, { useEffect, useState } from 'react';

import "./BoxedTrifectaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const BoxedTrifectaTableOdds = ({ dict, sortedBoxedTrifectaOdds = [], sortedBoxedTrifectaOddsByValue = [] }) => {
  const [r, setR] = useState({
    pageOddsBoxedTrifectaHeaderText: '',
  })
  useEffect(() => {
    let pageOddsBoxedTrifectaHeaderText = '';

    if (dict) {
      if (dict.page_odds) {
        pageOddsBoxedTrifectaHeaderText = dict.page_dds.boxedTrifecta_header;
      }
    }
    setR({
      pageOddsBoxedTrifectaHeaderText: pageOddsBoxedTrifectaHeaderText
    })
  }, [dict]);

  const boxedTrifectaMinOdds = sortedBoxedTrifectaOddsByValue[0],
    boxedTrifectaMaxOdds = sortedBoxedTrifectaOddsByValue[sortedBoxedTrifectaOddsByValue.length - 1];

  let array = [0, 1, 2, 3];
  let boxedTrifectaCount = -1;
  //console.log(sortedBoxedTrifectaOdds);

  return (<>
    <p className="boxedtrifecta-table-title"> {r.pageOddsBoxedTrifectaHeaderText}</p>
    <div id="boxedtrifecta-table-odds"> <Titlebar text={""} className="boxedtrifecta-table-title-bar" />

      <div className="boxedtrifecta-table-content">
        {
          [0, 1, 2, 3, 4].map((item) => {
            return (<div className="boxedtrifecta-table-column" key={item}>
              {
                array.map((idx) => {
                  /*
                  if (item <= idx && item < 5) {
                    boxedTrifectaCount++;
                  }*/
                  boxedTrifectaCount++;
                  //console.log(boxedTrifectaCount);

                  const data = sortedBoxedTrifectaOdds[boxedTrifectaCount];

                  //console.log(data);
                  let type = "";

                  if (boxedTrifectaMinOdds === data.odds) {
                    type = "min";
                  } else if (boxedTrifectaMaxOdds === data.odds) {
                    type = "max";
                  }

                  // if (item < 5) {
                  // console.log()
                  return (<div className={`boxedtrifecta-table-entry ${type}`} key={item + idx}>
                    <div className="boxedtrifecta-table-num-container">
                      {data.racers.map((racer, racerIdx) => <RacerNumber num={racer} key={racerIdx} />)}
                    </div>

                    <div className={`boxedtrifecta-table-odds`}>{data.odds}</div>
                  </div>)
                  //}
                  //return null;
                })
              }
            </div>)
          })
        }
      </div>
    </div>
  </>);
};

export default BoxedTrifectaTableOdds;
//{<MainPageOthersTableOdds/>}
