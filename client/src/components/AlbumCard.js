import React, { useContext } from "react"

import { Context } from "../Context"
import styles from "./AudioPlayer/styles.module.scss";
import {Link} from "react-router-dom";
import "./SongGame.css"

function AlbumCard({ album }) {
  const { startGame } = useContext(Context)

  return (
    // <button className="album-card" onClick={() => {
    //     startGame(album);
    //
    // }}>
      <Link to="/game/quizz">
          <button className="album-card" onClick={() => startGame(album) } >
      <div className="image-container">
        <img className="album-cover-shadow" src={album.image[0]['#text']} alt="" />
        <img
          className="album-cover"
          src={album.image[2]['#text']}
          alt={album.name + " cover"}
          height="153"
          width="153"
        />
      </div>
    </button>
          <div className="album--info" style={{fontSize:'7px', textAlign:"center"}}>
              <h3 className="album--title" >{album.name}</h3>
          </div>
      </Link>
  )
}

export default AlbumCard
