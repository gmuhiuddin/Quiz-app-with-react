import './style.css';

function ResultPage({correctQue, quiz}){
return(
<div className='result-container'>
        <div className={quiz.length - correctQue <= correctQue?'hi-score-div':'low-score-div'}>
          <h1><span id="score-per">{correctQue * 10}</span>%</h1>
        </div>
        <br />
        <br />
        <div className='queCorWro'><p>{correctQue} Correct answer</p><p>{quiz.length - correctQue} Wrong answer</p></div>
    </div>
)
}

export default ResultPage;