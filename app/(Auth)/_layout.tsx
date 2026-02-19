import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" />
            <Stack.Screen name="Register" />
            <Stack.Screen
                name="Privacy"
                options={{
                    headerShown: true,
                    title: "개인정보처리방침"
                }}
            />
            <Stack.Screen
                name="Term"
                options={{
                    headerShown: true,
                    title: "이용약관"
                }}
            />
        </Stack>
    );
}
