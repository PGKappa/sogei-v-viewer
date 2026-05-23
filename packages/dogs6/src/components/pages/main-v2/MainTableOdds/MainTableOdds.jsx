import React, { useState, useEffect } from 'react';

import "./MainTableOdds.scss";
import MainTable from "../MainTable";
import MainTableColumn from "../MainTable/Column";

const MainTableOdds = React.memo(({ market, odds, dict, leftItemRenderer, directionRow }) => {
  const sortedOddsByValue = Object.values(odds[market]).sort(function (a, b) {
    return a - b;
  }),
    minOdds = sortedOddsByValue[0],
    maxOdds = sortedOddsByValue[sortedOddsByValue.length - 1];

  const [r, setR] = useState({
    marketHeaderText: ''
  });

  useEffect(() => {
    let marketHeaderText = '';
    if (dict && market) {
      if (dict.page_odds) {
        marketHeaderText = dict.page_odds[`${market}_header`];
      }

      setR({
        marketHeaderText: marketHeaderText
      });
    }

  }, [dict, market]);

  return (<MainTable className="main-table-odds-v2">
    <MainTableColumn directionRow title={r.marketHeaderText}>
      {
        Object.keys(odds[market]).map((x, idx) => {
          const currentOdds = odds[market][x];
          const isMinOdds = minOdds === currentOdds;
          const isMaxOdds = maxOdds === currentOdds;
          const minMaxClass = (
            isMinOdds
              ? 'min'
              : (
                isMaxOdds
                  ? 'max'
                  : ''))

          const leftItem = leftItemRenderer && leftItemRenderer(idx);
          return <div className={`row ${minMaxClass}`} key={idx}>
            <div className="main-table-odds-entry">
              {leftItem && <div className="left-item">{leftItem}</div>}
              <span className="odds">{currentOdds}</span>
            </div>
          </div>

        })
      }
    </MainTableColumn>
  </MainTable>);
});

export default MainTableOdds;
