"use client"

import { Button } from "@/components/client/ux/button";
import React, { ReactNode } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

interface ErrorBoundaryState {
    hasError: boolean;
}

interface ErrorBoundaryProps extends WithTranslation {
    children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        console.error(error);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(error, errorInfo);
    }

    render() {
        const { t } = this.props;

        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 h-screen -z-10 w-full font-montserrat">
                    <div className="p-6 text-black text-center rounded-xl h-full flex justify-center items-center flex-col">
                        <div className="text-4xl font-bold pb-3">
                            {t("errorBoundary.title")}
                        </div>
                        <p className="p-3 pb-6">
                            {t("errorBoundary.description")}
                        </p>
                        <Button
                            onClick={() => {
                                this.setState({ hasError: false });
                                window.location.href = "/";
                            }}
                        >
                            {t("errorBoundary.backToHome")}
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default withTranslation()(ErrorBoundary);
