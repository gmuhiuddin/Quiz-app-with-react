import { useState, useEffect } from 'react';
import './App.css';
import Timer from './Components/Timer';

function App() {

  const [quiz, setQuiz] = useState([])
  const [isClicked, setISClicked] = useState(true)
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
        var randomNumber = Math.floor(Math.random() * 3);

        res.results.map((element) => {
          element.options = [...element.incorrect_answers]
          element.options.splice(randomNumber, 0, element.correct_answer)
        })

        setQuiz(res.results)
      }).catch((err) => {
        console.log(err)
      })
  }

  function nextQuizFunc() {
    setISClicked(true)
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
      <header className="App-header">
        <div className="container">
          <h2>General knowledge quiz</h2>
          <div className="heading-div">
            <p className='queNoP'><span>{currentIndexOfQuiz + 1}</span> of <span>{quiz.length}</span></p>
            <Timer />
          </div>
          <hr />
          <div id="quiz-caintainer">
            <span className='que-txt'>{quiz[currentIndexOfQuiz]?.question}</span>
            {quiz[currentIndexOfQuiz]?.options.map((element) => {
              return <span className='options'>
                <input checked={isChecked} onChange={(e) => {
                  setIsChecked()
                  setISClicked(false)
                  setUserOption(e.target.value)
                }} name='option' type='radio' id={element} value={element}/>
                <label for={element}>{element}</label>
                <br></br>
              </span>
            })}
            <button className='btn' disabled={isClicked} onClick={() => {
              currentIndexOfQuiz + 1 != quiz.length ?
                nextQuizFunc() :
                setQuizResultPage(!quizResultPage)
            }} >{currentIndexOfQuiz + 1 == quiz.length ? 'Submit' : 'Next'}</button>
          </div>
        </div>

      </header>
    </div>

  );

}

export default App;