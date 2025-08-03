"use client"

import { Button } from "@/components/ui/button";
import React, {ReactNode} from "react";

interface ErrorBoundaryState {
    hasError: boolean;
}

interface ErrorBoundaryProps {
    children:ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='fixed inset-0 h-screen w-screen -z-10 w-100 font-montserrat'>
                    <div className='p-6 text-black text-center rounded-xl shadow-wwlDefault h-full flex justify-center items-center flex-col'>
                        <div className='text-4xl font-bold pb-3'>Something went wrong!</div>
                        <p className='p-3 pb-6'>
                            Oops! There was an error.<br />
                            Our team has been notified, and we are working on a resolution for you!
                        </p>
                        <Button
                            onClick={() => {
                                this.setState({ hasError: false });
                                window.location.href = '/';
                            }}
                        >Back to home</Button>
                    </div>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;