import { useOtp } from '@/hooks/useOtp';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const OTP_LENGTH = 6;

export default function VerifyOtpScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    // Get email from params (passed from register screen)
    const email = params.email as string || '';

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer] = useState(0);
    const [canResend, setCanResend] = useState(false);
    const inputs = useRef<(TextInput | null)[]>([]);

    const {
        verifyOtp,
        verifyLoading,
        resendOtp,
        resendLoading
    } = useOtp({
        email,
        onSuccess: () => {
            // OTP verified successfully, clear OTP fields
            setOtp(Array(OTP_LENGTH).fill(''));
        },
    });

    // Initialize timer from registration response (600 seconds = 10 minutes)
    useEffect(() => {
        const initialTimer = 600; // 10 minutes in seconds
        setTimer(initialTimer);
        setCanResend(false);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [email]);

    // Start timer for resend
    const startResendTimer = () => {
        setTimer(120); // 2 minutes cooldown
        setCanResend(false);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    };

    const handleOtpChange = (value: string, index: number) => {
        // Allow only numeric input
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== '' && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }

        // Auto-submit if all fields are filled
        if (newOtp.every(digit => digit !== '') && index === OTP_LENGTH - 1) {
            handleVerify();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        Keyboard.dismiss();

        const otpString = otp.join('');

        if (otpString.length !== OTP_LENGTH) {
            Alert.alert('Error', 'Please enter the complete 6-digit OTP');
            return;
        }

        verifyOtp({
            email,
            otp: otpString,
        });
    };

    const handleResendOtp = () => {
        if (!canResend) return;

        Alert.alert(
            'Resend OTP',
            'A new OTP will be sent to your email.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Resend',
                    onPress: () => {
                        resendOtp({ email });
                        startResendTimer();
                    }
                }
            ]
        );
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isLoading = verifyLoading || resendLoading;

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                        disabled={isLoading}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Ionicons name="mail" size={64} color="#EF4444" />
                        <Text style={styles.title}>Verify Email</Text>
                        <Text style={styles.subtitle}>
                            Enter the 6-digit code sent to
                        </Text>
                        <Text style={styles.emailText}>{email}</Text>
                    </View>

                    {/* OTP Input Fields */}
                    <View style={styles.otpContainer}>
                        {Array(OTP_LENGTH)
                            .fill(0)
                            .map((_, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => { inputs.current[index] = ref; }}
                                    style={[
                                        styles.otpInput,
                                        otp[index] && styles.otpInputFilled,
                                        verifyLoading && styles.disabledInput,
                                    ]}
                                    value={otp[index]}
                                    onChangeText={(value) => handleOtpChange(value, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    editable={!isLoading}
                                    selectTextOnFocus={!isLoading}
                                    autoFocus={index === 0}
                                />
                            ))}
                    </View>

                    {/* Error message placeholder */}
                    <View style={styles.messageContainer}>
                        {verifyLoading && (
                            <Text style={styles.loadingText}>Verifying OTP...</Text>
                        )}
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity
                        style={[styles.verifyButton, isLoading && styles.buttonDisabled]}
                        onPress={handleVerify}
                        disabled={isLoading || otp.join('').length !== OTP_LENGTH}
                        activeOpacity={0.8}
                    >
                        {verifyLoading ? (
                            <ActivityIndicator color="#FFFFFF" size="small" />
                        ) : (
                            <Text style={styles.verifyButtonText}>Verify Email</Text>
                        )}
                    </TouchableOpacity>

                    {/* Resend OTP Section */}
                    <View style={styles.resendContainer}>
                        <Text style={styles.resendText}>
                            Didn't receive the code?{' '}
                            {canResend ? (
                                <Text
                                    style={[styles.resendLink, resendLoading && styles.disabledLink]}
                                    onPress={handleResendOtp}
                                >
                                    {resendLoading ? 'Sending...' : 'Resend OTP'}
                                </Text>
                            ) : (
                                <Text style={styles.timerText}>
                                    Resend in {formatTime(timer)}
                                </Text>
                            )}
                        </Text>
                    </View>

                    {/* Support Section */}
                    <View style={styles.supportContainer}>
                        <Text style={styles.supportText}>
                            The OTP is valid for 10 minutes.{'\n'}
                            Check your spam folder if you don't see the email.
                        </Text>

                        <TouchableOpacity
                            style={styles.supportButton}
                            onPress={() => Alert.alert('Support', 'Contact support@trexoexpress.com')}
                            disabled={isLoading}
                        >
                            <Text style={styles.supportButtonText}>Need help?</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            {/* Loading overlay */}
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#EF4444" />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#111827',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'ios' ? 20 : 40,
        paddingBottom: 40,
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 8,
        marginBottom: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#9CA3AF',
        textAlign: 'center',
    },
    emailText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffc0cb',
        marginTop: 4,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    otpInput: {
        width: 50,
        height: 60,
        backgroundColor: '#1F2937',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#374151',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    otpInputFilled: {
        borderColor: '#EF4444',
        backgroundColor: '#2D3748',
    },
    disabledInput: {
        opacity: 0.5,
    },
    messageContainer: {
        minHeight: 24,
        marginBottom: 24,
    },
    loadingText: {
        color: '#9CA3AF',
        textAlign: 'center',
        fontSize: 14,
    },
    verifyButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 32,
    },
    buttonDisabled: {
        backgroundColor: '#9CA3AF',
        opacity: 0.7,
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    resendText: {
        color: '#9CA3AF',
        fontSize: 14,
        textAlign: 'center',
    },
    resendLink: {
        color: '#ffc0cb',
        fontWeight: 'bold',
    },
    timerText: {
        color: '#EF4444',
        fontWeight: '600',
    },
    disabledLink: {
        opacity: 0.5,
    },
    supportContainer: {
        alignItems: 'center',
    },
    supportText: {
        color: '#6B7280',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 16,
    },
    supportButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    supportButtonText: {
        color: '#ffc0cb',
        fontSize: 14,
        fontWeight: '600',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});