import React from 'react';

import "./BoxedTrifectaTableOdds.scss";
import RacerNumber from "../../../RacerNumber";
import Titlebar from "../../../Titlebar";

const BoxedTrifectaTableOdds = ({ dict, sortedBoxedTrifectaOdds=[], sortedBoxedTrifectaOddsByValue=[] }) => {
  const boxedTrifectaMinOdds = sortedBoxedTrifectaOddsByValue[0],
    boxedTrifectaMaxOdds = sortedBoxedTrifectaOddsByValue[sortedBoxedTrifectaOddsByValue.length - 1];

  let array = [0, 1, 2, 3];
  let boxedTrifectaCount = -1;

  const [r, setR] = useState({
    boxedTrifectaHeaderText: ''
  });

  useEffect(() => {
    
    if (dict) {
      let boxedTrifectaHeaderText = '';
      if (dict.page_odds) {        
        boxedTrifectaHeaderText = dict.page_odds.boxedtrifecta_header;
      }

      setR({
        boxedTrifectaHeaderText: boxedTrifectaHeaderText,
        
      });
    }    
  }, [dict]);

  return (
    <div id="boxedtrifecta-table-odds"><Titlebar text={boxedTrifectaHeaderText} className="boxedtrifecta-table-title-bar" />

      <div className="boxedtrifecta-table-content">
        {
          [0, 1, 2, 3, 4].map((item) => {
            return (<div className="boxedtrifecta-table-column" key={item}>
              {
                array.map((idx) => {
                  boxedTrifectaCount++;

                  const data = sortedBoxedTrifectaOdds[boxedTrifectaCount];
                  
                  const odds = data  ? data.odds : "";                  
                  let type = "";

                  if (odds) {  
                    if (boxedTrifectaMinOdds === data.odds) {
                      type = "min";
                    } else if (boxedTrifectaMaxOdds === data.odds) {
                      type = "max";
                    }
                  }  
                  const racers  = data ? data.racers || [] : [];

                  // if (item < 5) {
                  // console.log()
                  return <div className={`boxedtrifecta-table-entry ${type}`} key={idx}>
                    <div className="boxedtrifecta-table-num-container">
                      {racers.map((racer, racerIdx) => <RacerNumber num={racer} key={racerIdx} />)}
                    </div>

                    <div className="boxedtrifecta-table-odds">{odds}</div>
                  </div>
                  //}
                  //return null;
                })
              }
            </div>)
          })
        }
      </div>
    </div>);
};

export default BoxedTrifectaTableOdds;
//{<MainPageOthersTableOdds/>}
