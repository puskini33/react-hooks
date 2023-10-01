// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import {
  calculateNextValue,
  calculateWinner,
  updateHistory,
  useLocalStorageState,
} from './ticTacToeGame/utils'
import { GameStatus } from './ticTacToeGame/GameStatus'
import { Board } from './ticTacToeGame/Board'
import { History } from './ticTacToeGame/History'
import { GameContext } from './ticTacToeGame/GameContext'

const initialHistory = [Array(9).fill(null)]

function Game() {
  const [history, setHistory] = useLocalStorageState(
    'tic-tac-toe-history',
    initialHistory
  )
  const [step, setStep] = useLocalStorageState('tic-tac-toe-step', 0)

  const currentSquares = history[step]

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)

  function restart() {
    setHistory(initialHistory)
    setStep(0)
  }

  function selectSquare(i) {
    // consider the square only if there is no winner or the square wasn't already drawn
    if (winner || currentSquares[i]) {
      return
    }

    const newSquares = currentSquares.toSpliced(i, 1, nextValue)
    const newHistory = updateHistory(history, step, newSquares)

    setHistory(newHistory)
    setStep(step + 1)
  }

  return (
    <>
      <div className="game">
        <GameStatus
          winner={winner}
          currentSquares={currentSquares}
          nextValue={nextValue}
        />
        <Board selectSquare={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <History step={step} setStep={setStep} history={history} />
    </>
  )
}

function App() {
  return <Game />
}

export default App
