import {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import axios from "axios";
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import playlistLogo from "../../images/playlist_logo.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Playlists = ({ playlists }) => {
	if (!playlists){
		return (
			<div>
				<h1 style={{textAlign: "center", fontSize: '15px'}}>You have no playlists! Go create one</h1>
			</div>
		)
	}
	return (
		<Fragment>
			{playlists.map((playlist) => (
				<Link key={playlist._id} to={`/playlist/${playlist._id}`}>
					<div className={styles.playlist}>
						<img
							src={playlistLogo}
							alt={playlist.title}
							style={{background: "#919496"}}
						/>
						<p>{playlist.title}</p>
						{playlist.scope === 'PRIVATE' &&(
							<LockIcon/>
						)}
						{playlist.scope === 'PUBLIC' &&(
							<PublicIcon/>
						)}
						{playlist.scope === 'FRIENDS_ONLY' &&(
							<GroupIcon/>
						)}
						<hr style={{color: '#3eaba1', borderRadius:"100%"}}/>
						{/*<span>*/}
						{/*	<p>{playlist.nbrLikes} <ThumbUpIcon/> </p>*/}
						{/*	<hr style={{color: "#282828", border:"none"}}/>*/}
						{/*	<p>{playlist.nbrPlays} <PlayCircleIcon/> </p>*/}
						{/*</span>*/}

					</div>
				</Link>
			))}
		</Fragment>
	);
};

export default Playlists;
