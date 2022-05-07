import Like from "../Like";
import { IconButton } from "@mui/material";
import peaches from "../../images/peaches.jpg";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from "@mui/icons-material/SkipNext";
import styles from "./styles.module.scss";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import PlayerContext from "../../store/player-context";
import {Link} from "react-router-dom";

const AudioPlayer = () => {
	const playerCtx = useContext((PlayerContext))
	const songCtx = playerCtx.song;
	const songImageCtx = playerCtx.songImage;
	const songTrackCtx = playerCtx.songTrack;
	const [song,setSong] = useState(songCtx);
	const [songImage,setSongImage] = useState(songImageCtx);
	const [songTrack,setSongTrack] = useState(songTrackCtx);

	const prevSongCtx = playerCtx.prevSong;
	const [prevSong,setPrevSong] = useState(prevSongCtx);
	const [prevSongImage,setPrevSongImage] = useState(songImageCtx);
	const [prevSongTrack,setPrevSongTrack] = useState(songTrackCtx);

	const nextSongCtx = playerCtx.nextSong;
	const [nextSong,setNextSong] = useState(nextSongCtx);
	const [nextSongImage,setNextSongImage] = useState(songImageCtx);
	const [nextSongTrack,setNextSongTrack] = useState(songTrackCtx);


	const [playing, setPlaying] = useState(true)
// get data from the context
	useEffect(() => {
		setSong(songCtx)
		setSongImage(songImageCtx)
		setPrevSong(prevSongCtx)
		setNextSong(nextSongCtx)
	},[songCtx, songImageCtx,prevSongCtx,nextSongCtx])
	// split getting track from other data cuz he takes longer
	useEffect(() => {
		setSongTrack(songTrackCtx)
	},[songTrackCtx])
//getting prev and next song data
	useEffect(async () => {
		if (prevSong) {
			await axios.get('http://localhost:3002/songs/get-track/' + prevSong._id, {
				responseType: 'arraybuffer',
			}).then(response => {
				const arrayBuffer = response.data;
				const blob = new Blob([arrayBuffer], {type: "audio/mpeg"});
				const url = window.URL.createObjectURL(blob);
				setPrevSongTrack(url)
			})
			await axios.get('http://localhost:3002/songs/get-image/'+ prevSong._id,{
				responseType: 'arraybuffer'
			}).then((response) => {
				let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
				let srcValue = "data:image/png;base64,"+base64ImageString;
				setPrevSongImage(srcValue)
			})
		}

	}, [prevSong])
	useEffect(async () => {
		if (nextSong) {
			await axios.get('http://localhost:3002/songs/get-track/' + nextSong._id, {
				responseType: 'arraybuffer',
			}).then(response => {
				const arrayBuffer = response.data;
				const blob = new Blob([arrayBuffer], {type: "audio/mpeg"});
				const url = window.URL.createObjectURL(blob);
				setNextSongTrack(url)
			})
			await axios.get('http://localhost:3002/songs/get-image/'+ nextSong._id,{
				responseType: 'arraybuffer'
			}).then((response) => {
				let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
				let srcValue = "data:image/png;base64,"+base64ImageString;
				setNextSongImage(srcValue)
			})
		}

	}, [nextSong])


	const playSong = () => {
		const audio = document.getElementById("audio");
		if (audio.paused) {
			audio.play();
			setPlaying(true);
		}else {
			audio.pause();
			setPlaying(false)
		}
	}
	const playPrev = () => {
		if (prevSongTrack && prevSongImage){
			const audio = document.getElementById("audio");
			audio.pause();
			setSong(prevSong)
			setSongImage(prevSongImage)
			setSongTrack(prevSongTrack)
			audio.play()
		}
	}
	const playNext = () => {
		if (nextSongTrack && nextSongImage){
			const audio = document.getElementById("audio");
			audio.pause();
			setSong(nextSong)
			setSongImage(nextSongImage)
			setSongTrack(nextSongTrack)
			audio.play()
		}
	}

	return (
		<div className={styles.audio_player} style={{marginTop:'150px'}}>
			<div className={styles.left}>
				{songImage &&
					<img src={songImage} alt="song_img" />
				}
				{!songImage &&
					<img src={peaches} alt="song_img" />
				}
				<div className={styles.song_info}>
					<p className={styles.song_name}>{song.title ? song.title : 'Peaches'}</p>
					<p className={styles.song_artist}>{song.title ? song.artists : 'Justin Bieber'}</p>
				</div>
			</div>
			<div className={styles.center}>
				<div className={styles.audio_controls}>
					<IconButton className={styles.prev} onClick={playPrev}>
						<SkipPreviousIcon />
					</IconButton>
					<IconButton className={styles.play} onClick={playSong}>
						{!playing &&
							<PlayArrowIcon/>
						}
						{playing &&
							<PauseIcon/>
						}
					</IconButton>

					<IconButton className={styles.next} onClick={playNext}>
						<SkipNextIcon />
					</IconButton>
				</div>
				<div className={styles.progress_container}>
					{/*<p>0.30</p>*/}
					{/*<input*/}
					{/*	type="range"*/}
					{/*	step="1"*/}
					{/*	min="0"*/}
					{/*	max={4}*/}
					{/*	className={styles.progress}*/}
					{/*/>*/}
					{/*<p>4.00</p>*/}
					<div>
						<audio autoPlay id='audio' src={songTrack}  controls style={{height: '30px', display: "none"}}/>
					</div>
				</div>
			</div>
			<div className={styles.right}>
				{/*<Like />*/}
				<p/>
			</div>
			<div>
				<div className={styles.lyrics_button}>
					<Link to={song._id ? `/songs/lyrics/${song._id}` : `#`}>
						<div className={styles.lyrics_button_text}>
							<h1>Show Lyrics</h1>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
