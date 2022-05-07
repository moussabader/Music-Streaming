import {Fragment, useEffect, useState} from "react";
import Song from "../../components/Song";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styles from "./styles.module.scss";
import likeImg from "../../images/like.jpg";
import peaches from "../../images/peaches.jpg";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const songs = [
	{ _id: 1, img: peaches, name: "Peaches", artist: "Justin Bieber" },
];
// const { user } = useSelector((state) => state.user);

const LikedSongs = () => {
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
	const [songs,setSongs] = useState(null);
	useEffect(async ()=>{
		await axios.get('http://localhost:3002/songs/get-liked-songs/'+user._id)
			.then((response) => {
				setSongs(response.data)
			})
	},[songs])
	if (!songs || songs.LikedSongs.length === 0){
		return (
			<div>
				<h1 style={{textAlign: "center", marginTop: '40px'}}>No songs</h1>
			</div>
		)
	}
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.head_gradient}/>
				<img src={likeImg} alt="like songs" />
				<div className={styles.playlist_info}>
					<h1>Liked Songs</h1>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.body_nav}>
					<div className={styles.left}>
						<span>#</span>
						<p>Title</p>
					</div>
					<div className={styles.center}>
						<p>Genre</p>
					</div>
					<div className={styles.right}>
						<AccessTimeIcon />
					</div>
					<div className={styles.icons}>
						<ThumbUpIcon/>
						<PlayCircleIcon/>
					</div>
				</div>
				<div style={{ marginBottom:"150px" }}>
					{songs.LikedSongs.map((song,index) => (
						<Song song={song} key={index}/>
					))}
				</div>
			</div>
		</div>
	);
};

export default LikedSongs;
