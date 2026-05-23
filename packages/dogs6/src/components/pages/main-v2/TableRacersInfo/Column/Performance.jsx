import React from 'react';

import "./Performance.scss";
import MainTableColumn from "../../MainTable/Column";

const TableRacersInfoColumnPerformance = ({data, title}) => {
  return (
    <MainTableColumn className="table-racers-info-column-performance perforce" title={title}>
      {data.map((x, idx) => {
      	let width = 100 - data[idx];

      	return (<div className="row" key={idx}>
      		<div className="performance-inner-container">
			  <p className="performance-value">{data[idx]>100?100:data[idx]}%</p>

	      		<div className="performance-container">
	      			<div className="performance-cover" style={{width: width + "%"}}></div>
	      		</div>
      		</div>
      	</div>)})}
    </MainTableColumn>
  );
}

export default TableRacersInfoColumnPerformance;
