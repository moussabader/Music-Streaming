import {useContext, useEffect, useRef, useState} from "react";
import Like from "../Like";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {IconButton} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";
import axios from "axios";
import AudioPlayer from "../AudioPlayer";
import PlayerContext from "../../store/player-context";
import {toast} from "react-toastify";

const Song = ({ song, index, songs, canDelete, canRemoveFromPlaylist }) => {
	// const { user } = useSelector((state) => state.user);
	const user = {
		_id: '6268913cf11e47afa44c2e2e' ,
		username: 'usertest1',
		password: 'Password123@',
		email: 'test@gmail.com',
		follows:[] ,
		followers:[],
		accType: 'FREE' ,
		ROLE: 'BASIC_USER'
	}
	const playerCtx = useContext(PlayerContext)
	const [menu, setMenu] = useState(false);
	const [songImg, setSongImg] = useState("");
	const [songTrack, setSongTrack] = useState(false);
	const [prevTrack, setPrevTrack] = useState("");
	const [songLikes, setSongLikes] = useState(song.nbrLikes);
	const [songListens, setSongListens] = useState(song.nbrListens);
	const [nextSong, setNextSong] = useState(null);
	const [prevSong, setPrevSong] = useState(null);

	const handleLikes = (change) => {
		setSongLikes(songLikes+change)
	}
	useEffect(async () => {
		if (songs) {
			setPrevSong(songs[index - 1])
			setNextSong(songs[index + 1])
		}
		await axios.get('http://localhost:3002/songs/get-image/'+ song._id,{
			responseType: 'arraybuffer'
		}).then((response) => {
			let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
			let srcValue = "data:image/png;base64,"+base64ImageString;
			setSongImg(srcValue)
			})

		// await axios.get('http://localhost:3002/songs/get-track/'+ song._id, {
		// 	responseType: 'arraybuffer',
		// }).then(response => {
		// 	const arrayBuffer = response.data;
		// 	const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
		// 	const url = window.URL.createObjectURL(blob);
		// 	setSongTrack(url)
		// })
	}, []);

	const playSong = async () => {
	setSongTrack(true)
		if (!songTrack){
			const audio = document.getElementById('audio')
			audio.pause();
			playerCtx.playSong(song, songImg, prevSong, nextSong);
			console.log("1")
			setSongListens(songListens + 1)
			await axios.put('http://localhost:3002/songs/play-song/' + song._id)
		}
		if (songTrack){
			const audio = document.getElementById('audio')
			audio.pause();
			playerCtx.playSong(song, songImg, prevSong, nextSong);
			console.log('2')
		}

	}
	// next and prev buttons nab3eth el prev song lel context w on click naamel playsong

	return (
		<div className={styles.song_container}>
			<div className={styles.left}>
				<IconButton className={styles.play_btn} onClick={playSong}>
					<PlayArrowIcon />
				</IconButton>
				{songImg && (
					<img src={songImg} alt="song_img" />
				)}
				<p>{song.title}</p>
			</div>
			<div className={styles.center}>
				<p>{song.artist}</p>
				{song.genre.map((genre,index) => (
					<span className={styles.genre}>{genre}</span>
				))}
			</div>
			<div className={styles.right}>
				<Like songId={song._id} onLikesChange={handleLikes}/>
				<p>{song.duration}</p>
				<p style={{letterSpacing: '0.1rem'}}>{songLikes} </p>
				<ThumbUpIcon/>
				<p style={{letterSpacing: '0.1rem'}}>{songListens} </p>
				<PlayCircleIcon/>
				<IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
					<MoreHorizIcon />
				</IconButton>
				{menu && (
					<PlaylistMenu canRemoveFromPlaylist={canRemoveFromPlaylist}
								  canDelete={canDelete}
								  songId={song._id}
								  songName={song.title}
								  closeMenu={() => setMenu(false)} />
				)}
			</div>
		</div>
	);
};

export default Song;
