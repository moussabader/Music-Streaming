import React, {useRef, useState, useContext, useEffect} from "react"
import "./SongGame.css"

import {Context} from "../Context"

import Lyrics from "../components/Lyrics"
import Option from "../components/Option"
import Exit from "../components/Exit"
import AlbumChip from "../components/AlbumChip"
import Round from "../components/Round"
import {Link} from "@mui/material";
import {NavLink} from "react-router-dom";

function Quizz() {
    const {
        lyrics,
        options,
        nextRound,
        roundCount,
        ROUNDS,
        setCorrectCount,
        isLyricsLoading,
    } = useContext(Context)
    const {gameState, albums, setAlbums} = useContext(Context)
    const [optionsTitleText, setOptionsTitleText] = useState("")
    const [isAnswered, setIsAnswered] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")

    const optionsList = options.map((song) => (
        <Option
            key={song.song}
            isAnswered={isAnswered}
            song={song}
            answeredCorrect={answeredCorrect}
            answeredIncorrect={answeredIncorrect}
            selectedOption={selectedOption}
        />
    ))

    function answeredCorrect(selected) {
        setIsAnswered(true)
        setSelectedOption(selected)
        setCorrectCount((prev) => prev + 1)
        setOptionsTitleText("Correct! 😄")
    }

    function answeredIncorrect(selected) {
        setIsAnswered(true)
        setSelectedOption(selected)
        setOptionsTitleText("That's not correct! 😕")
    }

    useEffect(() => {
        setIsAnswered(false)
        setSelectedOption("")
    }, [roundCount])

    useEffect(() => {
        if (!isLyricsLoading) {
            setOptionsTitleText("Guess the song")
        }
    }, [isLyricsLoading])

    const theBottom = useRef(null)
    const scrollToBottom = () => {
        if (isAnswered) {
            setTimeout(() => {
                theBottom.current.scrollIntoView({behavior: "smooth"})
            }, 150)
        }
    }
    useEffect(scrollToBottom, [isAnswered])

    const NextSongButton = () => {
        return (
            <div>
                {gameState !== 'quizz' &&
                    <NavLink to="/game/over">
                        <button className="button-primary" onClick={() => {
                            nextRound();
                        }}>
                            End Game
                        </button>
                    </NavLink>
                }
                {gameState !== 'over' && roundCount !== 5 &&
                    <button className="button-primary" onClick={() => nextRound()}>
                        Next song
                    </button>
                }
            </div>

        )
    }

    return (
        <div>
          <div className="quizz main-container"
               style={{background: "#3eaba1", marginTop: '30px', borderRadius: '25px', marginBottom: "60px", height:'700px'}}>
            <div>
              <Exit/>
              <header>
                <AlbumChip/>
                <Round actual={roundCount} total={ROUNDS}/>
              </header>
              <Lyrics lines={lyrics}/>

              <div className="options-container">
                <h3 style={{
                  color: 'rgb(62, 8, 120)',
                  fontSize: '1.8em'
                }}>{!isLyricsLoading && optionsTitleText}</h3>
                <div className="options">
                  {!isLyricsLoading && optionsList}
                  <div className={`next-song-container ${isAnswered && "expanded"}`}>
                    {isAnswered && <NextSongButton/>}
                  </div>
                  <div ref={theBottom}/>
                </div>
              </div>
            </div>
          </div>
        </div>

    )
}

export default Quizz
