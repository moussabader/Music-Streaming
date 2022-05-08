import React, { useContext } from "react"
import Exit from "../components/Exit"
import AlbumChip from "../components/AlbumChip"
import "./SongGame.css"

import { Context } from "../Context"
import {Link} from "@mui/material";

function Over() {
  const { restartGame, correctCount, ROUNDS } = useContext(Context)
  const congratsText = () => {
    if (correctCount < ROUNDS / 2) {
      return "Maybe try again?"
    }
    return "You did great!"
  }
  return (
    <div className="over main-container" style={{background:"#3eaba1", marginTop:'30px', borderRadius:'25px', height:'400px' }}>
      <div>
        <Exit />
        <header>
          <AlbumChip />
        </header>
        <h1 style={{color: '#af1a3c', fontSize:'3em' }}>{congratsText()}</h1>
        <h2 style={{color: 'rgb(62, 8, 120)', fontSize:'2.4em' }}>
          You guessed{" "}
          <mark>
            {correctCount} / {ROUNDS}
          </mark>{" "}
          songs.
        </h2>
        <button className="button-primary" onClick={() => restartGame()}>
          Start again
        </button>
      </div>


    </div>
  )
}

export default Over
