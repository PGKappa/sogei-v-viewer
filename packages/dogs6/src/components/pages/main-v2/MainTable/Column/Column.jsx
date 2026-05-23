import React from 'react';
import "./Column.scss";
import Titlebar from "../../../../Titlebar/Titlebar.jsx";
const MainTableColumn = ({title, children, additionalStyle, className, directionRow}) => {

	  return (
	    <div className={"main-table-column-v2" + (className ? ' ' + className : '') + (directionRow ? ' direction-row' : '')} style={additionalStyle}>
	    	<Titlebar text={title} className="main-table-column-title"/>
				<div className="content">
	      	{children}
	    	</div>
	    </div>
	  );
}


export default MainTableColumn;
