import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import Song from "../../components/Song";
import {assert} from "joi";
import Playlists from "../../components/Playlists";
import playlistImg from "../../images/rock.jpg";

const Songs =  () => {
    const [playlists,setPlaylists] = useState(null);
    useEffect(async () => {
        await axios.get('http://localhost:3002/playlists/get-all')
            .then((response) => {
                setPlaylists(response.data)
            })
    }, []);
    const [songs,setSongs] = useState(null);
    useEffect(async () => {
        await axios.get('http://localhost:3002/songs/get-songs/')
            .then((response) => {
                setSongs(response.data)
            })
    }, []);
    if (!songs || songs.song.length === 0){
        return (
            <div/>
        )
    }
    if (!playlists){
        return (
            <div/>
        )
    }
    return (
        <div className={styles.container}>
            <h1>Discover new Music</h1>
            <div className={styles.songs}>
                {songs.song.map((song,index) => (
                    <Song song={song} key={index} index={index} songs={songs.song}/>
                ))}
            </div>
            <h1>Discover Our Playlists</h1>
            <div className={styles.scroll__container}
                 style={{ marginBottom:"150px" }}
            >
                <Playlists playlists={playlists.Playlists} />
            </div>
        </div>
    )
}
export default Songs;
