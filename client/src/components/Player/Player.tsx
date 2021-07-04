import React from 'react'
import classes from "./Player.module.css";
import {PlayerProps} from "../../shared/type/interface";

function Player({url, setUrl}: PlayerProps) {
    const onReset = () => {
        setUrl('')
    }
    return (
        <>
            <div className={classes.Player}>
                <video className={classes.Video} controls src={`/${url}`} preload='none'>
                </video>
            </div>
            <button className={`btn ${classes.btn}`} onClick={onReset}>Go back</button>
        </>
    )
}

export default Player
