import React from 'react';

import "./MainTableOdds.scss";
import MainTableColumn from "./MainTableOddsColumn.jsx";
import HistoryColumn from "./MainTableOddsHistory.jsx";
import PerformanceColumn from "./MainTableOddsPerformance.jsx";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";

const MainTableOdds = React.memo(({racers, odds, dict}) => {
  const sortedWinnerOddsByValue = Object.values(odds.winner).sort(function(a, b) {
      return a - b;
    }),
    winnerMinOdds = sortedWinnerOddsByValue[0],
    winnerMaxOdds = sortedWinnerOddsByValue[sortedWinnerOddsByValue.length - 1];

  const sortedPlacedOddsByValue = Object.values(odds.placed).sort(function(a, b) {
      return a - b;
    }),
    placedMinOdds = sortedPlacedOddsByValue[0],
    placedMaxOdds = sortedPlacedOddsByValue[sortedPlacedOddsByValue.length - 1];

  const sortedShowOddsByValue = Object.values(odds.show).sort(function(a, b) {
      return a - b;
    }),
    showMinOdds = sortedShowOddsByValue[0],
    showMaxOdds = sortedShowOddsByValue[sortedShowOddsByValue.length - 1];

  return (<div className="table-main-odds">
    <MainTableColumn title={dict.page_odds.racer_header}>
        {racers.map((racer, idx) => <div className="row" key={idx}><RacerNumber num={idx + 1} size="29px"/>{racer.name}</div>)}
    </MainTableColumn>

    <div className="main-table-column double-column">
      <div className="div-that-needs-a-className">
          <PerformanceColumn title={dict.page_odds.performance_header} data={racers.map(x => x.performance)} additionalStyle={{
              minWidth: '100%'
            }}/>

          <HistoryColumn title={dict.page_odds.history_header} data={racers.map(x => x.history)} additionalStyle={{
              minWidth: '100%'
            }}/>
      </div>
    </div>
    <MainTableColumn title={dict.page_odds.winner_header}>
      {
        Object.keys(odds.winner).map((x, idx) => {
          const currentOdds = odds.winner[x];
          const isMinOdds = winnerMinOdds === currentOdds;
          const isMaxOdds = winnerMaxOdds === currentOdds;
          const minMaxClass = (
            isMinOdds
            ? 'min'
            : (
              isMaxOdds
              ? 'max'
              : ''))

          return <div className={`row odds ${minMaxClass}`} key={idx}>{currentOdds}</div>

        })
      }
    </MainTableColumn>

    <MainTableColumn title={dict.page_odds.placed_header}>
      {
        Object.keys(odds.placed).map((x, idx) => {
          const currentOdds = odds.placed[x];
          const isMinOdds = placedMinOdds === currentOdds;
          const isMaxOdds = placedMaxOdds === currentOdds;
          const minMaxClass = (
            isMinOdds
            ? 'min'
            : (
              isMaxOdds
              ? 'max'
              : ''))

          return <div className={`row odds ${minMaxClass}`} key={idx}>{currentOdds}</div>

        })
      }
    </MainTableColumn>

    <MainTableColumn title={dict.page_odds.show_header}>
      {
        Object.keys(odds.show).map((x, idx) => {
          const currentOdds = odds.show[x];
          const isMinOdds = showMinOdds === currentOdds;
          const isMaxOdds = showMaxOdds === currentOdds;
          const minMaxClass = (
            isMinOdds
            ? 'min'
            : (
              isMaxOdds
              ? 'max'
              : ''))

          return <div className={`row odds ${minMaxClass}`} key={idx}>{currentOdds}</div>

        })
      }
    </MainTableColumn>
  </div>);
});

export default MainTableOdds;
