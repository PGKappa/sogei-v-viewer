import React, { useEffect, useState } from 'react';

import "./OthersTableOdds.scss";
import Titlebar from "../../../Titlebar/Titlebar.jsx";

const OthersTableOdds = ({ dict, odds }) => {

	const [r, setR] = useState({
		othersHeaderText: '',
		data: [],
	});

	useEffect(() => {
		if (dict) {
			let othersHeaderText = '', data = [];
			if (dict.page_odds) {
				othersHeaderText = dict.page_odds.others_header;
				data = [
					{
						market: dict.page_odds.others_even,
						odds: odds['evenodd']['even']
					}, {
						market: dict.page_odds.others_odd,
						odds: odds['evenodd']['odd']
					}, {
						market: dict.page_odds.others_under,
						odds: odds['underover']['under']
					}, {
						market: dict.page_odds.others_over,
						odds: odds['underover']['over']
					}
				];
			}
			setR({
				othersHeaderText: othersHeaderText,
				data: data
			});
		}
	}, [dict]);

	return (
		<section id="others-table-odds">
			<Titlebar text={r.othersHeaderText} className="others-table-title-bar" />

			<div className="others-table-content">
				<div className="others-table-content-1">
					{r.data.map((item, idx) => {
						return (
							<div className="others-panel-content-item" key={idx}>
								<p className="others-panel-content-item-title">{item.market}</p>
								<p className="others-panel-content-item-odds">{item.odds}</p>
							</div>
						);
					})}
				</div>

				<div className="others-table-content-2">
					{r.data.map((item, idx) => {
						return (
							<div className="others-panel-content-item" key={idx * 10}>
								<p className="others-panel-content-item-title">{item.market}</p>
								<p className="others-panel-content-item-odds">{item.odds}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	)
};

export default OthersTableOdds;
