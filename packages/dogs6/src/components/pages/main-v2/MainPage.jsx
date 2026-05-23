import React, { useCallback, useMemo, useEffect } from "react";

import "./MainPage.scss";
import PageOdds from "../OddsPage.jsx";

import TableRacersInfo from "./TableRacersInfo";
import MainTableOdds from "./MainTableOdds";
import RacerNumber from "../../RacerNumber";

const PageMain = ({
  version,
  fineGiorno,
  channel,
  trackName,
  dict,
  racers,
  latecomersData,
  odds,
  palimpsestId,
  eventId,

  getCountdown,
  lastResultsData,
  startTime,
  isFullMode,
  global,
  headerVersion,
  showTagReal,
}) => {
  const r = useMemo(() => {
    if (!dict)
      return {
        othersEvenText: "",
        othersOddText: "",
        othersUnderText: "",
        othersOverText: "",
      };

    let othersEvenText = "",
      othersOddText = "",
      othersUnderText = "",
      othersOverText = "";

    if (dict.page_odds) {
      othersEvenText = dict.page_odds.others_even;
      othersOddText = dict.page_odds.others_odd;

      othersUnderText = dict.page_odds.others_under;
      othersOverText = dict.page_odds.others_over;
    }

    return {
      othersEvenText: othersEvenText,
      othersOddText: othersOddText,
      othersUnderText: othersUnderText,
      othersOverText: othersOverText,
    };
  }, [dict]);

  const racerNumberRenderer = useCallback((idx) => {
    return <RacerNumber key={idx} num={idx + 1} />;
  }, []);

  const evenOddLeftItemRenderer = useCallback(
    (idx) => {
      return <span>{[r.othersEvenText, r.othersOddText][idx]}</span>;
    },
    [r]
  );

  const underOverLeftItemRenderer = useCallback(
    (idx) => {
      return <span>{[r.othersUnderText, r.othersOverText][idx]}</span>;
    },
    [r]
  );


  useEffect(() => {
   // console.log("DICT", dict, 'Gine Giorno' , fineGiorno);
    //console.log('global - next', global)
    if(fineGiorno){
      setTimeout(function () {
        window.location.reload();
     //   console.log('RELOADDDDDDDDDDD');
      }, 50000);

    }else{
   //   console.log('NOOOO RELOADDDDDDDDDDD');
    }

  }, []);

  return (
    <>
      
        <PageOdds
          showTagReal={showTagReal}
          isFullMode={isFullMode}
          global={global}
          version={version}
          getCountdown={getCountdown}
          palimpsestId={palimpsestId}
          eventId={eventId}
          startTime={startTime}
          channel={channel}
          dict={dict}
          lastResultsData={lastResultsData}
          latecomersData={latecomersData}
          headerVersion={headerVersion}
          trackName={trackName}
        >
          <TableRacersInfo racers={racers} dict={dict} />
          <MainTableOdds
            directionRow
            leftItemRenderer={racerNumberRenderer}
            market="winner"
            odds={odds}
            dict={dict}
          />
          <MainTableOdds
            directionRow
            leftItemRenderer={racerNumberRenderer}
            market="placed"
            odds={odds}
            dict={dict}
          />
          <MainTableOdds
            directionRow
            leftItemRenderer={racerNumberRenderer}
            market="show"
            odds={odds}
            dict={dict}
          />
          <div className="wrapper-others">
            <MainTableOdds
              directionRow
              leftItemRenderer={evenOddLeftItemRenderer}
              market="evenodd"
              odds={odds}
              dict={dict}
            />
            <MainTableOdds
              directionRow
              leftItemRenderer={underOverLeftItemRenderer}
              market="underover"
              odds={odds}
              dict={dict}
            />
          </div>
        </PageOdds>
      
    </>
  );
};

export default PageMain;
