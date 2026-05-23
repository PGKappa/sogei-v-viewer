import React from 'react';
import Titlebar from "../../../Titlebar/Titlebar.jsx";
const MainTableColumn = ({title, children, additionalStyle, className}) => {

	  return (
	    <div className={className || "main-table-column"} style={additionalStyle}>
	    	<Titlebar text={title} className="main-table-column-title"/>
				<div className="content">
	      	{children}
	    	</div>
	    </div>
	  );
}


export default MainTableColumn;
