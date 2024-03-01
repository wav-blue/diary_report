import React from "react";
import ClientErrorPage from "../components/pages/errors/ClientErrorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    console.log("error boundary constructor: ", props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log("error boundary: ", error);
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
