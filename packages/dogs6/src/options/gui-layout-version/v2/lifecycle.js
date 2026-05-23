import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import pages from "./pages";
import data from "../../data";
import {
  getErrorPageOptions,
  getMainPageOptions,
  getSecondaryPageOptions,
  getTrifectaPageOptions,
  getVideoPageOptions,
  getResultPageOptions,
  getCountdownPageOptions,
} from "./data-facade";

import MainPage from "../../../components/pages/main-v2/MainPage.jsx";
import PageSecondary from "../../../components/pages/secondary/PageSecondary";
import TrifectaPage from "../../../components/pages/trifecta/TrifectaPage.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import VideoPage from "../../../components/pages/video/VideoPage.jsx";
import ResultPage from "../../../components/pages/result/ResultPage.jsx";
import PageError from "../../../components/pages/error/PageError.jsx";

import { getNumOfGameCycles } from "@v-viewer/core";
import { isHostReachable } from "@v-viewer/core/v-api";

let prevPageId = "";

let isPageResultCreated = false,
  isPageMainCreated = false,
  isPageTrifectaCreated = false,
  isPageCountdownCreated = false,
  isPageVideoCreated = false;
let isPageOddsFooterRendered = false;
let isPageSecondaryMounted = false;

export const pageDelegates = {
  [pages.MAIN]: onMainOddsTime,
  [pages.SECONDARY]: onPageSecondaryTime,
  [pages.TRIFECTA]: onTrifectaOddsTime,
  [pages.VIDEO]: onVideoTime,
  [pages.RESULTS]: onResultTime,
  [pages.ERROR]: onErrorTime,
};

// let pageRoot = null;
export function onInit() {
  // pageRoot =
  console.log("init lifecycle");
}

let pageErrorRoot = null;
export function onErrorTime() {
  isPageMainCreated = false;
  isPageTrifectaCreated = false;
  isPageResultCreated = false;
  isPageVideoCreated = false;

  const newPageId = `page-${pages.ERROR}`;
  if (!pageErrorRoot) {
    pageErrorRoot = createRoot(document.getElementById(newPageId));
  }

  pageErrorRoot.render(
    React.createElement(PageError, getErrorPageOptions().data)
  );
  if (prevPageId) {
    document.body.classList.remove(prevPageId);
  }
  prevPageId = newPageId;
  document.body.classList.add(newPageId);
}

let pageVideoRootCreated = false,
  pageVideoRoot = null;

let footerRootCreated = false,
  footerRoot = null;

export function onVideoTime() {
  document.body.classList.add("header-v2");
  document.body.classList.add("footer-v2");
  // console.log("VIDEO PAGE TIME");
  isPageMainCreated = false;
  isPageTrifectaCreated = false;
  isPageResultCreated = false;

  if (isPageOddsFooterRendered) {
    if (footerRootCreated) {
      if (footerRoot) {
        footerRoot.unmount();
        footerRootCreated = false;
      }
      // ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
    }
    // ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
    isPageOddsFooterRendered = false;
    setFooterOutOfPage(false);
  }

  const newPageId = `page-${pages.VIDEO}`;

  // ReactDOM.render(VideoPage, getVideoPageOptions().data, document.getElementById(prevPageId));
  if (!pageVideoRootCreated) {
    pageVideoRoot = createRoot(document.getElementById(newPageId));
    pageVideoRootCreated = true;
  }
  //console.log("VIDEO PAGE", getVideoPageOptions().data);
  pageVideoRoot.render(
    React.createElement(VideoPage, getVideoPageOptions().data)
  );

  if (!isPageVideoCreated) {
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
    }
    prevPageId = newPageId;
    document.body.classList.add(prevPageId);
  }

  isPageVideoCreated = true;
}

let pageResultRootCreated = false,
  pageResultRoot = null;

export function onResultTime() {
  isPageMainCreated = false;
  pageMainRootCreated = false;
  pageMainUnmount();

  isPageTrifectaCreated = false;
  //console.log("RESULT PAGE TIME");
  if (isPageOddsFooterRendered) {
    if (footerRootCreated) {
      if (footerRoot) {
        footerRoot.unmount();
        footerRootCreated = false;
      }
      // ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
    }
    // ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
    isPageOddsFooterRendered = false;
    setFooterOutOfPage(false);
  }

  const newPageId = `page-${pages.RESULTS}`;
  // console.warn("prevPageId:::: ", prevPageId);

  // /ReactDOM.render(React.createElement(ResultPage, getResultPageOptions().data), document.getElementById(prevPageId));

  if (!pageResultRootCreated) {
    pageResultRoot = createRoot(document.getElementById(newPageId));
    pageResultRootCreated = true;
  }
  //console.log("RESULT PAGE", getResultPageOptions().data);
  pageResultRoot.render(
    React.createElement(
      ResultPage,
      getResultPageOptions().data,
      document.getElementById(prevPageId)
    )
  );

  if (!isPageResultCreated) {
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
      if (isPageVideoCreated) {
        try {
          // ReactDOM.unmountComponentAtNode(document.getElementById(prevPageId));
          pageVideoRoot.unmount();
          pageVideoRootCreated = false;
          isPageVideoCreated = false;
        } catch (ex) {
          console.log("an exception occurred unmounting the pageVideo", ex);
        }
      }
    }
    prevPageId = newPageId; //`page-${pages.RESULTS}`
    document.body.classList.add(prevPageId);
  }

  isPageResultCreated = true;
}

let pageMainRootCreated = false,
  pageMainRoot = null;

export function onMainOddsTime() {
  
  onMainOddsTimeProcedure();

 /* console.log('NUM Cicle '+getNumOfGameCycles());
  
  if (getNumOfGameCycles() >= 10) {
    isHostReachable((reachable) => {
      if (reachable && isPageMainCreated) {
        
          window.location.reload();
        
      } else {
        onMainOddsTimeProcedure();
      }
    });
  } //*/
}

function onMainOddsTimeProcedure() {
  // aggiornamento della pagina
  //console.log("MAIN PAGE TIME");

  document.body.classList.add("header-v2");
  document.body.classList.add("footer-v2");
  isPageVideoCreated = false;
  isPageResultCreated = false;
  isPageTrifectaCreated = false;

  const newPageId = `page-${pages.MAIN}`;
  if (!isPageMainCreated) {
   // console.log("isPageMainCreated", isPageMainCreated, mainPageProps);
    const mainPageProps = getMainPageOptions().data;
   // console.log("mainPageProps", mainPageProps);
    document.body.classList.remove("dogs");
    document.body.classList.remove("harness");
    document.body.classList.remove("horses");
    document.body.classList.add(mainPageProps.gameName);
    // ReactDOM.render(React.createElement(MainPage, mainPageProps), document.getElementById(prevPageId));
    if (!pageMainRootCreated) {
      pageMainRoot = createRoot(document.getElementById(newPageId));
      pageMainRootCreated = true;
    }
    pageMainRoot.render(React.createElement(MainPage, mainPageProps));
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
    }
    prevPageId = newPageId;
    document.body.classList.add(newPageId);

    if (!isPageOddsFooterRendered) {
      if (!footerRootCreated) {
        footerRoot = createRoot(document.querySelector("#footer-container"));
        footerRootCreated = true;
        // ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
      }
      footerRoot.render(
        React.createElement(Footer, {
          isFullMode: data.global.isFullMode(),
          slidingText: mainPageProps.slidingText,
          dict: mainPageProps.dict,
          showLegend: true,
          version: mainPageProps.footerVersion,
        })
      );
      isPageOddsFooterRendered = true;
      setFooterOutOfPage(true);
    }

    isPageMainCreated = true;
  }
}

function pageMainUnmount() {
  if (pageMainRoot) {
    pageMainRoot.unmount();
    pageMainRoot = null;
  }
}

let pageSecondaryRoot = null;

function onPageSecondaryTime() {
  //console.log("SECONDARY PAGE TIME");
  document.body.classList.add("header-v2");
  document.body.classList.add("footer-v2");

  isPageVideoCreated = false;
  isPageResultCreated = false;
  isPageTrifectaCreated = false;

  if (!!!pageSecondaryRoot) {
    const newPageId = `page-${pages.SECONDARY}`;
    const secondaryPageProps = getSecondaryPageOptions().data;
    document.body.classList.remove("dogs");
    document.body.classList.remove("harness");
    document.body.classList.remove("horses");
    document.body.classList.add(secondaryPageProps.gameName);
    // ReactDOM.render(React.createElement(PageSecondary, secondaryPageProps), document.getElementById(prevPageId));
    pageSecondaryRoot = createRoot(document.getElementById(newPageId));
    // pageSecondaryRootCreated = true;
    pageSecondaryRoot.render(
      React.createElement(PageSecondary, secondaryPageProps)
    );
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
    }
    prevPageId = newPageId;
    document.body.classList.add(newPageId);

    if (!isPageOddsFooterRendered) {
      if (!footerRootCreated) {
        footerRoot = createRoot(document.querySelector("#footer-container"));
        footerRootCreated = true;
        // ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
      }
      footerRoot.render(
        React.createElement(Footer, {
          isFullMode: data.global.isFullMode(),
          slidingText: secondaryPageProps.slidingText,
          dict: secondaryPageProps.dict,
          showLegend: true,
          version: secondaryPageProps.footerVersion,
        })
      );
      isPageOddsFooterRendered = true;
      setFooterOutOfPage(true);
    }
  }
}

function pageSecondaryUnmount() {
  if (pageSecondaryRoot) {
    pageSecondaryRoot.unmount();
    pageSecondaryRoot = null;
  }
}

let trifectaPageRootCreated = false,
  trifectaPageRoot = null;

function onTrifectaOddsTime() {
  //console.log("TRIFECTA PAGE TIME");
  document.body.classList.add("header-v2");
  document.body.classList.add("footer-v2");

  pageSecondaryUnmount();
  isPageMainCreated = false;
  isPageVideoCreated = false;
  isPageResultCreated = false;

  const newPageId = `page-${pages.TRIFECTA}`;
  if (!isPageTrifectaCreated) {
    const trifectaPageProps = getTrifectaPageOptions().data;
   // console.log("trifectaPageProps", trifectaPageProps);
    document.body.classList.remove("dogs");
    document.body.classList.remove("harness");
    document.body.classList.remove("horses");
    document.body.classList.add(trifectaPageProps.gameName);
    if (!trifectaPageRootCreated) {
      // ReactDOM.render(React.createElement(TrifectaPage, trifectaPageProps), document.getElementById(prevPageId));
      trifectaPageRoot = createRoot(document.getElementById(newPageId));
      trifectaPageRootCreated = true;
    }

    trifectaPageRoot.render(
      React.createElement(TrifectaPage, trifectaPageProps)
    );
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
    }
    prevPageId = newPageId; // `page-${pages.TRIFECTA}`;
    document.body.classList.add(newPageId);

    // ReactDOM.render(React.createElement(TrifectaPage, trifectaPageProps), document.getElementById(prevPageId));

    if (!isPageOddsFooterRendered) {
      if (!footerRootCreated) {
        footerRoot = createRoot(document.querySelector("#footer-container"));
        footerRootCreated = true;
        // ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
      }
      footerRoot.render(
        React.createElement(Footer, {
          isFullMode: data.global.isFullMode(),
          slidingText: trifectaPageProps.slidingText,
          dict: trifectaPageProps.dict,
          showLegend: true,
          version: trifectaPageProps.footerVersion,
        })
      );
      isPageOddsFooterRendered = true;
      setFooterOutOfPage(true);
    }

    isPageTrifectaCreated = true;
  }
}

function setFooterOutOfPage(v) {
  if (document) {
    if (document.body) {
      if (document.body.classList) {
        if (v) {
          if (document.body.classList.add) {
            document.body.classList.add("footer-out-of-page");
          }
        } else {
          if (document.body.classList.remove) {
            document.body.classList.remove("footer-out-of-page");
          }
        }
      }
    }
  }
}

export default pageDelegates;
