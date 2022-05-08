import React, { useContext } from "react"
import "./SongGame.css"
import peaches from "../images/peaches.jpg";

import { Context } from "../Context"

function AlbumChip() {
  const { selectedAlbum } = useContext(Context)

  return (
    <div className="album-chip">
      <img style={{width:'70px', height:'70px', borderRadius:'50px', borderColor:'rgba(193,33,67,0.89)', borderStyle:'solid'}}
        className="album-thumbnail"
        src={selectedAlbum.imgUrl ? selectedAlbum.imgUrl : peaches }
        alt={selectedAlbum.name + " cover"}
        width="100px"
        height="100px"
      />
      <h3 className="album--title" style={{fontSize:'30px', fontFamily:"cursive"}}>{selectedAlbum.name}</h3>
    </div>
  )
}

export default AlbumChip
