import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: undefined }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.

    return { hasError: true, error: error }
  }

  componentDidUpdate(prevProps) {
    // Reset the error state if pokemonName prop changes.
    if (this.props.pokemonName !== prevProps.pokemonName) {
      this.setState({ hasError: false, error: undefined })
    }
  }

  render() {
    if (this.state.hasError) {
      return <this.props.FallbackMessage error={this.state.error} />
    }

    return this.props.children
  }
}
