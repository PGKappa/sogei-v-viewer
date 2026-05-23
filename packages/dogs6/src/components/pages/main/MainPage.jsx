import React, { useEffect, useState } from "react";

import "./MainPage.scss";
import OddsPage from "../OddsPage.jsx";

import ExactaTableOdds from "./ExactaTableOdds/ExactaTableOdds.jsx";
import QuinellaTableOdds from "./QuinellaTableOdds/QuinellaTableOdds.jsx";
import BoxedTrifectaTableOdds from "./BoxedTrifectaTableOdds";
import OthersTableOdds from "./OthersTableOdds/OthersTableOdds.jsx";
import MainTableOdds from "./MainTableOdds/MainTableOdds.jsx";

const MainPage = ({
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
  sortedExactaOdds,
  sortedExactaOddsByValue,
  getCountdown,
  lastResultsData,
  startTime,
  isFullMode,
  global,
  headerVersion,
  switchTabDelay = 5000,
}) => {
  const [isQuinellaTab, setQuinellaTab] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setQuinellaTab(!isQuinellaTab);
    }, switchTabDelay);

    return () => {
      setQuinellaTab(true);
    };
  }, [eventId]);

  return (
    <>
        <OddsPage
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
          <MainTableOdds
            racers={racers}
            odds={odds}
            dict={dict}
            showPerformance={isQuinellaTab}
          />
          <ExactaTableOdds
            dict={dict}
            sortedExactaOdds={sortedExactaOdds}
            sortedExactaOddsByValue={sortedExactaOddsByValue}
          />
          <div
            className="quinella-div"
            style={{
              background: "transparent",
            }}
          >
            <div className="slider-wrapper">
              {isQuinellaTab && (
                <QuinellaTableOdds odds={odds.quinella} dict={dict} />
              )}
              {!isQuinellaTab && (
                <BoxedTrifectaTableOdds odds={odds.boxedtrifecta} dict={dict} />
              )}
            </div>
            <OthersTableOdds dict={dict} odds={odds} />
          </div>
        </OddsPage>
      
    </>
  );
};

export default MainPage;
