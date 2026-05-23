import React, {memo} from 'react';
import "./RacerNumber.scss";

const RacerNumber = memo(({num}) => {
  return (
    <div className="racer-wrapper">
  		<div className={"racer racer-" + num}>
        <span>{num}</span>
      </div>
    </div>
  );
});

export default RacerNumber;
