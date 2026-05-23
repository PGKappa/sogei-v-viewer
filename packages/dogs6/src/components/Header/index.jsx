import React from 'react';

import HeaderV1 from './V1';
import HeaderV2 from './V2';

const Header = (props) => {
    const version = (props.version || "").toString().toLowerCase()
    switch (version) {
        case 'v2': 
            return <HeaderV2 {...props}/>;
        case 'v1':
        default: 
            return <HeaderV1 {...props}/>;
    }
};
export default Header;
