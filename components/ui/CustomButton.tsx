//1-0)시스템로직_라우팅
import React from "react";
//1-1)퍼블리싱로직_기초엘리먼트 퍼블리싱
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
//1-2)퍼블리싱로직_콤포넌트UI
//2.데이터바인딩 로직

interface CustomButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    loading?: boolean;
    disabled?: boolean;
}

export default function CustomButton({ children, onPress, style, textStyle, loading, disabled }: CustomButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, style, (disabled || loading) && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                typeof children === "string" ? (
                    <Text style={[styles.buttonText, textStyle]}>{children}</Text>
                ) : (
                    children
                )
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    disabled: {
        backgroundColor: "#ccc",
    }
});
