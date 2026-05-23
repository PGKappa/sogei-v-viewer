import React, { useState, useEffect } from 'react';

import "./TrifectaTableOdds.scss";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const TrifectaTableOdds = React.memo(({ dict, odds, sortedTrifectaOdds = [], sortedTrifectaOddsByValue = [] }) => {
  const trifectaOdds = odds.trifecta;
  const trifectaMinOdds = sortedTrifectaOddsByValue[0],
    trifectaMaxOdds = sortedTrifectaOddsByValue[sortedTrifectaOddsByValue.length - 1];

  let trifectaCount = 0;

  const [r, setR] = useState({
    trifectaHeaderText: ''
  });

  useEffect(() => {

    if (dict) {
      let trifectaHeaderText = '';
      if (dict.page_odds) {
        trifectaHeaderText = dict.page_odds.trifecta_header;
      }

      setR({
        trifectaHeaderText: trifectaHeaderText
      });
    }
  }, [dict]);


  function checkAndUpdateRacerData(racerData, inputNumber) {
    const num = parseFloat(inputNumber);
    if (isNaN(num)) return { result: '', updatedData: racerData };
  
    const numToCheck = parseFloat(num.toFixed(2));
    let result = '';
    let updatedData = [...racerData]; // Creiamo una copia dell'array originale
  
    for (let i = 0; i < updatedData.length; i++) {
      const racer = updatedData[i];
      const racerMin = racer.min? parseFloat(racer.min.toFixed(2)):0;
      const racerMax = racer.max?  parseFloat(racer.max.toFixed(2)):0;
  
      if (numToCheck === racerMin) {
        result = 'min';
        // Rimuoviamo il min trovato creando un nuovo oggetto senza quel valore
        updatedData[i] = { ...racer, min: null }; // o possiamo eliminare la proprietà
        break;
      }
      if (numToCheck === racerMax) {
        result = 'max';
        // Rimuoviamo il max trovato
        updatedData[i] = { ...racer, max: null };
        break;
      }
    }
  
    return { result, updatedData };
  }

  return (<div id="trifecta-table-odds">
    <Titlebar text={r.trifectaHeaderText} className="trifecta-table-title-bar" />

   
    <div className="trifecta-table-content">
      {(() => {
        // Calcoliamo resultsmm una sola volta all'inizio
        const racerOdds = {};
        
        sortedTrifectaOdds.forEach(item => {
          const firstRacer = item.racers[0];
          const odds = parseFloat(item.odds);
          
          if (!racerOdds[firstRacer]) {
            racerOdds[firstRacer] = {
              min: odds,
              max: odds,
              count: 1
            };
          } else {
            if (odds < racerOdds[firstRacer].min) {
              racerOdds[firstRacer].min = odds;
            }
            if (odds > racerOdds[firstRacer].max) {
              racerOdds[firstRacer].max = odds;
            }
            racerOdds[firstRacer].count++;
          }
        });

        let resultsmm = Object.keys(racerOdds).map(racer => ({
          racer,
          min: racerOdds[racer].min,
          max: racerOdds[racer].max,
          count: racerOdds[racer].count
        }));

        let trifectaCount = 0;
        
        return Array.apply(null, Array(6)).map((_, colIdx) => {
          return (
            <div className="trifecta-table-column" key={colIdx}>
              {Array.apply(null, Array(20)).map((__, rowIdx) => {
                const trifectaData = sortedTrifectaOdds[trifectaCount++];
                if (!trifectaData) return null;
                
                // Facciamo una copia di resultsmm per evitare mutazioni dirette
                const currentResults = [...resultsmm];
                const p = checkAndUpdateRacerData(currentResults, trifectaData.odds);
                
                // Aggiorniamo resultsmm solo se c'è un match
                if (p.result !== '') {
                  resultsmm = p.updatedData;
                }

                return (
                  <div className={`trifecta-table-entry ${p.result}`} key={rowIdx}>
                    <div className="trifecta-table-num-container">
                      {trifectaData.racers.map((racer, racerIdx) => (
                        <RacerNumber num={racer} key={racerIdx} />
                      ))}
                    </div>
                    <div className="trifecta-odds">{trifectaData.odds}</div>
                  </div>
                );
              })}
            </div>
          );
        });
      })()}
    </div>


  </div>);
});

export default TrifectaTableOdds;
