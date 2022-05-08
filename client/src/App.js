
import {Fragment, useContext, useEffect, useRef} from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice/apiCalls";

import PrivateRoute from "./PrivateRoute";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Songs from "./pages/MySongs";
import AllSongs from "./pages/AllSongs";
import Room from "./pages/Room";
import Library from "./pages/Library";
import Sidebar from "./components/Sidebar";
import SidebarProfile from "./components/SidebarProfile";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import SearchLyrics from "./pages/SearchLyrics";
import LikedSongs from "./pages/LikedSongs";
import Profile from "./pages/Profile";
import UploadSong from "./pages/UploadSong";
import AddPlaylist from "./pages/AddPlaylist";
import payment from "./pages/Payment";
import SongLyrics from "./pages/SongLyrics";
import HomeGame from "./pages/HomeGame"
import Quiz from "./pages/Quizz"
import Over from "./pages/Over"
import {Context} from "./Context";


const App = () => {
	require('dotenv').config();
	const dispatch = useDispatch();
	const location = useLocation();

	// const { user } = useSelector((state) => state.auth);
	let { user } = useSelector((state) => state.auth);
	user = true;
	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			
			if (user) token = user.token;
		}

		if (user && token) {
			
			getUser(user.audience, dispatch);
				
		}
	}, [dispatch, user]);


	return (
		<Fragment>

			{/* if (user) {
				location.pathname !== "/login" &&
				location.pathname !== "/" &&
				location.pathname !== "/signup" &&
				location.pathname !== "/not-found" && (
					<Fragment>
						<Navbar />
						<Sidebar />
						<AudioPlayer />
					</Fragment>
				)
			} */}

			{/* if (location.pathname =="/me" && user){
				(
					<Fragment>
						<Navbar />
						<SidebarProfile />
						<AudioPlayer />
					</Fragment>
				)
			} */}

			 {user &&
				location.pathname !== "/login" &&
				location.pathname !== "/" &&
				location.pathname !== "/signup" &&
				location.pathname !== "/not-found" && (
					<Fragment>
						<Navbar />
						<Sidebar />
						<AudioPlayer />
					</Fragment>
				)}

			
			<Switch>
				<Route exact path="/" component={Main} />
				<PrivateRoute exact user={user} path="/home" component={Home} />
				<PrivateRoute exact user={user} path="/chat" component={Room} />
				<PrivateRoute
					exact
					user={user}
					path="/collection/liked-songs"
					component={LikedSongs}
				/>
				<PrivateRoute
					exact
					user={user}
					path="/collection/playlists"
					component={Library}
				/>
				<PrivateRoute exact user={user} path="/search" component={Search} />
				<PrivateRoute exact user={user} path="/search-lyrics" component={SearchLyrics} />
				<PrivateRoute exact user={user} path="/payment" component={payment} />
				<PrivateRoute
					exact
					user={user}
					path="/playlist/:id"
					component={Playlist}
				/>
				<PrivateRoute 
					exact 
					user={user}
					path="/me" 
					component={Profile} 
				/>
				<PrivateRoute
					exact
					user={user}
					path="/songs/add"
					component={UploadSong}
				/>
				<PrivateRoute
					exact
					user={user}
					path="/collection/mytracks"
					component={Songs}
				/>
				<PrivateRoute
					exact
					user={user}
					path="/collection/tracks"
					component={AllSongs}
				/>
				<PrivateRoute
					exact
					user={user}
					path="/collection/playlist/add"
					component={AddPlaylist}
				/>
				<PrivateRoute
					exact
					user={user}
					path="/songs/lyrics/:id"
					component={SongLyrics}
				/>
					<PrivateRoute
						exact
						user={user}
						path="/game"
						component={HomeGame}
					/>

					<PrivateRoute
					exact
					user={user}
					path="/game/quizz"
					component={Quiz}
				/>
					<PrivateRoute
					exact
					user={user}
					path="/game/over"
					component={Over}
				/>
				{user && <Redirect from="/signup" to="/home" />}
				{user && <Redirect from="/login" to="/home" />}
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/not-found" component={NotFound} />
				{/*<Redirect to="/not-found" />*/}
			</Switch>
		</Fragment>
	);
};

export default App;
