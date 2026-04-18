import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4 2xl:gap-6 bg-white dark:bg-neutral-950">
          <h1 className="text-4xl 2xl:text-6xl font-semibold text-neutral-900 dark:text-white">Something went wrong</h1>
          <p className="text-gray-600 dark:text-gray-400 2xl:text-xl">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = "/";
            }}
            className="px-6 2xl:px-10 py-2 2xl:py-3.5 bg-black text-white dark:bg-white dark:text-black rounded-md font-medium 2xl:text-lg hover:opacity-80 transition-opacity"
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
