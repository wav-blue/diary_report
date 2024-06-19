import React from "react";
import ClientErrorPage from "../pages/errors/ClientErrorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ClientErrorPage />;
    }

    return this.props.children;
  }
}
export { ErrorBoundary };
