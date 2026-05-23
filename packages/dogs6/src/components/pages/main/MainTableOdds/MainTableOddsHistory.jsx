import React from "react";

import "./MainTableOddsHistory.scss";
import MainTableColumn from "./MainTableOddsColumn.jsx";
import Cockade from "../../../Cockade";

const MainPageTableOddsHistory = ({data, title}) => {
  // READ 1st, 2nd, 3rd from dict and remove the ifs
  const dictCockadeTexts = ['NP', '1°', '2°', '3°']
  return <MainTableColumn className="history" title={title}>
    {
      data.map((x, idx) => {
        return (<div className="row" key={idx}>
          <div className="history-row-container">
            {
              x.map((item, index) => {
                if (item > 3 || item == "x") {
                  return (<div className="result-container" key={(index + 1) * 10}>
                    <div className="np-container">{dictCockadeTexts[0]}</div>
                  </div>)
                }

                return <div className="result-container" key={index}>
                  <Cockade type={item - 1}/>
                  <p className="cockade-text">{dictCockadeTexts[item]}</p>
                </div>
              })
            }
          </div>
        </div>)
      })
    }
  </MainTableColumn>
}

export default MainPageTableOddsHistory;
