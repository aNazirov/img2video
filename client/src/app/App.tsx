import React, {useState} from 'react';
import classes from './App.module.css';
import Logo from "../components/Logo/Logo";
import Dropbox from "../components/Dropbox/Dropbox";
import Loader from "../components/Loader/Loader";
import Player from "../components/Player/Player";


function App() {
    const [url, setUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <div className={classes.AppMain}>
            <Logo/>
            {
                !loading && !url
                    ? <Dropbox setLoading={setLoading} setUrl={setUrl}/>
                    : loading && !url
                    ? <Loader/>
                    : <Player url={url} setUrl={setUrl}/>
            }
        </div>
    );
}

export default App;
