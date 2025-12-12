import { ApiError } from '@/lib/api/api-client';
import { otpService } from '@/lib/api/services/otp-service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

interface UseOtpOptions {
  email: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useOtp = (options: UseOtpOptions) => {
  const router = useRouter();

  const verifyMutation = useMutation({
    mutationFn: otpService.verifyOtp,
    onSuccess: (data) => {
      Alert.alert('Success', data.message, [
        { 
          text: 'Login', 
          onPress: () => router.push('/login')
        }
      ]);
      options.onSuccess?.();
    },
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        if (error.statusCode === 429) {
          Alert.alert('Too Many Attempts', error.getDisplayMessage());
        } else {
          Alert.alert('Verification Failed', error.getDisplayMessage());
        }
      } else {
        Alert.alert('Verification Failed', error.message);
      }
      options.onError?.(error);
    },
  });

  const resendMutation = useMutation({
    mutationFn: otpService.resendOtp,
    onSuccess: (data) => {
      Alert.alert('Success', data.message);
    },
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        if (error.statusCode === 429) {
          Alert.alert('Too Many Requests', error.getDisplayMessage());
        } else if (error.statusCode === 400) {
          Alert.alert('Error', 'Email already verified or not found');
        } else {
          Alert.alert('Resend Failed', error.getDisplayMessage());
        }
      } else {
        Alert.alert('Resend Failed', error.message);
      }
    },
  });

  return {
    verifyOtp: verifyMutation.mutate,
    verifyLoading: verifyMutation.isPending,
    verifyError: verifyMutation.error,
    
    resendOtp: resendMutation.mutate,
    resendLoading: resendMutation.isPending,
    resendError: resendMutation.error,
  };
};