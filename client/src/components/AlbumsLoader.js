import React from "react"
import "./SongGame.css"

function AlbumsLoader() {
  var placeholders = []
  for (var i = 0; i < 9; i++) {
    placeholders.push(<div key={i} className="album-placeholder"></div>)
  }
  return <>{placeholders}</>
}

export default AlbumsLoader
