import { useState, useEffect } from 'react';
import './App.css';
import Timer from './Views/Timer';
import QuizContainer from './Views/Quiz-rendering';
import ResultContainer from './Views/ResultPage';
import Loader from './Views/Loader'

function App() {

  const [currentIndexOfQuiz, setCurrentIndexOfQuiz] = useState(0);
  const [quizResultPage, setQuizResultPage] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  const [userOption, setUserOption] = useState('');
  const [correctQue, setCorrectQue] = useState(0);
  const [isChecked,setIsChecked] = useState('');
  const [quiz, setQuiz] = useState([]);

  useEffect(function () {
    getQuestions()
  }, [])
  
  function getQuestions() {

    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
      .then(res => res.json())
      .then(res => {

        res.results?.forEach((element) => {

          var randomNumber = Math.floor(Math.random() * 3);
          
          element.options = [...element.incorrect_answers];

          element.options.splice(randomNumber, 0, element.correct_answer);
        })
        
        res.results && setQuiz(res.results);
      }).catch((err) => {
        console.log(err);
      })
  };
  
  function nextQuizFunc() {
    setIsClicked(true)
    if (userOption == quiz[currentIndexOfQuiz].correct_answer) {
      setCorrectQue(correctQue + 1)
    }
    setCurrentIndexOfQuiz(currentIndexOfQuiz + 1)
    setIsChecked('')
  }

  if (!quiz.length) {
    return <Loader />
  };

  if(quizResultPage){
    return <ResultContainer quiz={quiz} correctQue={correctQue} />
  };

  return (
    
    <div className="App">
        <div className="container">
          <h2 style={{textAlign:'center', fontSize:'41px',color:'white'}}>General knowledge quiz</h2>
          <div className="heading-div">
            <p className='queNoP'><span>{currentIndexOfQuiz + 1}</span> of <span>{quiz.length}</span></p>
            <Timer setQuizResultPage={setQuizResultPage} />
          </div>
          <hr />
          <QuizContainer isClicked={isClicked} setQuizResultPage={setQuizResultPage} setUserOption={setUserOption} nextQuizFunc={nextQuizFunc} setIsClicked={setIsClicked} isChecked={isChecked} setIsChecked={setIsChecked} quiz={quiz} currentIndexOfQuiz={currentIndexOfQuiz} quizResultPage={quizResultPage} />
        </div>

    </div>

  );

}

export default App;