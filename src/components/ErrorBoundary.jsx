import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("UI error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: "24px", color: "#eee" }}>
          <h1 style={{ margin: 0 }}>Une erreur est survenue</h1>
          <p className="muted" style={{ marginTop: 8 }}>
            Merci d’actualiser la page. Si le problème persiste, contactez le support.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

