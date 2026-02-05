import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8 font-sans">
          <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
          <p className="text-gray-400 text-sm mb-4 max-w-md">{this.state.error.message}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
