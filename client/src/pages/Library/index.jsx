import { Link } from "react-router-dom";
import Playlists from "../../components/Playlists";
import playlistImg from "../../images/rock.jpg";
import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";

const Library = () => {
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
	const [playlists,setPlaylists] = useState(null);
	useEffect(async () => {
		await axios.get('http://localhost:3002/playlists/get-user-playlists/'+user._id)
			.then((response) => {
				setPlaylists(response.data)
			})
	}, []);

	if (!playlists){
		return (
			<div/>
		)
	}
	return (
		<div className={styles.container}>
			<div className={styles.playlists_container}>
				<Link to="/collection/mytracks">
					<div className={styles.liked_songs}>
						<h1>My Songs</h1>
						<br/>
					</div>
				</Link>
			</div>
			<h1>Playlists</h1>
			<div className={styles.playlists_container}>
				<div  style={{ marginBottom:"150px", display: 'flex', flexWrap:'wrap' }}>
					<Playlists playlists={playlists.Playlists} />
				</div>
			</div>
		</div>
	);
};

export default Library;
