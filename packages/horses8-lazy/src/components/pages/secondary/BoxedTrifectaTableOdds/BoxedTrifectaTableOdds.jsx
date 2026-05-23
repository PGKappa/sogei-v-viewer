import React from 'react';

import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";

import BoxedTrifectaTableOdds8 from "@v-viewer/race-common/components/odds/BoxedTrifectaTable8";

const BoxedTrifectaTableOdds = ({ dict, sortedBoxedTrifectaOdds = [], sortedBoxedTrifectaOddsByValue = [] }) => {  
  return <BoxedTrifectaTableOdds8
    dict={dict}
    sortedBoxedTrifectaOdds={sortedBoxedTrifectaOdds}
    sortedBoxedTrifectaOddsByValue={sortedBoxedTrifectaOddsByValue}
    RacerNumber={RacerNumber}
  />;
};

export default BoxedTrifectaTableOdds;
