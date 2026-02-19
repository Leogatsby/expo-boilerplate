import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface CustomButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function CustomButton({ children, onPress, style, textStyle }: CustomButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {typeof children === "string" ? (
                <Text style={[styles.buttonText, textStyle]}>{children}</Text>
            ) : (
                children
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
});
