import EnhancedErrorBoundary from '@/app/components/EnhancedErrorBoundary';
import React, { createContext, ReactNode, useContext } from 'react';

interface ErrorBoundaryContextType {
  triggerError: (error: Error) => void;
}

const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | undefined>(undefined);

export const useErrorBoundary = () => {
  const context = useContext(ErrorBoundaryContext);
  if (!context) {
    throw new Error('useErrorBoundary must be used within ErrorBoundaryProvider');
  }
  return context;
};

interface ErrorBoundaryProviderProps {
  children: ReactNode;
  onError?: (error: Error) => void;
}

export const ErrorBoundaryProvider: React.FC<ErrorBoundaryProviderProps> = ({ 
  children, 
  onError 
}) => {
  const handleError = (error: Error, errorInfo?: any) => {
    console.error('Global error caught:', error);
    
    if (onError) {
      onError(error);
    }
    
    // You can log to analytics here
    // analytics.logError(error);
  };

  const triggerError = (error: Error) => {
    handleError(error);
  };

  return (
    <ErrorBoundaryContext.Provider value={{ triggerError }}>
      <EnhancedErrorBoundary 
        onError={handleError}
        boundaryName="GlobalErrorBoundary"
      >
        {children}
      </EnhancedErrorBoundary>
    </ErrorBoundaryContext.Provider>
  );
};

// Usage in components
// const Component = () => {
//   const { triggerError } = useErrorBoundary();
//   
//   const handleApiError = (error) => {
//     triggerError(error);
//   };
// };