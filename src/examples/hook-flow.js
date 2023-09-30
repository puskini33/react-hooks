// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

// PLEASE NOTE: there was a subtle change in the order of cleanup functions
// getting called in React 17:
// https://github.com/kentcdodds/react-hooks/issues/90

// Diagram is wrong: on Child Mount, the cleanup Effects of App are run first before running effects in child
import * as React from 'react'

function Child() {
  console.log('%c    Child: render start', 'color: MediumSpringGreen')

  const [count, setCount] = React.useState(() => {
    console.log(
      '%c  lazy initialization -  Child: useState(() => 0)',
      'color: tomato'
    )
    return 0
  })

  React.useEffect(() => {
    console.log('%c   1. Child: useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log(
        '%c  1.  Child: useEffect(() => {}) cleanup 🧹',
        'color: LightCoral'
      )
    }
  })

  React.useEffect(() => {
    console.log(
      '%c  2.  Child: useEffect(() => {}, [])',
      'color: MediumTurquoise'
    )
    return () => {
      console.log(
        '%c  2. Child: useEffect(() => {}, []) cleanup 🧹',
        'color: MediumTurquoise'
      )
    }
  }, [])

  React.useEffect(() => {
    console.log('%c  3.  Child: useEffect(() => {}, [count])', 'color: HotPink')
    return () => {
      console.log(
        '%c  3.  Child: useEffect(() => {}, [count]) cleanup 🧹',
        'color: HotPink'
      )
    }
  }, [count])

  const element = (
    <button onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  )

  console.log('%c    Child: render end', 'color: MediumSpringGreen')

  return element
}

function App() {
  console.log('%cApp: render start', 'color: MediumSpringGreen')

  const [showChild, setShowChild] = React.useState(() => {
    console.log(
      '%cApp: run lazy initialization -> useState(() => false)',
      'color: tomato'
    )
    return false
  })

  React.useEffect(() => {
    console.log('%cApp: 1. useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log(
        '%cApp: 1. useEffect(() => {}) cleanup 🧹',
        'color: LightCoral'
      )
    }
  })

  React.useEffect(() => {
    console.log('%cApp: 2. useEffect(() => {}, [])', 'color: MediumTurquoise')
    return () => {
      console.log(
        '%cApp: 2. useEffect(() => {}, []) cleanup 🧹',
        'color: MediumTurquoise'
      )
    }
  }, [])

  React.useEffect(() => {
    console.log('%cApp: 3. useEffect(() => {}, [showChild])', 'color: HotPink')
    return () => {
      console.log(
        '%cApp: 3. useEffect(() => {}, [showChild]) cleanup 🧹',
        'color: HotPink'
      )
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={(e) => setShowChild(e.target.checked)}
        />{' '}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: 'solid',
        }}>
        {showChild ? <Child /> : null}
      </div>
    </>
  )

  console.log('%cApp: render end', 'color: MediumSpringGreen')

  return element
}

export default App
