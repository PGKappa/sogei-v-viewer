import React, {useState, useEffect} from 'react';

import "./OthersTableOdds.scss";

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

const OthersTableOdds = ({dict, odds}) => {

  const [count, setCount] = React.useState(0);
  const [ord, setOrd] = React.useState([0,1]);
  const shuffle = debounce(function a(a, delay, ord) {
    console.log("ordd:" ,  ord)
    setOrd( [...ord.slice(1), ...ord.slice(0, 1)]);
  }, 7000, ord);
  React.useEffect(() => {
    shuffle();
  });

  const data = [
    {
      market: dict.page_odds.others_even,
      odds: odds['oddeven']['even']
    }, {
      market: dict.page_odds.others_odd,
      odds: odds['oddeven']['odd']
    }, {
      market: dict.page_odds.others_under,
      odds: odds['underover']['under']
    }, {
      market: dict.page_odds.others_over,
      odds: odds['underover']['over']
    }
  ];

  return (<section id="others-table-odds">
      <div className="others-table-title-bar">
        <p className="others-table-title">{dict.page_odds.others_header}</p>
      </div>

          <div className="others-table-content">
            <div className={`others-table-content-wrapper vertical-scroll-${ord[0]}`}>
            {
              data.map((item, idx) => {
                  return (
                    <div className={"others-panel-content-item "} key={idx}>
                        <p className="others-panel-content-item-title">{item.market}</p>
                        <p className="others-panel-content-item-odds">{item.odds}</p>
                    </div>
                  );
              })
            }
            </div>

            <div className={`others-table-content-wrapper vertical-scroll-${ord[1]}`}>
            {
              data.map((item, idx) => {
                  return (
                    <div className={"others-panel-content-item "} key={idx}>
                        <p className="others-panel-content-item-title">{item.market}</p>
                        <p className="others-panel-content-item-odds">{item.odds}</p>
                    </div>
                  );
              })
            }
            </div>
      </div>
  </section>)
}

export default OthersTableOdds;