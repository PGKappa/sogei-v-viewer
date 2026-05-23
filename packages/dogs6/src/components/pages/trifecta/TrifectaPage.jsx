import React from "react";
import "./TrifectaPage.scss";
import OddsPage from "../OddsPage.jsx";
import TrifectaTable from "./TrifectaTableOdds/TrifectaTableOdds.jsx";

const TrifectaPage = React.memo(
  ({
    version,
    channel,
    fineGiorno,
    trackName,
    dict,
    lastResultsData,
    latecomersData,
    odds,
    startTime,
    palimpsestId,
    eventId,

    sortedTrifectaOdds,
    sortedTrifectaOddsByValue,

    getCountdown,
    isFullMode,
    global,
    headerVersion,
    showTagReal,
  }) => {
    return (
      <>
        
          <OddsPage
            version={version}
            showTagReal={showTagReal}
            global={global}
            isFullMode={isFullMode}
            palimpsestId={palimpsestId}
            eventId={eventId}
            startTime={startTime}
            getCountdown={getCountdown}
            channel={channel}
            dict={dict}
            lastResultsData={lastResultsData}
            latecomersData={latecomersData}
            headerVersion={headerVersion}
            trackName={trackName}
          >
            <TrifectaTable
              dict={dict}
              odds={odds}
              sortedTrifectaOdds={sortedTrifectaOdds}
              sortedTrifectaOddsByValue={sortedTrifectaOddsByValue}
            />
          </OddsPage>
        
      </>
    );
  }
);

export default TrifectaPage;
