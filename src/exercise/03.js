// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({ name, setName }) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </div>
  )
}
function FavoriteAnimal({ animal, setAnimal }) {
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
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      <Name name={name} setName={setName} />
      <FavoriteAnimal animal={animal} setAnimal={setAnimal} />
      <Display name={name} animal={animal} />
    </form>
  )
}

export default App
