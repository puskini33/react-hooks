// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import { useEffect, useState } from 'react'

function useLocalStorageState(key, defaultValue) {
  let deserialized
  const valueInLocalStorage = window.localStorage.getItem(key)
  if (valueInLocalStorage) {
    deserialized = JSON.parse(valueInLocalStorage)
  } else {
    deserialized = defaultValue
  }

  const [state, setState] = useState(deserialized)

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
