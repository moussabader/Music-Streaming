import React, { useContext } from "react"
import "./SongGame.css"

function Round({ actual, total }) {
  return (
    <div className="round-counter" style={{width:'70px', height:'30px'}}>
      <span className="actual" style={{fontSize:'20px', fontFamily:"cursive"}}>{actual}</span>
      <span className="total" style={{fontSize:'20px', fontFamily:"cursive"}}>{total}</span>
    </div>
  )
}

export default Round
