import {useState, Fragment, useEffect} from "react";
import Song from "../../components/Song";
import PlaylistModel from "../../components/PlaylistModel";
import { IconButton } from "@mui/material";
import playlistImg from "../../images/rock.jpg";
import peaches from "../../images/peaches.jpg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";
import {useParams} from "react-router-dom";
import playlistLogo from "../../images/playlist_logo.jpg";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {confirmAlert} from "react-confirm-alert";
import Select from "../../components/Inputs/Select";
import Modal from "../../components/Modal"
import Backdrop from "../../components/Backdrop"
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";


const Playlist = () => {
	const [modalIsOpen,setModalIsOpen]= useState(false);
	const [songs, setSongs] = useState([]);
	const [playlist,setPlaylist] = useState({
		title: "",
		scope: "",
		songs: [],
	});
	let id = useParams();
	useEffect(async () => {
		await axios.get('http://localhost:3002/playlists/get/'+id.id)
			.then((response) => {
				setPlaylist(response.data.Playlist)
			})
		await axios.get('http://localhost:3002/playlists/get-songs/'+id.id)
			.then((response) => {
				setSongs(response.data.PlaylistSongs)
			})
	}, []);
	const handleInputState = (name, value) => {
		setPlaylist((data) => ({...data, [name]: value}));
	};
	const handleDelete = async () => {
		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you want to delete '+playlist.title+' playlist',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => await axios.delete('http://localhost:3002/playlists/delete/' + id.id)
						.then(() => { window.location = '/collection/playlists'})
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
	const handleOpenModal = () => {
		setModalIsOpen(true)
	}
	const handleCloseModal = () => {
		setModalIsOpen(false)
	}
	const handleUpdate = async () => {
		await axios.put('http://localhost:3002/playlists/update/' + id.id, playlist)
			.then((response) => {
				console.log(response.data)
				handleCloseModal();
			})
	}
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				{/*<div className={styles.head_gradient}/>*/}
				<img
					src={playlistLogo}
					alt={"playlistLogo"}
					style={{background: "#919496"}}
				/>
				<div className={styles.playlist_info}>
					{playlist.scope === 'PRIVATE' && (
						<LockIcon/>
					)}
					{playlist.scope === 'PUBLIC' && (
						<PublicIcon/>
					)}
					{playlist.scope === 'FRIENDS_ONLY' && (
						<GroupIcon/>
					)}
					<h1>{playlist.title}</h1>
				</div>
				<div className={styles.actions_container}>
					<IconButton onClick={handleOpenModal}>
						<EditIcon />
					</IconButton>
					{modalIsOpen && <Modal onCloseModal={handleCloseModal}
										   playlist={playlist}
										   handler={handleInputState}
										   onUpdateHandle={handleUpdate}/>}
					{modalIsOpen ? <Backdrop onCloseModal={handleCloseModal}/> : null }
					<IconButton>
						<DeleteIcon onClick={handleDelete}/>
					</IconButton>
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
				<div className={styles.scroll__container} style={{ marginBottom:"150px" }}>
					{songs.map((song,index) => (
						<Fragment key={song._id}>
							<Song songId={song} song={song} key={index} canRemoveFromPlaylist={true}  index={index} songs={songs}/>
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default Playlist;
