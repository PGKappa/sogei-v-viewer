import React from 'react';
import "./PageError.scss";

import Footer from "../../Footer/Footer.jsx";
import Titlebar from "../../Titlebar/Titlebar.jsx";


const PageError = ({global, dict, channel, previousEvent, nextEvent}) => {
  const { mode = {} } = global;
  const { HIDE_EVENT_TIME = false, HIDE_CHANNEL = false, SHOW_PARTNER_LOGO = false } = mode;
  
  return (<section className="page error">
    <div className="header">
      {SHOW_PARTNER_LOGO && <div className="partner-logo"></div>} 
    </div>

    <div className="dataSection"> 
    <Titlebar text={"ERRORE"} className="primary"/>
		
    </div>

    <Footer dict={dict} showLegend={false}/>
  </section>);
}
export default PageError;
