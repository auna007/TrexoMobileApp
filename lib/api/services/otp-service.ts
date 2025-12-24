import { apiClient } from '../api-client';

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResendOtpData {
  email: string;
}

export interface VerifyOtpResponse {
  message: string;
}

export interface ResendOtpResponse {
  message: string;
  otp_expires_in: number;
}

class OtpService {
  async verifyOtp(data: VerifyOtpData): Promise<VerifyOtpResponse> {
    return await apiClient.post<VerifyOtpResponse>('/auth/verify-otp', data);
  }

  async resendOtp(data: ResendOtpData): Promise<ResendOtpResponse> {
    return await apiClient.post<ResendOtpResponse>('/auth/resend-otp', data);
  }
}

export const otpService = new OtpService();