// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import { useEffect, useState } from 'react'

function PokemonInfo({ pokemonName }) {
  const [fetchedPokemonDetails, setFetchedPokemonDetails] = useState(false)

  useEffect(() => {
    if (pokemonName) {
      const abortController = new AbortController()

      fetchPokemon(pokemonName, abortController.signal).then((response) => {
        if (!abortController.signal.aborted)
          setFetchedPokemonDetails({
            name: response.name,
            image: response.image,
            number: response.number,
            attacks: response.attacks,
            fetchedAt: response.fetchedAt,
          })
      })

      return () => abortController.abort()
    }
  }, [pokemonName])
  // fetchedPokemonDetails is after first setting always true
  return !pokemonName ? (
    'Submit a pokemon'
  ) : !fetchedPokemonDetails ? (
    <PokemonInfoFallback />
  ) : (
    <PokemonDataView pokemon={fetchedPokemonDetails} />
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  // This is a state lift-up. this means that both children need access to the pokemonName state.
  // why useEffect? The value of pokemonName for PokemonInfo might come also from somewhere else, not necessarily a user event
  // (for example, it is a default value)
  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} key={pokemonName} />
      </div>
    </div>
  )
}

export default App
