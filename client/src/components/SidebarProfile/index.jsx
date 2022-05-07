import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import logo from "../../images/beatzz.png";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";

const playlists = [
	{ _id: 1, img: "", name: "Today's Top Songs", desc: "By Jahangeer" },
];

const Sidebar = () => {
	return (
		<div className={styles.container}>
			<img className={styles.logo_img} src={logo} alt="logo" />
			<NavLink
				to="/home"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<HomeIcon />
				<span>Home</span>
			</NavLink>
			<NavLink
				to="#"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<PersonIcon />
				<span>General profile</span>
			</NavLink>
			<NavLink
				to="#"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<LockIcon />
				<span>Password</span>
			</NavLink>
			
			<div className={styles.underline}></div>
			{playlists.map((playlist) => (
				<NavLink
					key={playlist._id}
					to={`/playlist/${playlist._id}`}
					activeClassName={styles.active_link}
					className={styles.playlist_link}
				>
					{playlist.name}
				</NavLink>
			))}
		</div>
	);
};

export default Sidebar;
