import GameOptionsV1 from './gui-layout-version/v1';
//import GameOptionsV2 from './gui-layout-version/v2';
import GameOptionsV2 from './gui-layout-version/v2';
import {onInit as onInitV2} from './gui-layout-version/v2/lifecycle';

export function getGameOptions(version="") {
    const _version = (version || "").toString().toLowerCase();
    switch(_version) {
        case 'v1':
            return GameOptionsV1;
        case 'v2':
        default:
            return GameOptionsV2;        
    }
}

export function onInit(version="") {
    const _version = (version || "").toString().toLowerCase();
    switch(_version) {
        case 'v1':
            return null;
        case 'v2':
            return onInitV2;
        default:
            return () => 'come in tenerif';                    
    }
}

export default {getGameOptions};
