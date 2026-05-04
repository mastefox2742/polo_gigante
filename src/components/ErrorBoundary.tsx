import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In a real app we would send this to Sentry/Datadog or our centralized logger
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFDF7] text-ink p-4">
          <div className="max-w-md text-center">
            <h1 className="font-serif text-3xl mb-4 text-bordeaux">Si è verificato un errore</h1>
            <p className="text-sm opacity-60 mb-8">Ci scusiamo per l'inconveniente, qualcosa è andato storto nel nostro sistema. Riprova più tardi.</p>
            <button
              className="px-6 py-2 bg-ink text-white font-bold text-xs uppercase tracking-widest hover:bg-bordeaux transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Torna alla Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
