// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({ name, onNameChange }) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

function FavoriteAnimal() {
  const [animal, setAnimal] = React.useState('')
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={(event) => setAnimal(event.target.value)}
      />
    </div>
  )
}

function Display({ name, animal }) {
  return (
    <div>{`
    Hey ${name}, you are great! 
    Your favourite animal is the ${animal}.
    `}</div>
  )
}

function App() {
  const [name, setName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={(event) => setName(event.target.value)} />
      <FavoriteAnimal />

      <Display name={name} animal={'dog'} />
    </form>
  )
}

export default App
