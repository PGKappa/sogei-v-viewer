import React, {useState, useEffect} from "react";
import "./Timer.scss";

const Timer = () => {
	const [timerMinutes, setTimerMinutes] = useState([0, 2]);
	const [timerSeconds, setTimerSeconds] = useState([5, 9]);

	const countDown = () => {
		setInterval(() => {
			// setTimerMinutes();
			if (timerSeconds[1] === 0) {
				// setTimerSeconds([timerSeconds[0] -= 1, timerSeconds[1]]);
				timerSeconds[0] -= 1;
				
				if (timerSeconds[0] === 0) {
					// setTimerMinutes([timerMinutes[0], timerMinutes[1] -= 1]);
					timerMinutes[1] -= 1;
				}

				if (timerSeconds[0] <= -1) {
					// setTimerSeconds([timerSeconds[0], timerSeconds[1] + 9]);
					timerSeconds[0] = 5;
				//console.log(timerSeconds)
				}
			}

			if (timerSeconds[1] <= -1) {
				// setTimerSeconds([timerSeconds[0], timerSeconds[1] + 9]);
				timerSeconds[1] = 9;
			//console.log(timerSeconds)
			}

			setTimerSeconds([timerSeconds[0], timerSeconds[1]--]);
		}, 1000);
	}

	useEffect(() => {
		countDown();
		// console.log("x")
	}, []);

	return (
		<div className="timer-container">
			<p className="timer-minutes">{timerMinutes[0]}{timerMinutes[1]}</p>
			<p className="timer-divider">:</p>
			<p className="timer-seconds">{timerSeconds[0]}{timerSeconds[1]}</p>
		</div>
	);
}

export default Timer;