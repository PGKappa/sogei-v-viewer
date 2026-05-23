import React, { Fragment, useEffect, useState, useMemo } from "react";
import "./ResultPage.scss";
import RacerNumber from "../../RacerNumber/RacerNumber.jsx";
import Header from "../../Header";
import Footer from "../../Footer/Footer.jsx";
import Multiplier from "../../Multiplier/Multiplier.jsx";
import Titlebar from "../../Titlebar/Titlebar.jsx";
import Cockade from "../../Cockade";

const ResultPage = ({
  dict,
  inizioGiorno,
  fineGiorno,
  channel,
  trackName,
  previousEvent,
  nextEvent,
  multiEnabled = false,
  global,
  headerVersion = "v1",
  footerVersion = "v1",
  showTagReal = false,
}) => {
  const { mode = {} } = global;
  const {
    HIDE_EVENT_TIME = false,
    HIDE_CHANNEL = false,
    SHOW_PARTNER_LOGO = false,
  } = mode;

  const [rowTitles, setRowTitles] = useState([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]),
    [r, setR] = useState({
      mainHeaderTagRealText: "",
      pageResultsHeaderText: "",
      nextRaceTimeDescText: "",
      nextRacePalDescText: "",
      nextRaceCodeDescText: "",
      gameNameText: "",
    });

  const {
    palimpsestId,
    eventId,
    startTime,
    arrival = [],
    odds,
    multi = "",
  } = previousEvent;

  const [racerNumbers, setRacerNumbers] = useState([]),
    [names, setNames] = useState([]),
    [quinellaArrival, setQuinellaArrival] = useState([]),
    [boxedTrifectaArrival, setBoxedTrifectaArrival] = useState([]);

  useEffect(() => {

    console.log("Inizio Giorno ", inizioGiorno);
    console.log("Fine Giorno ", fineGiorno);
    
    const newRacerNumbers = arrival.map((x) => x.number);
    setRacerNumbers(newRacerNumbers);
    setNames(arrival.map((x) => x.name));
    setQuinellaArrival(newRacerNumbers.slice(0, 2).sort());
    setBoxedTrifectaArrival(newRacerNumbers.slice(0, 3).sort());
  }, [arrival]);

  useEffect(() => {
    if (dict) {
      let nextRacePalDescText = "",
        gameNameText = "",
        pageResultsHeaderText = "",
        nextRaceTimeDescText = "",
        nextRaceCodeDescText = "",
        pageResults = {},
        mainHeaderTagRealText = "",
        nextRaceHeaderText = "";

      if (dict.main_header) {
        nextRacePalDescText = dict.main_header.next_race_pal_desc;
        mainHeaderTagRealText = dict.main_header.tag_real;
        gameNameText = !showTagReal ? gameNameText.toUpperCase() : gameNameText;
      }
      if (dict.page_results) {
        setRowTitles(
          [
            "arrival_desc",
            "winner_desc",
            "placed_desc",
            "show_desc",
            "exacta_desc",
            "quinella_desc",
            "trifecta_desc",
            "boxedtrifecta_desc",
            "evenodd_desc",
            "underover_desc",
          ].map((x) => dict.page_results[x])
        );

        pageResultsHeaderText = dict.page_results.header;
        nextRaceTimeDescText = dict.page_results.next_race_time_desc;
        nextRaceCodeDescText = dict.page_results.next_race_code_desc;

        nextRaceHeaderText = dict.page_results.next_race_header;
        pageResults = dict.page_results;
      }

      setR({
        pageResultsHeaderText: pageResultsHeaderText,
        nextRacePalDescText: nextRacePalDescText,
        nextRaceTimeDescText: nextRaceTimeDescText,
        nextRaceCodeDescText: nextRaceCodeDescText,
        mainHeaderTagRealText: mainHeaderTagRealText,
        gameNameText: gameNameText,
        nextRaceHeaderText: nextRaceHeaderText,
        pageResults: pageResults,
      });
    }
  }, [dict]);

  const rr = useMemo(() => {
    if (!dict)
      return {
        mainHeaderTagRealText: "",
        gameNameText: "",
        raceDescText: "",
        timeDescText: "",
        palDescText: "",
        codeDescText: "",
        nextRaceDescText: "",
      };

    let mainHeaderTagRealText = "",
      raceDescText = "",
      timeDescText = "",
      palDescText = "",
      codeDescText = "",
      nextRaceDescText = "",
      gameNameText = "";

    if (dict.main_header) {
      mainHeaderTagRealText = dict.main_header.tag_real;
      gameNameText = !showTagReal
        ? (dict.main_header.full_game_name || "").toUpperCase()
        : dict.main_header.game_name;
    }

    if (dict.page_video) {
      raceDescText = dict.page_video.race_desc;
      timeDescText = dict.page_video.time_desc;
      palDescText = dict.page_video.pal_desc;
      codeDescText = dict.page_video.code_desc;
      nextRaceDescText = dict.page_video.next_race_desc;
    }

    return {
      mainHeaderTagRealText: mainHeaderTagRealText,
      gameNameText: gameNameText,
      raceDescText: raceDescText,
      timeDescText: timeDescText,
      palDescText: palDescText,
      codeDescText: codeDescText,
      nextRaceDescText: nextRaceDescText,
    };
  }, [dict]);

  const isValidArrival = racerNumbers.length == 3;

  const tagRealText = r.mainHeaderTagRealText,
    shouldShowTagReal = showTagReal && tagRealText,
    gameName = r.gameNameText;

  return (
    <>
      {" "}
      {!inizioGiorno &&  (
        <section className="page resultSection full">
          <div className="results-header header">
            <div className="footerSection">
              <div className="left">
                <div className="game-icon-wrapper"></div>
                <p className="game-name">
                  {rr.gameNameText}
                  {
                    <span className="tag-real empty">
                      {r.mainHeaderTagRealText}
                    </span>
                  }
                </p>
                <p className="event-name pal2">{trackName}</p>
              </div>
            </div>

            {/* SHOW_PARTNER_LOGO && <div className="partner-logo"></div> **/}

            {
              <p
                style={{
                  position: "absolute",
                  top: 105,
                  left: 20,
                  width: "100%",
                  zIndex: 999999,
                  color: "white",
                }}
                className="partner-logo"
              ></p>
            }
          </div>

          {
            <Fragment>
              <p
                style={{
                  position: "absolute",
                  textShadow: "3px 3px #333",
                  fontSize: 45,
                  top: 70,
                  right: 30,
                  zIndex: 999999,
                  color: "white",
                }}
                className="event-starttime"
              >
                {channel == "CH1" && <div className="cani-logo"></div>}
                {channel == "CH2" && <div className="cavalli-logo"></div>}
              </p>
            </Fragment>
          }

          <div className="dataSection">
            <div className="internalContainer">
              <section id="header-v2">
                <div className="secondary">
                  <div className="left ">
                    <div className="game-details">
                      <div className="primary">
                        <p className="game-name"></p>
                      </div>
                      <div className="secondary">
                        <p className="event-name startora">{`ORA ${startTime}`}</p>
                      </div>
                    </div>

                    <div className="event-details">
                      <p className="row1"></p>

                      <p className="pal-and-code  Palev">
                        {r.nextRacePalDescText} {palimpsestId} -{" "}
                        {r.nextRaceCodeDescText} {eventId}
                      </p>
                    </div>
                  </div>

                  <div className="right"></div>
                </div>
              </section>
              <div className="title-container">
                <Titlebar text={r.pageResultsHeaderText} />
                {multiEnabled && <Multiplier value={multi} />}
              </div>
              <div className="table-content">
                <div className="dataColumn">
                  {rowTitles.map((title, idx) => (
                    <div
                      className="columnResult columnTitleContainer"
                      key={idx}
                    >
                      <p className="columnTitle">{title}</p>
                    </div>
                  ))}
                </div>

                <div className="dataColumn">
                  <div className="columnResult columnMedalContainerTop">
                    {racerNumbers.map((racer, idx) => (
                      <div className="dataContainerTop" key={idx}>
                        <div className="racerInfoContainer" key={idx}>
                          <div className="racerInfoInternal" key={idx}>
                            <RacerNumber key={idx} num={racer} />

                            <div className="racerMedalTopContainer">
                              <Cockade type={idx} />
                              <p className="racerMedalTopText">
                                {idx + 1}&deg;
                              </p>
                            </div>
                          </div>
                         
                        </div>
                        <p className="racerName">{names[idx]}</p>
                      </div>
                    ))}
                  </div>

                  <div className="columnResult columnMedalContainerTriple">
                    <div className="columnMedalContainerTripleInternal">
                      {isValidArrival && (
                        <Fragment>
                          <RacerNumber
                            className="racerTop"
                            num={racerNumbers[0]}
                          />

                          <div className="racerOddsContainer">
                            <p className="racerOdds">
                              {odds["winner"][racerNumbers[0]]}
                            </p>
                          </div>
                        </Fragment>
                      )}
                    </div>

                    <div className="columnMedalContainerTripleInternal">
                      <div className="racerSubContainer"></div>
                    </div>
                    <div className="columnMedalContainerTripleInternal"></div>
                  </div>

                  <div className="columnResult columnMedalContainerTriple">
                    <div className="columnMedalContainerTripleInternal">
                      {isValidArrival && (
                        <Fragment>
                          <RacerNumber
                            className="racerTop"
                            num={racerNumbers[0]}
                          />

                          <div className="racerOddsContainer">
                            <p className="racerOdds">
                              {odds["placed"][racerNumbers[0]]}
                            </p>
                          </div>
                        </Fragment>
                      )}
                    </div>

                    <div className="columnMedalContainerTripleInternal">
                      <div className="racerSubContainer">
                        {isValidArrival && (
                          <Fragment>
                            <RacerNumber
                              className="racerTop"
                              num={racerNumbers[1]}
                            />

                            <div className="racerOddsContainer">
                              <p className="racerOdds">
                                {odds["placed"][racerNumbers[1]]}
                              </p>
                            </div>
                          </Fragment>
                        )}
                      </div>
                    </div>

                    <div className="columnMedalContainerTripleInternal"></div>
                  </div>

                  <div className="columnResult columnMedalContainerTriple">
                    {racerNumbers.map((x, idx) => (
                      <div
                        key={idx}
                        className="columnMedalContainerTripleInternal"
                      >
                        <RacerNumber className="racerTop" num={x} />

                        <div className="racerOddsContainer">
                          <p className="racerOdds">{odds["show"][x]}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="columnResult columnNormal">
                    <div className="racerContainerDouble racerContainerDoubleS">
                      {racerNumbers.slice(0, 2).map((x, idx) => (
                        <RacerNumber key={idx} className="racerTop" num={x} />
                      ))}
                    </div>

                    <div className="racerOddsContainer">
                      {isValidArrival && (
                        <p className="racerOdds">
                          {odds["exacta"][racerNumbers[0]][racerNumbers[1]]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="columnResult columnNormal">
                    <div className="racerContainerDouble racerContainerDoubleS">
                      {quinellaArrival.map((x, idx) => (
                        <RacerNumber key={idx} className="racerTop" num={x} />
                      ))}
                    </div>

                    <div className="racerOddsContainer">
                      {isValidArrival && (
                        <p className="racerOdds">
                          {
                            odds["quinella"][quinellaArrival[0]][
                              quinellaArrival[1]
                            ]
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="columnResult columnNormal">
                    <div className="racerContainerDouble racerContainerDoubleX">
                      {racerNumbers.map((x, idx) => (
                        <RacerNumber key={idx} className="racerTop" num={x} />
                      ))}
                    </div>

                    <div className="racerOddsContainer">
                      {isValidArrival && (
                        <p className="racerOdds">
                          {
                            odds["trifecta"][racerNumbers[0]][racerNumbers[1]][
                              racerNumbers[2]
                            ]
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="columnResult columnNormal">
                    <div className="racerContainerDouble racerContainerDoubleX">
                      {boxedTrifectaArrival.map((x, idx) => (
                        <RacerNumber key={idx} className="racerTop" num={x} />
                      ))}
                    </div>

                    <div className="racerOddsContainer">
                      {isValidArrival && (
                        <p className="racerOdds">
                          {
                            odds["boxedtrifecta"][boxedTrifectaArrival[0]][
                              boxedTrifectaArrival[1]
                            ][boxedTrifectaArrival[2]]
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  {isValidArrival
                    ? [
                        racerNumbers[0] % 2 === 0 ? "even" : "odd",

                        racerNumbers[0] < 4 ? "under" : "over",
                      ].map((selection, idx) => {
                        const market = idx === 0 ? "evenodd" : "underover";

                        return (
                          <div key={idx} className="columnResult columnNormal">
                            <p className="dataContainerText1">
                              {r.pageResults[`${market}_${selection}`]}
                            </p>
                            <p className="racerOdds">
                              {odds[market][selection]}
                            </p>
                          </div>
                        );
                      })
                    : [1, 2].map((x) => (
                        <div
                          key={x}
                          className="columnResult columnNormal"
                        ></div>
                      ))}
                </div>
              </div>

              <div className="nextEventContainer">
                <Titlebar text={r.nextRaceHeaderText} />
              </div>

              <div className="bottomContainer">
                <div className="col left">
                  {!HIDE_EVENT_TIME && (
                    <Fragment>
                      {r.nextRaceTimeDescText} {nextEvent.startTime}
                    </Fragment>
                  )}
                </div>

                <div className="col center">
                  <span>
                    {r.nextRacePalDescText} {nextEvent.palimpsestId} -{" "}
                    {r.nextRaceCodeDescText} {nextEvent.eventId}
                  </span>
                </div>

                <div className="col right">
                  <p className="paragraph-that-needs-a-className">
                    {nextEvent.countdown}
                  </p>
                  {/* Here */}
                </div>
              </div>
            </div>
          </div>
          <Footer dict={dict} showLegend={false} version={footerVersion} />
        </section>
      )}
    </>
  );
};
export default ResultPage;
