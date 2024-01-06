import { useState, useEffect } from 'react';
import timerImg from '../../output-onlinepngtools.png'

function Timer(){
    const [second, setSecond] = useState(300);

    useEffect(() => {
        setInterval(() => {
            setSecond(second-1)
        }, 1000);
    })
 
    return(
        <div className="timer-div">
              <img className='timer-icon' src={timerImg} />
              <p className='timer-txt'><span>{Math.floor(second/10)}</span>:<span>{second%60 < 10?`0${second%60}`:second%60}</span>s</p>
        </div>
    )
}

export default Timer;