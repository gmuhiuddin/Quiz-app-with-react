import { useState, useEffect } from 'react';
import './App.css';
import Timer from './Views/Timer';
import QuizContainer from './Views/Quiz-rendering';

function App() {

  const [quiz, setQuiz] = useState([])
  const [isClicked, setIsClicked] = useState(true)
  const [quizResultPage, setQuizResultPage] = useState(false)
  const [currentIndexOfQuiz, setCurrentIndexOfQuiz] = useState(0)
  const [userOption, setUserOption] = useState('')
  const [correctQue, setCorrectQue] = useState(0)
  const [isChecked,setIsChecked] = useState('')

  useEffect(function () {
    getQuestions()
  }, [])

  function getQuestions() {
    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
      .then(res => res.json())
      .then(res => {

        res.results.map((element) => {
        var randomNumber = Math.floor(Math.random() * 3);

          element.options = [...element.incorrect_answers];

          element.options.splice(randomNumber, 0, element.correct_answer);
        })

        setQuiz(res.results)
      }).catch((err) => {
        console.log(err)
      })
  }

  function nextQuizFunc() {
    setIsClicked(true)
    if (userOption == quiz[currentIndexOfQuiz].correct_answer) {
      setCorrectQue(correctQue + 1)
    }
    console.log(userOption , quiz[currentIndexOfQuiz].correct_answer)
    setCurrentIndexOfQuiz(currentIndexOfQuiz + 1)
    setIsChecked('')
  }

  if (quizResultPage) {
    return <div className='App'>
      <header className='App-header'>
        <div className={quiz.length - correctQue <= correctQue?'hi-score-div':'low-score-div'}>
          <h1><span id="score-per">{correctQue * 10}</span>%</h1>
        </div>
        <br>
        </br>
        <br></br>
        <div className='queCorWro'><p>{correctQue} Correct answer</p><p>{quiz.length - correctQue} Wrong answer</p></div>
      </header>
    </div>
  }

  if (!quiz.length) {
    return <div className='loader-div'>
      <div class="loader"></div>
    </div>
  }

  return (

    <div className="App">
      
        <div className="container">
          <h2 style={{textAlign:'center', fontSize:'49px',color:'white'}}>General knowledge quiz</h2>
          <div className="heading-div">
            <p className='queNoP'><span>{currentIndexOfQuiz + 1}</span> of <span>{quiz.length}</span></p>
            <Timer />
          </div>
          <hr />
          <QuizContainer isClicked={isClicked} setQuizResultPage={setQuizResultPage} setUserOption={setUserOption} nextQuizFunc={nextQuizFunc} setIsClicked={setIsClicked} isChecked={isChecked} setIsChecked={setIsChecked} quiz={quiz} currentIndexOfQuiz={currentIndexOfQuiz} quizResultPage={quizResultPage} />
        </div>

    </div>

  );

}

export default App;