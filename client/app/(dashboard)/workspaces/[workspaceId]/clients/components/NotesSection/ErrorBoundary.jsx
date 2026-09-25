"use client";

import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("AI section rendering failed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="mt-8 rounded-2xl border border-red-100 bg-white">
          <div className="border-b border-red-100 px-6 py-5">
            <h2 className="text-base font-semibold text-gray-900">
              AI Assistant
            </h2>
          </div>

          <div className="px-6 py-6">
            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                Something went wrong.
              </p>

              <p className="mt-1 text-sm text-red-600">Please try again.</p>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
