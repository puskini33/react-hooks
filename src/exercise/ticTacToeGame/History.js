export function History({ history, step, setStep }) {
  function handleClick(index) {
    setStep(index)
  }

  return (
    <div>
      <ol>
        {history.map((move, index) => {
          const isCurrentStep = index === step
          const isFirstStep = index === 0

          return (
            <li key={index}>
              <button
                disabled={isCurrentStep}
                onClick={() => handleClick(index)}>
                {isFirstStep ? 'Go to game start' : `Go to move #${index}`}{' '}
                {isCurrentStep && '(current)'}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
