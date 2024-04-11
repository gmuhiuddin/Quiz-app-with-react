
function QuizContainer({isClicked, setQuizResultPage, nextQuizFunc, setUserOption, setIsClicked, setIsChecked, isChecked, quiz, currentIndexOfQuiz, quizResultPage}){

    return(
      <div id="quiz-caintainer">
            <span className='que-txt'>Q) {quiz[currentIndexOfQuiz]?.question}</span>
            <br />
            <br />
            {quiz[currentIndexOfQuiz]?.options.map((element) => {
              return <span className='options'>
                <input className='input' checked={isChecked} onChange={(e) => {
                  setIsChecked()
                  setIsClicked(false)
                  setUserOption(e.target.value)
                }} name='option' type='radio' id={element} value={element}/>
                <label className='label' htmlFor={element}>{element}</label>
                <br />
                <br />
              </span>
            })}
            <br />
            <div className='btn-container'>
            <button className='btn' disabled={isClicked} onClick={() => {
              currentIndexOfQuiz + 1 != quiz.length ?
                nextQuizFunc() :
                setQuizResultPage(!quizResultPage)
            }} >{currentIndexOfQuiz + 1 == quiz.length ? 'Submit' : 'Next'}</button>
            </div>
            <br />
          </div>
    )
}

export default QuizContainer;