import React, { useEffect, useState } from 'react';

import "./Latecomers.scss";
import RacerNumber from "../RacerNumber/RacerNumber.jsx";
import Titlebar from "../Titlebar/Titlebar.jsx";

const Latecomers = ({ dict, data }) => {

  const [r, setR] = useState({
    panelLatecomersHeaderText: '',
    panelLatecomersMarketHeaderText: '',
    panelLatecomersResultHeaderText: '',
    panelLatecomersDelayHeaderText: '',
    panelLatecomersWinnerDescText: '',
    panelLatecomersExactaDescText: '',
    panelLatecomersTrifectaDescText: '',
  });

  useEffect(() => {
    if (dict) {

      let panelLatecomersHeaderText = '',
        panelLatecomersMarketHeaderText = '',
        panelLatecomersResultHeaderText = '',
        panelLatecomersDelayHeaderText = '',
        panelLatecomersWinnerDescText = '',
        panelLatecomersExactaDescText = '',
        panelLatecomersTrifectaDescText = '';

      if (dict.panel_latecomers) {
        panelLatecomersHeaderText = dict.panel_latecomers.header;

        panelLatecomersMarketHeaderText = dict.panel_latecomers.market_header;
        panelLatecomersResultHeaderText = dict.panel_latecomers.result_header;
        panelLatecomersDelayHeaderText = dict.panel_latecomers.delay_header;

        panelLatecomersWinnerDescText = dict.panel_latecomers.winner_desc;
        panelLatecomersExactaDescText = dict.panel_latecomers.exacta_desc;
        panelLatecomersTrifectaDescText = dict.panel_latecomers.trifecta_desc;
      }

      setR({
        panelLatecomersHeaderText: panelLatecomersHeaderText,
        panelLatecomersMarketHeaderText: panelLatecomersMarketHeaderText,
        panelLatecomersResultHeaderText: panelLatecomersResultHeaderText,
        panelLatecomersDelayHeaderText: panelLatecomersDelayHeaderText,

        panelLatecomersWinnerDescText: panelLatecomersWinnerDescText,
        panelLatecomersExactaDescText: panelLatecomersExactaDescText,
        panelLatecomersTrifectaDescText: panelLatecomersTrifectaDescText,

      })

    }
  }, [dict]);


  return <section className="latecomers-table">
    <div className="header">
      <Titlebar text={r.panelLatecomersHeaderText} className="latecomers-table-title-bar" />

      <div className="latecomers-table-column-titles">
        {["Market", "Result", "Delay"].map((item, idx) => <div className={idx==0 || idx==2 ?'column-title latec':'column-title latec2' } key={idx}>{r[`panelLatecomers${item}HeaderText`]}</div>)}
      </div>
    </div>

    <div className="content latecomers-table-internal">
      <div className="latecomers-table-column ">
        {["Winner", "Exacta", "Trifecta"].map((item, idx) => <div className="row-title" key={idx}>{r[`panelLatecomers${item}DescText`]}</div>)}
      </div>

      <div className="latecomers-table-column">
        {
          [data.winner.racers, data.exacta.racers, data.trifecta.racers].map((item, mainIdx) => <div className="racer-container" key={mainIdx}>
            <div className="racer-internal">
              {item.map((subItem, idx) => <RacerNumber num={subItem} key={idx} />)}
            </div>
          </div>)
        }
      </div>

      <div className="latecomers-table-column">
        {
          [data.winner.delay, data.exacta.delay, data.trifecta.delay].map((item, idx) => <div className="delay-container" key={idx}>
            {item}
          </div>)
        }
      </div>
    </div>
  </section>
}

export default Latecomers;
