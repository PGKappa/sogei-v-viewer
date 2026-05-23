import React, { useEffect, useRef, useState } from "react";
import "./Multiplier.scss";
import "./MultiplierAppearAnimation.scss";

const Multiplier = ({ value, enableAppearAnimation = false, className }) => {
	const isActive = value > 1;

	const multiplierRef = useRef(),
	multiplierEl = multiplierRef.current;

	const [animationClasses, setAnimationClasses] = useState([
		isActive ? (enableAppearAnimation ? ' appear-anim' : ' bouncing') : ''
	].join(""));

	useEffect(() => {
		if (enableAppearAnimation && multiplierEl) {
			multiplierEl.addEventListener("animationend", () => {
				setAnimationClasses(" bouncing");
			})
		}
	}, [multiplierEl, enableAppearAnimation]);

	return (
		<div className="multiplier-container">
			<div
				ref={multiplierRef}
				className={"multiplier" +
					(isActive ? ' active' : '') +
					animationClasses +
					(className ? ' ' + className : '')}>x{value}</div>
		</div>
	);
}

export default Multiplier;