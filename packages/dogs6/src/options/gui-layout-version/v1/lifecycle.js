import React from 'react';
import ReactDOM from 'react-dom';

import pages from './pages';
import data from '../../data';
import {getErrorPageOptions, getMainPageOptions, getTrifectaPageOptions, getVideoPageOptions, getResultPageOptions, getCountdownPageOptions} from './data-facade';

import MainPage from '../../../components/pages/main/MainPage.jsx';
import TrifectaPage from '../../../components/pages/trifecta/TrifectaPage.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import VideoPage from '../../../components/pages/video/VideoPage.jsx';
import ResultPage from '../../../components/pages/result/ResultPage.jsx';
import PageError from '../../../components/pages/error/PageError.jsx';

let numOfCycles = 0;
let prevPageId = '';

let isPageResultCreated = false,
  isPageMainCreated = false,
  isPageTrifectaCreated = false,
  isPageCountdownCreated = false,
  isPageVideoCreated = false;
let isPageOddsFooterRendered = false;

export const pageDelegates = {
  [pages.MAIN]: onMainOddsTime,
  [pages.TRIFECTA]: onTrifectaOddsTime,
  [pages.VIDEO]: onVideoTime,
  [pages.RESULTS]: onResultTime,
  [pages.ERROR]: onErrorTime
};

export function onErrorTime() {
  isPageMainCreated = false;
  isPageTrifectaCreated = false;
  isPageResultCreated = false;
  isPageVideoCreated = false;

  if (prevPageId) {
    document.body.classList.remove(prevPageId);
  }
  prevPageId = `page-${pages.ERROR}`
  document.body.classList.add(prevPageId);

  ReactDOM.render(React.createElement(ErrorPage, getErrorPageOptions().data), document.getElementById(prevPageId));

}

export function onVideoTime() {
  isPageMainCreated = false;
  isPageTrifectaCreated = false;
  isPageResultCreated = false;

  if (isPageOddsFooterRendered) {
    ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
    isPageOddsFooterRendered = false;
    setFooterOutOfPage(false);
  }
  if ( !isPageVideoCreated )
  {
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
    }
    prevPageId = `page-${pages.VIDEO}`
    document.body.classList.add(prevPageId);
  }
  //
  ReactDOM.render(React.createElement(VideoPage, getVideoPageOptions().data), document.getElementById(prevPageId));

  isPageVideoCreated = true;
}

export function onResultTime() {
  isPageMainCreated = false;
  isPageTrifectaCreated = false;

  if (isPageOddsFooterRendered) {
    ReactDOM.unmountComponentAtNode(document.querySelector('#footer-container'));
    isPageOddsFooterRendered = false;
    setFooterOutOfPage(false);
  }

  if (!isPageResultCreated) {
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
      if (isPageVideoCreated) {
        try {
          ReactDOM.unmountComponentAtNode(document.getElementById(prevPageId));
          isPageVideoCreated = false;
        } catch (ex) {
          console.log("an exception occurred unmounting the pageVideo", ex);
        }
      }
    }
    prevPageId = `page-${pages.RESULTS}`
    document.body.classList.add(prevPageId);
  }
  console.warn("prevPageId:::: ", prevPageId);
  ReactDOM.render(React.createElement(ResultPage, getResultPageOptions().data), document.getElementById(prevPageId));
  isPageResultCreated = true;

}


export function onMainOddsTime() {

  if (numOfCycles >= 5) {
    data.global.isHostReachable((reachable) => {
      console.log("reachable: ", reachable);
      if (reachable && !isPageMainCreated) {
        //if (reachable) {
       
        setTimeout(function () {
          window.location.reload();
        }, 200000);

      } else {
        onMainOddsTimeProcedure();
      }
    });
  } else {
    onMainOddsTimeProcedure();
  }

}

function onMainOddsTimeProcedure() {

  isPageVideoCreated = false;
  isPageResultCreated = false;
  isPageTrifectaCreated = false;
  if (!isPageMainCreated) {
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
    }
    prevPageId = `page-${pages.MAIN}`
    document.body.classList.add(prevPageId);

    isPageMainCreated = true;

    const mainPageProps = getMainPageOptions().data;

    ReactDOM.render(React.createElement(MainPage, mainPageProps), document.getElementById(prevPageId));

    if (!isPageOddsFooterRendered) {
      ReactDOM.render(React.createElement(Footer, {
        isFullMode: data.global.isFullMode(),
        slidingText: mainPageProps.slidingText,
        dict: mainPageProps.dict,
        showLegend: true,
        version: mainPageProps.footerVersion,
      }), document.querySelector('#footer-container'));
      isPageOddsFooterRendered = true;
      setFooterOutOfPage(true);
    }
  }
}

function onTrifectaOddsTime() {
  isPageMainCreated = false;
  isPageVideoCreated = false;
  isPageResultCreated = false;
  if (!isPageTrifectaCreated) {
    if (prevPageId) {
      document.body.classList.remove(prevPageId);
    }
    prevPageId = `page-${pages.TRIFECTA}`
    document.body.classList.add(prevPageId);

    const trifectaPageProps = getTrifectaPageOptions().data;
    ReactDOM.render(React.createElement(TrifectaPage, trifectaPageProps), document.getElementById(prevPageId));

    if (!isPageOddsFooterRendered) {
      ReactDOM.render(React.createElement(Footer, {
        isFullMode: data.global.isFullMode(),
        slidingText: trifectaPageProps.slidingText,
        dict: trifectaPageProps.dict,
        showLegend: true,
        version: trifectaPageProps.footerVersion
      }), document.querySelector('#footer-container'));
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
