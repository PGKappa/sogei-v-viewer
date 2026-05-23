import React from "react";

import "./History.scss";
import MainTableColumn from "../../MainTable/Column";
import Cockade from "../../../../Cockade";

const TableRacersInfoColumnHistory = ({ data, title }) => {
  // READ 1st, 2nd, 3rd from dict and remove the ifs
  const dictCockadeTexts = ['NP', '1°', '2°', '3°']
  return <MainTableColumn className="table-racers-info-column-history" title={title}>
    {
      data.map((x, idx) => {
        return (<div className="row" key={idx}>
          <div className="history-row-container">
            {
              ['?', ...x].map((item, index) => {
                if (item == '?') {
                  return (<div className="result-container" key={index}>
                    <div className="next">
                      ?
                    </div>
                  </div>)
                } else if (item > 3 || item == "x") {
                  return (<div className="result-container" key={index}>
                    <div className="np-container">{dictCockadeTexts[0]}</div>
                  </div>)
                }

                return <div className="result-container" key={index}>
                  <Cockade type={item - 1} />
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

export default TableRacersInfoColumnHistory;
