import { useState, useEffect } from 'react';
import timerImg from '../../output-onlinepngtools.png'
import './style.css'

function Timer([setQuizResultPage]){
    const [second, setSecond] = useState(300);

    useEffect(() => {
        let interval = setInterval(() => {
            setSecond(second-1)
        }, 1000);

        if(second == 0){
            clearInterval(interval);
            setQuizResultPage(true);
        };

        return () => clearInterval(interval);
    })
 
    return(
        <div className="timer-div">
              <img className='timer-icon' src={timerImg} />
              <p className='timer-txt'><span>{Math.floor(second/60)}</span>:<span>{second%60 < 10?`0${second%60}`:second%60}</span>s</p>
        </div>
    )
}

export default Timer;