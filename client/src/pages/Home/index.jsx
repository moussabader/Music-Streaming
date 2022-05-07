import { Fragment } from "react";
import Playlists from "../../components/Playlists";
import styles from "./styles.module.scss";
import Song from "../../components/Song"
import playlistImg from "../../images/rock.jpg";
import peaches from "../../images/peaches.jpg";

const Home = () => {
	return (
		<Fragment>
			<div className={styles.container}>

				<h1>Songs for you</h1>
				<div className={styles.playlists_container}>
					{/*{songs.map((song,index) => (*/}
					{/*	<Song song={song} key={index}/>*/}
					{/*))}*/}
				</div>

				<h1>Latest Albums</h1>
				<div className={styles.scroll__container}>
						<Playlists/>
				</div>
				<h1>Trending now</h1>
				<div className={styles.scroll__container}
					style={{ marginBottom:"150px" }}
				>
					<Playlists/>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
