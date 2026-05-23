import React, { useEffect, useState } from 'react';

import "./MainTableOdds.scss";
import MainTableColumn from "./MainTableOddsColumn.jsx";
import HistoryColumn from "./MainTableOddsHistory.jsx";
import PerformanceColumn from "./MainTableOddsPerformance.jsx";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";

const MainTableOdds = ({racers = [], odds = {}, dict, showPerformance}) => {

  const [oddsData, setOddsData] = useState({});
  const [r, setR] = useState({
    performanceHeaderText: '',
    historyHeaderText: '', 
    winnerHeaderText: ''
  });

  useEffect(() => {
    if (dict) {
      let performanceHeaderText = '',
      historyHeaderText = '',
      winnerHeaderText = '';
      if (dict.page_odds) {
        performanceHeaderText = dict.page_odds.performance_header;
        historyHeaderText = dict.page_odds.history_header;
        winnerHeaderText = dict.page_odds.winner_header;
      }

      setR({
        winnerHeaderText: winnerHeaderText,
        performanceHeaderText: performanceHeaderText,
        historyHeaderText: historyHeaderText
      });
      
    }
  }, [dict]);

  useEffect(() => {
    if (odds) {
      const sortedWinnerOddsByValue = Object.values(odds.winner).sort((a, b) => a - b),
        winnerMinOdds = sortedWinnerOddsByValue[0],
        winnerMaxOdds = sortedWinnerOddsByValue[sortedWinnerOddsByValue.length - 1];

      const sortedPlacedOddsByValue = Object.values(odds.placed).sort((a, b) => a - b),
        placedMinOdds = sortedPlacedOddsByValue[0],
        placedMaxOdds = sortedPlacedOddsByValue[sortedPlacedOddsByValue.length - 1];

      const sortedShowOddsByValue = Object.values(odds.show).sort((a, b) => a - b),
        showMinOdds = sortedShowOddsByValue[0],
        showMaxOdds = sortedShowOddsByValue[sortedShowOddsByValue.length - 1];

        setOddsData({
          winnerMinOdds,
          winnerMaxOdds,
          placedMinOdds,
          placedMaxOdds,
          showMinOdds,
          showMaxOdds
        });
    }
  }, [odds]);


  useEffect(() => {
    return () => {
      setOddsData({});
    }
  }, []);
  
  

  return (<div className="table-main-odds">
    <MainTableColumn title={dict.page_odds.racer_header}>
        {racers.map((racer, idx) => <div className="row" key={idx}><RacerNumber num={idx + 1} size="29px"/>{racer.name}</div>)}
    </MainTableColumn>

    <div className="main-table-column double-column">
      <div className="div-that-needs-a-className">
        {showPerformance && <PerformanceColumn title={r.performanceHeaderText} data={racers.map(x => x.performance)} additionalStyle={{
              minWidth: '100%'
            }}/>}
          
          {!showPerformance && <HistoryColumn title={r.historyHeaderText} data={racers.map(x => x.history)} additionalStyle={{
              minWidth: '100%'
            }}/>}          
      </div>
    </div>
    <MainTableColumn title={r.winnerHeaderText}>
      {
        Object.keys(odds.winner).map((x, idx) => {
          const currentOdds = odds.winner[x];
          const isMinOdds = oddsData.winnerMinOdds === currentOdds;
          const isMaxOdds = oddsData.winnerMaxOdds === currentOdds;
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
          const isMinOdds = oddsData.placedMinOdds === currentOdds;
          const isMaxOdds = oddsData.placedMaxOdds === currentOdds;
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
          const isMinOdds = oddsData.showMinOdds === currentOdds;
          const isMaxOdds = oddsData.showMaxOdds === currentOdds;
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
};

export default MainTableOdds;
