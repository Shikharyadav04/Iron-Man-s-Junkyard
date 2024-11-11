import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // Log the error or send it to a logging service
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>; // Customize this UI as needed
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
