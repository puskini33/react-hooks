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
import { ErrorBoundary } from './errorBoundary'

function FallbackErrorMessage({ error }) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  )
}

function PokemonInfo({ pokemonName }) {
  // initializing state to false and not to {} because fetchedPokemonDetails would otherwise be true as an object
  const [fetchedPokemonDetails, setFetchedPokemonDetails] = useState(false)

  const [error, setError] = useState(false)

  useEffect(() => {
    if (pokemonName) {
      const abortController = new AbortController()

      fetchPokemon(pokemonName, abortController.signal)
        .then((response) => {
          if (!abortController.signal.aborted)
            setFetchedPokemonDetails({
              name: response.name,
              image: response.image,
              number: response.number,
              attacks: response.attacks,
              fetchedAt: response.fetchedAt,
            })
        })
        .catch((error) => {
          setError(error)
        })

      return () => abortController.abort()
    }
  }, [pokemonName])

  let content

  if (error) {
    throw error
  } else if (!pokemonName) {
    content = 'Submit a pokemon'
  } else if (!fetchedPokemonDetails) {
    content = <PokemonInfoFallback />
  } else {
    content = <PokemonDataView pokemon={fetchedPokemonDetails} />
  }

  return content
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
        <ErrorBoundary
          pokemonName={pokemonName}
          FallbackMessage={FallbackErrorMessage}>
          <PokemonInfo pokemonName={pokemonName} key={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
