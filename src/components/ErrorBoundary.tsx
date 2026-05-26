import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  RefreshCw,
} from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleCopy = async () => {
    if (!this.state.error) return;
    const textToCopy = `Error: ${this.state.error.message}\n\nStack:\n${this.state.error.stack || ""}\n\nComponent Stack:\n${this.state.errorInfo?.componentStack || ""}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch (err) {
      console.error("Failed to copy error details:", err);
    }
  };

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev }));
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 md:p-12 transition-colors duration-300 font-sans">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-fadeIn">
            {/* Red accent strip */}
            <div className="h-2 bg-[#DB4444]" />

            <div className="p-8 md:p-12 flex flex-col items-center text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center text-[#DB4444] mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white m-0">
                Something went wrong
              </h1>

              <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                An unexpected error occurred during rendering. We have logged
                the diagnostics and you can reload to try again.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
                <button
                  onClick={this.handleReload}
                  className="flex items-center gap-2 px-6 py-3 bg-[#DB4444] hover:bg-[#c33b3b] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/25 active:scale-98 transition-all duration-300 border-none cursor-pointer text-sm"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-hover" />
                  Reload Page
                </button>

                <button
                  onClick={this.handleCopy}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl active:scale-98 transition-all duration-300 border-none cursor-pointer text-sm"
                >
                  {this.state.copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Copied Details
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Diagnostics
                    </>
                  )}
                </button>
              </div>

              {/* Toggleable Developer Diagnostics */}
              {this.state.error && (
                <div className="mt-8 w-full border-t border-gray-100 dark:border-gray-800 pt-6 text-left">
                  <button
                    onClick={this.toggleDetails}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors border-none bg-transparent cursor-pointer p-0 select-none"
                  >
                    {this.state.showDetails ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    {this.state.showDetails
                      ? "HIDE DIAGNOSTIC DETAILS"
                      : "SHOW DIAGNOSTIC DETAILS"}
                  </button>

                  {this.state.showDetails && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-950 rounded-xl overflow-x-auto text-[11px] font-mono text-red-600 dark:text-red-400 border border-gray-100 dark:border-gray-800/50 max-h-60 overflow-y-auto leading-normal">
                      <div className="font-bold mb-2">
                        Error: {this.state.error.message}
                      </div>
                      <pre className="m-0 whitespace-pre-wrap">
                        {this.state.error.stack}
                      </pre>
                      {this.state.errorInfo && (
                        <>
                          <div className="font-bold mt-4 mb-2">
                            Component Stack:
                          </div>
                          <pre className="m-0 whitespace-pre-wrap">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fadeIn {
                animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
              .active\\:scale-98:active {
                transform: scale(0.98);
              }
            `}
          </style>
        </div>
      );
    }

    return this.props.children;
  }
}
