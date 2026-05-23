import React from 'react';
import mockup from './mockup.js';

var sinon = require('sinon/pkg/sinon');
//import initializationFixtures from "./fixtures/initializationFixtures.RO";
import initializationFixtures from "./fixtures/initializationFixtures";
import eventInfoFixtures from "@v-viewer/fake-api/fixtures/dogs6/dogs6_event_info_1000001691_169.json";
import eventInfoFixtures2 from "@v-viewer/fake-api/fixtures/dogs6/dogs6_event_info_1000001691_170.json";
import eventInfoFixturesWith8RacersTrackAnimationMetadata from "./fixtures/eventInfoFixtures3";
import { storeInitializationData, storeEventInfoData } from "../options/data";
import webfontConfig from "../options/webfontconfig";
import { getMainPageOptions, getTrifectaPageOptions, getVideoPageOptions, getResultPageOptions } from "../options/gui-layout-version/v1/data-facade.js";
import { getMainPageOptions as getMainPageV2Options, getSecondaryPageOptions } from "../options/gui-layout-version/v2/data-facade.js";

import { config, loadWebFont } from '@v-viewer/core';

config({ webfontConfig });
loadWebFont();


storeInitializationData(initializationFixtures);
storeEventInfoData(eventInfoFixtures);

import ResultPage from '../components/pages/result/ResultPage.jsx';
import MainPage from '../components/pages/main/MainPage.jsx';
import MainPageV2 from '../components/pages/main-v2/MainPage.jsx';
import PageSecondary from '../components/pages/secondary';
import TrifectaPage from '../components/pages/trifecta/TrifectaPage.jsx';
import VideoPage from '../components/pages/video/VideoPage.jsx';
//import videoProps from './video-props.json';
import Footer from '../components/Footer/Footer.jsx';
import QuinellaTableOdds from '../components/pages/main/QuinellaTableOdds/QuinellaTableOdds.jsx';
import ReplayAnimation from '../components/ReplayAnimation/ReplayAnimation.jsx';


const guiMode = '',
  showPartnerLogo = true,
  showTagReal = false,
  multiplier = 1,
  multiEnabled = true;


function generalConfigs(props = {}) {
  const { bodyClassList = [], retailMode = false } = props;
  document.body.classList[showTagReal ? 'add' : 'remove']('show-tag-real');
  document.body.classList[showPartnerLogo ? 'add' : 'remove']('show-partner-logo');
  document.body.classList[retailMode ? 'add' : 'remove']('full');
  document.body.classList.add('gui-mode-' + guiMode);

  bodyClassList.forEach(x => document.body.classList.add(x));
}

function MainPageMockup(props) {
  generalConfigs({
    ...props,
    bodyClassList: ['page-main', 'footer-out-of-page']
  });
  const mockupData = getMainPageOptions().data;
  mockupData.global.mode.SHOW_PARTNER_LOGO = showPartnerLogo;

  console.log("main page props on teaasts", props);

  return <React.Fragment>
    <div id="page-container">
      <div id="page-main">
        <MainPage {...mockupData}  {...props} />
      </div>
      <div id="secondary"></div>
      <div id="page-trifecta"></div>
      <div id="page-video"></div>
      <div id="page-results"></div>
      <div id="page-error"></div>
    </div>
    <div id="footer-container">
      <Footer dict={mockupData.dict} showLegend={true} slidingText={mockupData.slidingText} version={props.footerVersion} />
    </div>
  </React.Fragment>

}


function MainPageV2Mockup(props) {
  generalConfigs({
    ...props,
    bodyClassList: ['page-main', 'footer-out-of-page']
  });
  const mockupData = getMainPageV2Options().data;
  mockupData.global.mode.SHOW_PARTNER_LOGO = showPartnerLogo;
  document.body.classList.add('header-v2');
  document.body.classList.add('footer-v2');



  return <React.Fragment>
    <div id="page-container">
      <div id="page-main">
        <MainPageV2 {...mockupData} {...props} showTagReal={showTagReal} />
      </div>
      <div id="secondary"></div>
      <div id="page-trifecta"></div>
      <div id="page-video"></div>
      <div id="page-results"></div>
      <div id="page-error"></div>
    </div>
    <div id="footer-container">
      <Footer dict={mockup.dictIt} showLegend={true} slidingText={mockupData.slidingText} version={props.footerVersion} />
    </div>
  </React.Fragment>

}


function PageSecondaryMockup(props) {
  generalConfigs({
    ...props,
    bodyClassList: [
      'page-secondary', 'footer-out-of-page'
    ]
  });

  document.body.classList.add('header-v2');
  document.body.classList.add('footer-v2');

  const mockupData = getSecondaryPageOptions().data;
  mockupData.global.mode.SHOW_PARTNER_LOGO = showPartnerLogo;

  return <React.Fragment>
    <div id="page-container">
      <div id="page-main">
      </div>
      <div id="page-secondary">
        <React.Fragment><PageSecondary {...mockupData} showTagReal={showTagReal} /></React.Fragment>
      </div>
      <div id="page-trifecta"></div>
      <div id="page-video"></div>
      <div id="page-results"></div>
      <div id="page-error"></div>
    </div>
    <div id="footer-container">
      <Footer dict={mockup.dictIt} showLegend={true} slidingText={mockupData.slidingText} version={props.footerVersion} />
    </div>
  </React.Fragment>
}

function ResultPageMockup(props) {
  generalConfigs({
    ...props,
  });
  storeEventInfoData(eventInfoFixtures2);

  document.body.classList.add('page-results');
  document.body.classList.remove('footer-out-of-page');
  document.body.classList.add('header-v2');
  document.body.classList.add('footer-v2');

  const mockupData = getResultPageOptions().data;
  mockupData.global.mode.SHOW_PARTNER_LOGO = showPartnerLogo;
  mockupData.previousEvent.multi  = multiplier;
  return <React.Fragment>
    <div id="page-container">
      <div id="page-main"></div>
      <div id="page-secondary"></div>
      <div id="page-trifecta"></div>
      <div id="page-video"></div>
      <div id="page-results"><ResultPage {...mockupData} {...props} showTagReal={showTagReal} multiEnabled={multiEnabled}/></div>
      <div id="page-error"></div>
    </div>
    <div id="footer-container"></div>
  </React.Fragment>
}

function VideoPageMockup(props) {
  generalConfigs({
    ...props,
  });
  storeEventInfoData(eventInfoFixtures2);
  // storeEventInfoData(eventInfoFixturesWith8RacersTrackAnimationMetadata);
  
  document.body.classList.remove('footer-out-of-page');
  document.body.classList.add('page-video');

  const mockupData = getVideoPageOptions().data;
  mockupData.global.mode.SHOW_PARTNER_LOGO = showPartnerLogo;
  mockupData.previousEvent.multi  = multiplier;
  return <React.Fragment>
    <div id="page-container">
      <div id="page-main"></div>
      <div id="page-secondary"></div>
      <div id="page-trifecta"></div>
      <div id="page-video">
        <VideoPage {...mockupData} {...props} showTagReal={showTagReal} multiEnabled={multiEnabled}/>
      </div>
      <div id="page-results"></div>
      <div id="page-error"></div>
    </div>
    <div id="footer-container"></div>
  </React.Fragment>
}

function TrifectaPageMockup(props) {
  generalConfigs({
    ...props,
  });

  const mockupData = getTrifectaPageOptions().data;
  mockupData.global.mode.SHOW_PARTNER_LOGO = showPartnerLogo;

  document.body.classList.add('page-trifecta');
  document.body.classList.add('footer-out-of-page');
  document.body.classList.add('header-v2');
  document.body.classList.add('footer-v2');

  return <React.Fragment>
    <div id="page-container">
      <div id="page-main">
      </div>
      <div id="page-secondary"></div>
      <div id="page-trifecta">
        <TrifectaPage {...mockupData} {...props} showTagReal={showTagReal} />
      </div>
      <div id="page-video"></div>
      <div id="page-results"></div>
      <div id="page-error"></div>
    </div>
    <div id="footer-container">
      <Footer dict={mockupData.dict} showLegend={true} slidingText={mockupData.slidingText} version={props.footerVersion} />
    </div>
  </React.Fragment>

  return
}

function FooterMockup() {
  return <Footer dict={mockupData.dict} showLegend={true} />
}

function ReplayAnimationMockup() {
  return <ReplayAnimation dict={mockup.dictIt} arrival={mockup.getGameInfoResponse.prev.arrival.numbers} names={mockup.getGameInfoResponse.prev.names} metadata={videoProps.metadata} videoCurrentTime={46.2} />
}

function QuinellaTableOddsMockup() {
  return <QuinellaTableOdds dict={mockup.dictIt} odds={videoProps.odds} event={videoProps.event} channel={videoProps.channel} time={videoProps.time} />
}

export default {
  pages: {
    Main: MainPageMockup,
    MainV2: MainPageV2Mockup,
    Secondary: PageSecondaryMockup,
    Trifecta: TrifectaPageMockup,
    Video: VideoPageMockup,
    Result: ResultPageMockup
  },
  QuinellaTableOdds: QuinellaTableOddsMockup,
  ReplayAnimation: ReplayAnimationMockup,
  Footer: FooterMockup
}
