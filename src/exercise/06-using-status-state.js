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
  const [status, setStatus] = useState({ progress: 'idle' })

  useEffect(() => {
    if (pokemonName) {
      const abortController = new AbortController()

      setStatus({ progress: 'pending' })
      fetchPokemon(pokemonName, abortController.signal)
        .then((response) => {
          if (!abortController.signal.aborted) {
            setStatus({
              progress: 'resolved',
              fetchedPokemonDetails: {
                name: response.name,
                image: response.image,
                number: response.number,
                attacks: response.attacks,
                fetchedAt: response.fetchedAt,
              },
            })
          }
        })
        .catch((error) => {
          setStatus({ progress: 'rejected', error: error })
        })

      return () => abortController.abort()
    }
  }, [pokemonName])

  let content

  if (status.progress === 'rejected') {
    content = (
      <div role="alert">
        There was an error:{' '}
        <pre style={{ whiteSpace: 'normal' }}>{status.error.message}</pre>
      </div>
    )
  } else if (status.progress === 'idle') {
    content = 'Submit a pokemon'
  } else if (status.progress === 'pending') {
    content = <PokemonInfoFallback />
  } else {
    content = <PokemonDataView pokemon={status.fetchedPokemonDetails} />
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
        <PokemonInfo pokemonName={pokemonName} key={pokemonName} />
      </div>
    </div>
  )
}

export default App
