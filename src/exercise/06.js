// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import pokemonHollow from '../fonts/pokemon/Pokemon Hollow.ttf'
import { fetchPokemon, PokemonForm } from '../pokemon'
import { useEffect, useState } from 'react'

function PokemonInfo({ pokemonName }) {
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState({})

  useEffect(() => {
    const abortController = new AbortController()

    fetchPokemon(pokemonName, abortController.signal).then((response) => {
      if (!abortController.signal.aborted)
        setSelectedPokemonDetails({
          name: response.name,
          image: response.image,
          number: response.number,
          attacks: response.attacks,
          fetchedAt: response.fetchedAt,
        })
    })

    return () => abortController.abort()
  }, [pokemonName])
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <div style={{ alignSelf: 'end' }}>
        <strong>
          <time>{selectedPokemonDetails.fetchedAt}</time>
        </strong>
      </div>
      <div style={{ marginTop: '20px' }}>
        <img
          src={selectedPokemonDetails.image}
          alt={selectedPokemonDetails.name}></img>
      </div>
      <p style={{ textTransform: 'uppercase', fontFamily: 'Georgia' }}>
        {selectedPokemonDetails.name}
      </p>
    </div>
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
