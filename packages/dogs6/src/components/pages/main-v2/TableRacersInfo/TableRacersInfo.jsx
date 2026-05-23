import React, { useState, useEffect } from 'react';

import MainTable from '../MainTable';
import MainTableColumn from '../MainTable/Column';
import HistoryColumn from "./Column/History.jsx";
import PerformanceColumn from "./Column/Performance.jsx";
import RacerNumber from "../../../RacerNumber/RacerNumber.jsx";

import './TableRacersInfo.scss';

const TableRacersInfo = ({ racers, dict }) => {
    const [r, setR] = useState({
        raceHeaderText: '',
        performanceHeaderText: '',
        historyHeaderText: ''
    });

    useEffect(() => {
        if (dict) {
            let raceHeaderText = '',
                performanceHeaderText = '',
                historyHeaderText = '';

            if (dict.page_odds) {
                raceHeaderText = dict.page_odds.racer_header;
                performanceHeaderText = dict.page_odds.performance_header;
                historyHeaderText = dict.page_odds.history_header;
            }

            setR({
                raceHeaderText: raceHeaderText,
                performanceHeaderText: performanceHeaderText,
                historyHeaderText: historyHeaderText
            });
        }
    }, [dict]);
    return <MainTable className="table-racers-info">
        <MainTableColumn className="table-racers-info-column-names" title={r.raceHeaderText}>
            {racers.map((racer, idx) => <div className="row" key={idx}><RacerNumber num={idx + 1} />{racer.name}</div>)}
        </MainTableColumn>
        <PerformanceColumn title={r.performanceHeaderText} data={racers.map(x => x.performance)} additionalStyle={{
            minWidth: '100%'
        }} />
        <HistoryColumn title={r.historyHeaderText} data={racers.map(x => x.history)} additionalStyle={{
            minWidth: '100%'
        }} />
    </MainTable>
};

export default TableRacersInfo;