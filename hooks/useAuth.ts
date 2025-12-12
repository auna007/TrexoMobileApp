import { ApiError } from '@/lib/api/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { authService } from '../lib/api/services/auth-service';
import { authStore } from '../lib/store/auth-store';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Update auth store
      authStore.getState().setToken(data.token);
      authStore.getState().setUser(data.user);
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      router.push('/(tabs)');
    },
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        Alert.alert('Login Failed', error.getDisplayMessage());
      } else {
        Alert.alert('Login Failed', error.message);
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data, variables) => {
      Alert.alert('Registration Successful!', data.message, [
        { text: 'Verify Now', onPress: () => router.push({
          pathname: '/verify-otp',
          params: { email: variables.email.toLowerCase() }
        }) },
      ]);
    },
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        // Show backend validation errors nicely
        const displayMessage = error.getDisplayMessage();
        
        // For validation errors
        if (error.statusCode === 422) {
          Alert.alert(
            'Please fix the following issues:',
            displayMessage
          );
        } else {
          Alert.alert('Registration Failed', displayMessage);
        }
      } else {
        Alert.alert('Registration Failed', error.message);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      authStore.getState().logout();
      queryClient.clear();
      router.push('/login');
    },
  });

  return {
    login: loginMutation.mutate,
    loginLoading: loginMutation.isPending,
    register: registerMutation.mutate,
    registerLoading: registerMutation.isPending,
    logout: logoutMutation.mutate,
    isAuthenticated: authStore.getState().isAuthenticated,
    user: authStore.getState().user,
  };
};