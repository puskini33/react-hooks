import { calculateStatus } from './utils'

export function GameStatus({ winner, currentSquares, nextValue }) {
  const gameStatus = calculateStatus(winner, currentSquares, nextValue)

  return <div className="status">{gameStatus}</div>
}
