import { Component, type ReactNode } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        console.error("[ErrorBoundary]", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <div className="flex h-screen flex-col items-center justify-center gap-5 bg-background px-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle size={28} className="text-red-400" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="font-display font-bold text-2xl text-foreground">
                            Something went wrong
                        </h2>
                        {this.state.errorMessage && (
                            <p className="text-sm text-muted-foreground font-mono max-w-md">
                                {this.state.errorMessage}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
                    >
                        <RefreshCw size={15} />
                        Reload page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
