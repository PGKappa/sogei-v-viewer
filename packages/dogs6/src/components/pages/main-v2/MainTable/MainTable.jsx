import React from 'react';
import "./MainTable.scss";

const MainTable = ({children,className}) =>  {
    return <div className={"main-table-v2" + (className ? ' ' + className : '')} >{children}</div>
}

export default MainTable;