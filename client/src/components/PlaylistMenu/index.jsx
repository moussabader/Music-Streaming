import {Fragment, useEffect, useState} from "react";
import { ClickAwayListener } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./styles.module.scss";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useHistory, useParams} from "react-router-dom";
import QueueIcon from '@mui/icons-material/Queue';
import {toast} from "react-toastify";

const PlaylistMenu = ({ closeMenu, songId, songName, canDelete, canRemoveFromPlaylist}) => {
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
	let id;
	const playlistId = useParams();
	const [playlists,setPlaylists] = useState(null);

	useEffect(async () => {
		await axios.get('http://localhost:3002/playlists/get-user-playlists/'+user._id)
			.then((response) => {
				setPlaylists(response.data)
			})
	}, []);
	const handleDelete = async () => {
		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you want to delete '+songName,
			buttons: [
				{
					label: 'Yes',
					onClick: async () => await axios.delete('http://localhost:3002/songs/delete/' + songId)
						.then((response) => {
							console.log(response.data)
						}).then(() => { window.location = '/collection/tracks'})
				},
				{
					label: 'No',
					onClick: () => window.close()
				}
			],
			closeOnEscape: true,
			closeOnClickOutside: true,
		});
	}
	const handleAddToPlaylist = async (e) => {
		if (playlists){
			playlists.Playlists.map((playlist) => {
				if (playlist.title === e.target.innerHTML){
					id = playlist._id;
				}
			})
			await axios.put('http://localhost:3002/playlists/add-song/' + id, {songId: songId})
				.then(() => {
					toast.success('Song added');
				})
				.catch((e) => {
					toast.error('Song already there')
				})
		}

	}
	const handleRemoveFromPlaylist = async (e) => {
			await axios.put('http://localhost:3002/playlists/remove-song/' + playlistId.id, {songId: songId})
				.then(() => { window.location = '/playlist/'+playlistId.id})
	}

	if (!playlists) {
		return (
			<div/>
		)
	}
	return (
		<ClickAwayListener onClickAway={closeMenu}>
			<div className={styles.menu} onClick={closeMenu}>
				{canRemoveFromPlaylist &&
					<div className={styles.option} >
						<button onClick={handleRemoveFromPlaylist} className={styles.delete}>Remove From Playlist</button>
					</div>
				}
				{canDelete &&
					<div className={styles.option} >
						<button  onClick={handleDelete} className={styles.delete}>Delete</button>
					</div>
				}
				{!canRemoveFromPlaylist &&
					<div className={styles.playlist_option}>
						<p>Add to Playlist</p>
						<Fragment>
							<QueueIcon />
							<div className={styles.playlists}>
								{playlists.Playlists.map((playlist) => (
									<div className={styles.option} key={playlist._id} >
										<button onClick={handleAddToPlaylist} className={styles.delete}>{playlist.title}</button>
									</div>
								))}
							</div>
						</Fragment>
					</div>
				}

				{/*<div className={styles.option}>*/}
				{/*	<p>Go to artist</p>*/}
				{/*</div>*/}
			</div>
		</ClickAwayListener>
	);
};

export default PlaylistMenu;
