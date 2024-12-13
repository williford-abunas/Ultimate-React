import { useEffect, useReducer } from 'react';
import Header from './components/Header.js'
import Main from './components/Main.js'
import Loader from './components/Loader.js'
import Error from './components/Error.js'
import StartScreen from './components/StartScreen.js'
import Question from './components/Question.js'
import NextButton from './components/NextButton.js'
import Progress from './components/Progress.js'
import FinishScreen from './components/FinishScreen.js'




const initialState = {
  questions: [],
  // 'loading;, 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
}

function reducer (state, action) {
  switch(action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: "ready"}
    case 'dataFailed':
      return {...state, status: "error"}
    case 'start':
      return {...state, status: "active"}
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {...state, answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      }
    case 'nextQuestion':
      return {...state, index: state.index + 1, answer: null}
    case 'finish':
      return {...state, status: 'finish', highscore: state.points > state.highscore ? state.points : state.highscore}
    case 'restart':
      return {...initialState, questions: state.questions, status: 'ready'}
    default:
      throw new Error("Action unknown")  
  }
  
}

function App() {
  const [{questions, status, index, answer, points, highscore}, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((cur, acc) => cur + acc.points, 0)

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await fetch("http://localhost:8000/questions")
        if (!res.ok) throw new Error("Cannot fetch")
        const data = await res.json()
        dispatch({type: 'dataReceived', payload: data})
      } catch (e) {
        console.error(e.message)
        dispatch({type: "dataFailed"})
      }

    }

    fetchData()
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' && 
        <>
        <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
        <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
        <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
        </>
        }
        {status === 'finish' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
