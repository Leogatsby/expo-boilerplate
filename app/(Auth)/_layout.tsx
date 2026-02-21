//1-0)시스템로직_라우팅
import { Stack } from "expo-router";
//1-1)퍼블리싱로직_기초엘리먼트 퍼블리싱
//1-2)퍼블리싱로직_콤포넌트UI
//2.데이터바인딩 로직

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
