//1-0)시스템로직_라우팅
//1-1)퍼블리싱로직_기초엘리먼트 퍼블리싱
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
//1-2)퍼블리싱로직_콤포넌트UI
//2.데이터바인딩 로직

interface SafeAreaContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export default function SafeAreaContainer({ children, style }: SafeAreaContainerProps) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{ flex: 1 }, style]}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
