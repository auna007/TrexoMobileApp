import { useRouter } from 'expo-router';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import * as Sentry from '@sentry/react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: any[];
  boundaryName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class EnhancedErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  constructor(props: Props) {
    super(props);
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log to error tracking service (Sentry)
    // if (!__DEV__) {
    //   Sentry.captureException(error, {
    //     extra: {
    //       componentStack: errorInfo.componentStack,
    //       boundaryName: this.props.boundaryName || 'Unknown',
    //     },
    //   });
    // }

    // Custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public componentDidUpdate(prevProps: Props) {
    const { resetKeys } = this.props;
    
    if (
      resetKeys &&
      prevProps.resetKeys &&
      JSON.stringify(prevProps.resetKeys) !== JSON.stringify(resetKeys)
    ) {
      this.resetErrorBoundary();
    }
  }

  public resetErrorBoundary() {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  }

  private getDefaultFallback() {
    const { error } = this.state;
    const router = useRouter();

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>⚠️ Something went wrong</Text>
          <Text style={styles.message}>
            {error?.message || 'An unexpected error occurred'}
          </Text>
          
          {__DEV__ && error && (
            <View style={styles.devInfo}>
              <Text style={styles.devInfoTitle}>Development Info:</Text>
              <Text style={styles.devInfoText}>{error.stack}</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={this.resetErrorBoundary}
            >
              <Text style={styles.buttonText}>Try again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {
                router.replace('/home');
              }}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Go to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || this.getDefaultFallback();
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  devInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
    maxHeight: 200,
  },
  devInfoTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  devInfoText: {
    fontSize: 12,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});

export default EnhancedErrorBoundary;