import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import Song from "../../components/Song";
import {assert} from "joi";
import Playlists from "../../components/Playlists";
import playlistImg from "../../images/rock.jpg";
import Player from "../../components/Player";

const Songs =  () => {
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

    const [songs,setSongs] = useState(null);
    useEffect(async () => {
        await axios.get('http://localhost:3002/songs/get-user-songs/' + user._id)
            .then((response) => {
                setSongs(response.data)
            })
    }, []);
    if (!songs || songs.Songs.length === 0){
        return (
            <div>
                <h1 style={{textAlign: "center", marginTop: '40px'}}>No songs</h1>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <h1>My Songs</h1>
            <div className={styles.songs}>
                {songs.Songs.map((song,index) => (
                    <Song song={song} key={index} canDelete={true}  index={index} songs={songs.Songs}/>
                ))}
            </div>
        </div>
    )
}
export default Songs;
