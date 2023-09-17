// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'
import {useEffect} from "react";

function Tilt({children}) {

  const tiltRootRef = React.useRef()

  useEffect(() => {
      const tiltNode = tiltRootRef.current

      VanillaTilt.init(tiltNode, {
          max: 25,
       speed: 400,
       glare: true,
       'max-glare': 0.5,
     })
     return () => tiltNode.vanillaTilt.destroy()
  }, [])



  // 💰 Don't forget to specify your effect's dependencies array! In our case
  // we know that the tilt node will never change, so make it `[]`. Ask me about
  // this for a more in depth explanation.

  return (
    <div ref={tiltRootRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
