import React from 'react';
import "./ErrorPage.scss";

import Footer from "../../Footer/Footer.jsx";
import Titlebar from "../../Titlebar/Titlebar.jsx";


const ErrorPage = ({dict, channel, previousEvent, nextEvent}) => {
  return (<section className="page error">
    <div className="header">
      <Titlebar text={"ERROR"} className="primary"/> 
    </div>

    <div className="dataSection">
		
    </div>

    <Footer dict={dict} showLegend={false}/>
  </section>);
}
export default ErrorPage;
