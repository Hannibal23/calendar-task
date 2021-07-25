import React, { Component } from 'react';

const withErrorBoundary = WrappedComponent => (
    class extends Component {
      constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
      }
  
      componentDidCatch = (error, errorInfo) => catchFunc(error, errorInfo, this)

      render() {
        if (this.state.errorInfo) {
          return handleError(this)
        }
        return <WrappedComponent {...this.props} />;
      }
    }
  );
  
  const catchFunc = (error, errorInfo, ctx) => {
    ctx.setState({
      error: error,
      errorInfo: errorInfo
    })
    console.error(errorInfo)
}
  
  const handleError = (ctx) => (
    <div className="error" >
      <h2>Whoops! Something went wrong.</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {ctx.state.error && ctx.state.error.toString()}
        <br />
        {ctx.state.errorInfo.componentStack}
      </details>
    </div>
  );

  export default withErrorBoundary;