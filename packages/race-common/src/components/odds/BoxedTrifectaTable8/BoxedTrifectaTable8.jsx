import React, { useEffect, useState } from 'react';
import Titlebar from "@v-viewer/race-common/components/Titlebar";

import "./BoxedTrifectaTable8.scss";

const BoxedTrifectaTableOdds = ({ dict, sortedBoxedTrifectaOdds = [], sortedBoxedTrifectaOddsByValue = [], RacerNumber}) => {
  const boxedTrifectaMinOdds = sortedBoxedTrifectaOddsByValue[0],
    boxedTrifectaMaxOdds = sortedBoxedTrifectaOddsByValue[sortedBoxedTrifectaOddsByValue.length - 1];

  let boxedTrifectaCount = 0;
  const [boxedTrifectaOffset, setBoxedTrifectaOffset] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    setBoxedTrifectaOffset(showContent ? 0 : sortedBoxedTrifectaOdds.length / 2);
    if (mounted) {
      setTimeout(() => {
        setShowContent(!showContent);
      }, 5000);
    }
  }, [showContent]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
      setBoxedTrifectaOffset(0);
      setShowContent(true);
    }
  }, []);


  return (<div id="boxedtrifecta-table-odds">
    <Titlebar text={dict.page_odds.boxedtrifecta_header} className="boxedtrifecta-table-title-bar" />
    <div className="boxedtrifecta-table-content">
      <div className={"boxedtrifecta-table-content-" + (showContent ? 1 : 2)}>
        {
          Array(7).fill().map((_, item) => {
            return (<div className="boxedtrifecta-table-column" key={item}>
              {
                Array(4).fill().map((_, idx) => {
                  const data = sortedBoxedTrifectaOdds[boxedTrifectaOffset + boxedTrifectaCount++];
                  let type = "";
                  if (data) {
                    if (boxedTrifectaMinOdds === data.odds) {
                      type = "min";
                    } else if (boxedTrifectaMaxOdds === data.odds) {
                      type = "max";
                    }
                  }
                  return (<div className="boxedtrifecta-table-entry" key={item + idx}>
                    <div className="boxedtrifecta-table-num-container">
                      {((data && data.racers) || []).map((racer, racerIdx) => <RacerNumber num={racer} key={racerIdx} />)}
                    </div>

                    <div className={`boxedtrifecta-table-odds ${type}`}>{data && data.odds}</div>
                  </div>)
                })
              }
            </div>)
          })
        }
      </div>
    </div>
  </div>);
};

export default BoxedTrifectaTableOdds;
