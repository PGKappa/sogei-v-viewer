import data from "../../data";
import pages from "./pages";

import {
  getMainPageOptions as getMainPageV1Options,
  getTrifectaPageOptions as getTrifectaPageV1Options,
  getVideoPageOptions as getVideoPageV1Options,
  getResultPageOptions as getResultPageV1Options,
} from "../v1/data-facade";

export function getErrorPageOptions() {
  return {
    cmd: "go-page",
    page: pages.ERROR,
    data: {},
  };
}
export function getVideoPageOptions() {
  const videoPageV1Options = getVideoPageV1Options();
  document.body.classList.remove("dogs");
  document.body.classList.remove("harness");
  document.body.classList.remove("horses");
  document.body.classList.add(videoPageV1Options.data.gameName);
  //console.warn(videoPageV1Options.data);
  return {
    ...videoPageV1Options,
    data: {
      ...videoPageV1Options.data,
      showTagReal: true,
    },
  };
}

export function getResultPageOptions() {
  const resultPageV1Options = getResultPageV1Options();

  document.body.classList.remove("dogs");
  document.body.classList.remove("harness");
  document.body.classList.remove("horses");
  document.body.classList.add(resultPageV1Options.data.gameName);

  return {
    ...resultPageV1Options,
    data: {
      ...resultPageV1Options.data,
      headerVersion: "v2",
      footerVersion: "v2",
      showTagReal: true,
    },
  };
}

export function getMainPageOptions() {
  const mainPageV1Options = getMainPageV1Options();
  //console.log("MAIN PAGE", mainPageV1Options.data);
  return {
    ...mainPageV1Options,
    data: {
      ...mainPageV1Options.data,
      headerVersion: "v2",
      footerVersion: "v2",
      showTagReal: true,
    },
  };
}

export function getSecondaryPageOptions() {
  const mainPageOptions = getMainPageOptions();

  const sortedExactaOdds = data.event.current.sortedExactaOdds;
  const sortedExactaOddsByValue = data.event.current.sortedExactaOddsByValue;

  const sortedBoxedTrifectaOdds = data.event.current.sortedBoxedTrifectaOdds;
  const sortedBoxedTrifectaOddsByValue =
    data.event.current.sortedBoxedTrifectaOddsByValue;
  return {
    ...mainPageOptions,
    data: {
      ...mainPageOptions.data,
      headerVersion: "v2",
      footerVersion: "v2",
      showTagReal: true,
      sortedExactaOdds,
      sortedExactaOddsByValue,
      sortedBoxedTrifectaOdds,
      sortedBoxedTrifectaOddsByValue,
    },
  };
}

export function getTrifectaPageOptions() {
  const trifectaPageV1Options = getTrifectaPageV1Options();
  // console.warn(trifectaPageV1Options.data);
  return {
    ...trifectaPageV1Options,
    data: {
      ...trifectaPageV1Options.data,
      headerVersion: "v2",
      footerVersion: "v2",
      showTagReal: true,
    },
  };
}

export function getCountdownPageOptions() {
  return {
    cmd: "go-page",
    page: pages.COUNTDOWN,
    data: {},
  };
}
