import React from 'react';
import "./Titlebar.scss"
const Titlebar = ({ text = "", className }) => {
  return <div className={"titlebar" + (className ? " " + className : "")}>
    {
      text.toString().split(" ").map((x, idx) => <span key={idx}>{x}</span>)      
    }
  </div>
}
export default Titlebar;
