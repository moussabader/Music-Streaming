import {createContext, useState} from "react";
import axios from "axios";

const PlayerContext = createContext({
    song: {
        title: "",
        release: "",
        genre: "",
        artists: [],
    },
    songImage: '',
    nextSong: {
        title: "",
        release: "",
        genre: "",
        artists: [],
    },
    prevSong: {
        title: "",
        release: "",
        genre: "",
        artists: [],
    },
    playSong: (song, songImage, prevSong, nextSong)=>{},
});

export function PlayerContextProvider (props)  {
    const [songCtx, setSongCtx] = useState({
        title: "",
        release: "",
        genre: "",
        artists: [],
    });
    const [prevSongCtx, setPrevSongCtx] = useState(null);
    const [nextSongCtx, setNextSongCtx] = useState(null);
    const [songTrackCtx , setSongTrackCtx] = useState('');
    const [songImageCtx, setSongImageCtx] = useState('');

    const playSongHandler = async (song, songImage, prevSong, nextSong) => {
        setSongCtx(song)
        setSongImageCtx(songImage)
        setPrevSongCtx(prevSong)
        setNextSongCtx(nextSong)
        await axios.get('http://localhost:3002/songs/get-track/' + song._id, {
            responseType: 'arraybuffer',
        }).then(response => {
            const arrayBuffer = response.data;
            const blob = new Blob([arrayBuffer], {type: "audio/mpeg"});
            const url = window.URL.createObjectURL(blob);
            setSongTrackCtx(url)
        })

    }
    const context = {
        song: songCtx,
        songTrack: songTrackCtx,
        songImage: songImageCtx,
        prevSong : prevSongCtx,
        nextSong: nextSongCtx,
        playSong: playSongHandler,
    }
    return(
        <PlayerContext.Provider value={context}>
            {props.children}
        </PlayerContext.Provider>
    );
}
export default PlayerContext;
