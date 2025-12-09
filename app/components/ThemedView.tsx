import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ThemedViewProps = {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    backgroundColor?: string;
};

const ThemedView: React.FC<ThemedViewProps> = ({ children, style, backgroundColor }) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                {
                    flex: 1,
                    backgroundColor: backgroundColor || '#000',
                    paddingTop: insets.top,
                    // paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

export default ThemedView;