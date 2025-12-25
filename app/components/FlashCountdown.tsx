import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FlashCountdownProps {
  endTime?: string | null;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  showLabels?: boolean;
  showDays?: boolean;
}

export const FlashCountdown: React.FC<FlashCountdownProps> = ({ 
  endTime, 
  size = 'medium',
  showIcon = true,
  showLabels = true,
  showDays = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    if (!endTime) {
      // Use default 24-hour countdown if no end time
      const defaultEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      startCountdown(defaultEndTime);
      return;
    }

    startCountdown(endTime);
  }, [endTime]);

  const startCountdown = (endTimeString: string) => {
    const calculateTimeLeft = () => {
      const endTime = new Date(endTimeString);
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          iconSize: 12,
          textSize: styles.smallText,
          numberSize: styles.smallNumber,
          unitSize: styles.smallUnit,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          iconSize: 20,
          textSize: styles.largeText,
          numberSize: styles.largeNumber,
          unitSize: styles.largeUnit,
        };
      default:
        return {
          container: styles.mediumContainer,
          iconSize: 16,
          textSize: styles.mediumText,
          numberSize: styles.mediumNumber,
          unitSize: styles.mediumUnit,
        };
    }
  };

  const formatTimeUnit = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  const sizeStyles = getSizeStyles();

  if (timeLeft.isExpired) {
    return (
      <View style={[styles.container, sizeStyles.container, styles.expiredContainer]}>
        {showIcon && <Ionicons name="flash-off" size={sizeStyles.iconSize} color="#6B7280" />}
        <Text style={[styles.expiredText, sizeStyles.textSize]}>Expired</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, sizeStyles.container]}>
      {showIcon && <Ionicons name="flash" size={sizeStyles.iconSize} color="#D91339" />}
      <View style={styles.timeContainer}>
        {showDays && timeLeft.days > 0 && (
          <>
            <View style={styles.timeUnit}>
              <Text style={[styles.timeNumber, sizeStyles.numberSize]}>
                {formatTimeUnit(timeLeft.days)}
              </Text>
              {showLabels && <Text style={[styles.timeLabel, sizeStyles.unitSize]}>D</Text>}
            </View>
            <Text style={[styles.colon, sizeStyles.numberSize]}>:</Text>
          </>
        )}
        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, sizeStyles.numberSize]}>
            {formatTimeUnit(timeLeft.hours)}
          </Text>
          {showLabels && <Text style={[styles.timeLabel, sizeStyles.unitSize]}>H</Text>}
        </View>
        <Text style={[styles.colon, sizeStyles.numberSize]}>:</Text>
        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, sizeStyles.numberSize]}>
            {formatTimeUnit(timeLeft.minutes)}
          </Text>
          {showLabels && <Text style={[styles.timeLabel, sizeStyles.unitSize]}>M</Text>}
        </View>
        <Text style={[styles.colon, sizeStyles.numberSize]}>:</Text>
        <View style={styles.timeUnit}>
          <Text style={[styles.timeNumber, sizeStyles.numberSize]}>
            {formatTimeUnit(timeLeft.seconds)}
          </Text>
          {showLabels && <Text style={[styles.timeLabel, sizeStyles.unitSize]}>S</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8EB',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  expiredContainer: {
    backgroundColor: '#F3F4F6',
  },
  smallContainer: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  mediumContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  largeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  timeUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 20,
  },
  timeNumber: {
    fontWeight: 'bold',
    color: '#D91339',
  },
  smallNumber: {
    fontSize: 10,
  },
  mediumNumber: {
    fontSize: 12,
  },
  largeNumber: {
    fontSize: 14,
  },
  timeLabel: {
    color: '#D91339',
    marginTop: 1,
  },
  smallUnit: {
    fontSize: 8,
  },
  mediumUnit: {
    fontSize: 9,
  },
  largeUnit: {
    fontSize: 10,
  },
  smallText: {
    fontSize: 9,
  },
  mediumText: {
    fontSize: 11,
  },
  largeText: {
    fontSize: 13,
  },
  colon: {
    fontWeight: 'bold',
    color: '#D91339',
    marginHorizontal: 1,
  },
  expiredText: {
    color: '#6B7280',
    fontWeight: '600',
    marginLeft: 4,
  },
});