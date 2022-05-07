import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from './styles.module.scss'
import axios from "axios";

const SongLyrics = () => {
    const [lyrics, setLyrics] = useState("")
    let id = useParams();
    useEffect(async () => {
        await axios.get('http://localhost:3002/songs/get-lyrics/'+id.id)
            .then((response) => {
                setLyrics(response.data.Lyrics.lyrics)
            })
    }, []);
    return(
        <div className={styles.lyrics}>
            <p>{lyrics}</p>
        </div>)
}
export default SongLyrics;
