import React, { useState, useEffect } from 'react';

import "./PanelLastEvents.scss";

import RacerNumber from "../RacerNumber/RacerNumber.jsx";
import Titlebar from "../Titlebar/Titlebar.jsx";

const PanelLastEvents = ({ dict, data, num = 9 }) => {
  const [r, setR] = useState({
    panelLastEventsHeaderText: '',
    panelLastEventsTimeHeaderText: '',
    panelLastEventsEventHeaderText: '',
    panelLastEventsArrivalHeaderText: ''

  })

  useEffect(() => {
    if (dict) {
      let panelLastEventsHeaderText = '',
        panelLastEventsTimeHeaderText = '',
        panelLastEventsEventHeaderText = '',
        panelLastEventsArrivalHeaderText = '';

      if (dict.panel_last_events) {
        panelLastEventsHeaderText = dict.panel_last_events.header
        panelLastEventsTimeHeaderText = dict.panel_last_events.time_header;
        panelLastEventsEventHeaderText = dict.panel_last_events.event_header;
        panelLastEventsArrivalHeaderText = dict.panel_last_events.arrival_header;
      }

      setR({
        panelLastEventsHeaderText: panelLastEventsHeaderText,
        panelLastEventsTimeHeaderText: panelLastEventsTimeHeaderText,
        panelLastEventsEventHeaderText: panelLastEventsEventHeaderText,
        panelLastEventsArrivalHeaderText: panelLastEventsArrivalHeaderText,
      })
    }
  }, [dict]);
  const concreteData = (data || []).slice(0, num);
  return (<div className="last-events-table">
    <div className="header">
      <Titlebar text={r.panelLastEventsHeaderText} className="primary" />

      <div className="secondary">
        <Titlebar text={r.panelLastEventsTimeHeaderText} className="time ris1" />
        <Titlebar text={r.panelLastEventsEventHeaderText} className="event ris2" />
        <Titlebar text={r.panelLastEventsArrivalHeaderText} className="arrival ris3" />
      </div>
    </div>

    <div className="content">
      <div className="column time">
        {
          concreteData.map((item, idx) => {
            return (<div className="row time" key={idx}>
              {item.start_time}
            </div>);
          })
        }
      </div>

      <div className="column event">
        {
          concreteData.map((item, idx) => {
            //let tempId = `${item.id.substr(0, item.id.length - 4)} - ${item.id.substr(item.id.length - 4)}`;

            return (<div className="row event" key={idx}>
              <span>{item.ext_pal_id}-{item.ext_event_id}</span>
            </div>);
          })
        }
      </div>

      <div className="column arrival">
        {
          concreteData.map((item, idx) => {

            return (<div className="row arrival" key={idx}>
              {
                (item.arrival || []).map((racerData, racerIdx) => {
                  return <div className="racer-container" key={racerIdx}>
                    <RacerNumber num={racerData.number} />
                    <div className="racer-name">{racerData.name}</div>
                  </div>
                })
              }
            </div>);
          })
        }
      </div>
    </div>
  </div>);
};

export default PanelLastEvents;
