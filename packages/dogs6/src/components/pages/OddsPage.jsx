import React, { Fragment } from 'react';
import Header from "../Header";
import PanelLastEvents from "../PanelLastEvents/PanelLastEvents.jsx";
import PanelLatecomers from "../PanelLatecomers/PanelLatecomers.jsx";

import "./OddsPage.scss";

const OddsPage = ({
  version,
  channel,
  trackName,
  dict,
  lastResultsData,
  latecomersData,

  startTime,
  palimpsestId,
  eventId,

  showTagReal = false,

  headerVersion = 'v1',
  getCountdown,
  children,
  global
}) => {
  return (<Fragment>
    <Header
      global={global}
      getCountdown={getCountdown}
      dict={dict}
      trackName={trackName}
      channel={channel}
      palimpsestId={palimpsestId}
      eventId={eventId}
      startTime={startTime}
      version={headerVersion}
      showTagReal={showTagReal}
    />
    <section className="main">

      <div className="wrapper">

        <div className="version-container">
          <p className="version">{version}</p>
        </div>

        <div className="left">
          {children}
        </div>

        <div className="right">
          <PanelLastEvents dict={dict} data={lastResultsData} num={9} />
          <PanelLatecomers dict={dict} data={latecomersData} />
        </div>

      </div>
    </section>
  </Fragment>);
};

export default OddsPage;
