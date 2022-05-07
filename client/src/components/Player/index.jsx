import styles from './styles.module.scss';
const Player = () => {

	return (
		<div>
			<div id={styles["audio-player-container"]}>
				<audio src="https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3" preload="metadata" loop/>
				<button id={styles["play-icon"]}/>
				<span id={styles["current-time"]} className={styles.time}>0:00</span>
				<input type="range" id={styles["seek-slider"]} max="100" value="0"/>
				<span id={styles["duration"]} className={styles.time}>0:00</span>
				<output id={styles["volume-output"]}>100</output>
				<input type="range" id={styles["volume-slider"]} max="100" value="100"/>
				<button id={styles["mute-icon"]}/>
			</div>
		</div>

	);
};

export default Player;
