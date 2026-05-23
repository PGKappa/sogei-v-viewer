import React from "react";
import "./PageSecondary.scss";
import OddsPage from "../OddsPage.jsx";

import ExactaTableOdds from "./ExactaTableOdds/ExactaTableOdds.jsx";
import QuinellaTableOdds from "./QuinellaTableOdds/QuinellaTableOdds.jsx";
import BoxedTrifectaTableOdds from "./BoxedTrifectaTableOdds";

const PageSecondary = ({
  version,
  fineGiorno,
  channel,
  trackName,
  dict,
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
  sortedExactaOdds,
  sortedExactaOddsByValue,

  sortedBoxedTrifectaOdds,
  sortedBoxedTrifectaOddsByValue,

  showTagReal,
}) => {
  return (
    <>
        <OddsPage
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
          <ExactaTableOdds
            dict={dict}
            sortedExactaOdds={sortedExactaOdds}
            sortedExactaOddsByValue={sortedExactaOddsByValue}
          />
          <QuinellaTableOdds odds={odds.quinella} dict={dict} />
          <BoxedTrifectaTableOdds
            dict={dict}
            sortedBoxedTrifectaOdds={sortedBoxedTrifectaOdds}
            sortedBoxedTrifectaOddsByValue={sortedBoxedTrifectaOddsByValue}
          />
        </OddsPage>
    </>
  );
};
//

export default PageSecondary;
