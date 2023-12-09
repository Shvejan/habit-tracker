import React, { Component } from "react";
import { View, Text } from "react-native";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error: error, errorInfo: errorInfo });
    // You can also log the error to an error reporting service
    console.error("component caught error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize the fallback UI here
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <Text>Something went wrong!</Text>
          <Text>{JSON.stringify(this.state.error)}</Text>
          <Text>--------------</Text>
          <Text>{JSON.stringify(this.state.errorInfo)}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
