import React, { useEffect, useState } from 'react';

import "./Footer.scss";

const Footer = ({ dict, showLegend, slidingText, version = "v2" }) => {
  const formattedSlidingText = slidingText ? slidingText.replace(/ /g, '\u00a0') : '';

  const [r, setR] = useState({
    legendMinOdds: '',
    legendMaxOdds: ''
  });

  useEffect(() => {
    if (dict) {
      let legendMinOdds = '',
        legendMaxOdds = '';

      if (dict.main_footer) {
        legendMinOdds = dict.main_footer.legend_min_odds;
        legendMaxOdds = dict.main_footer.legend_max_odds;
      }

      setR({
        legendMinOdds: legendMinOdds,
        legendMaxOdds: legendMaxOdds
      });
    }
  }, [dict]);

  return (<section className={"footer " + version}>
    {
      showLegend && (<div className="legend">
        <div className="min-odds">
          <div className="color"></div>
          <span className="text">{r.legendMinOdds}</span>
        </div>
        <div className="max-odds">
          <div className="color"></div>
          <span className="text">{r.legendMaxOdds}</span>
        </div>
      </div>)
    }
    {
      slidingText && <div className="scrolling-text-container">
        <span className="scrolling-text-1">{formattedSlidingText}</span>
        <span className="scrolling-text-2">{formattedSlidingText}</span>
      </div>
    }
  </section>);
};

export default Footer;
