import {useEffect, useState} from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.scss";
import axios from "axios";

const Like = ({songId, onLikesChange}) => {
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
	const [like, setLike] = useState(false);

	useEffect(async () =>{
		if (songId){
			await axios.get('http://localhost:3002/songs/get-is-liked/' + user._id + '/' + songId)
				.then((response) => {
					setLike(response.data.isLiked)
				})
		}
	}, [])

	const likeSong = async  () => {
		if (!like){
			setLike(!like)
			 await axios.put('http://localhost:3002/songs/like-song/' + songId, {user: user._id})
				.then((response) => {
					console.log(response.data)
					onLikesChange(1)
				})
		} else {
			setLike(!like)
			await axios.put('http://localhost:3002/songs/dislike-song/' + songId, {user: user._id})
				.then((response) => {
					console.log(response.data)
					onLikesChange(-1)
				})
		}

	}
	// console.log(liked)
	return (
		<IconButton className={styles.like_btn} onClick={likeSong}>
			{!like ? (
				<FavoriteBorderIcon className={styles.like_outlined} />
			) : (
				<div>
					<FavoriteIcon className={styles.like_filled} />
				</div>

			)}
		</IconButton>
	);
};

export default Like;
