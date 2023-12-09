import React, { Component } from "react";
import { View, Text } from "react-native";

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // console.error("component caught error", error, errorInfo);
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
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
