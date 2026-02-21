//1-0)시스템로직_라우팅/훅
import { Stack } from "expo-router";
import { useEffect } from "react";

//1-1)퍼블리싱로직_기초엘리먼트 퍼블리싱
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
//2.데이터바인딩 로직
import { useAuthStore } from "@/store/useAuthStore";

export default function RootLayout() {

  const { isLoggedIn, hasOnbordingDone } = useAuthStore((AuthStore) => AuthStore.State);
  const { initializeAuth } = useAuthStore((AuthStore) => AuthStore.Actions);

  useEffect(() => {
    // 앱이 시작될 때 Supabase 세션 리스너를 실행하여 자동 로그인/로그아웃 처리를 담당합니다.
    initializeAuth();
    console.log("앱이 시작될때 Supabase 세션 리스너를 실행하여 자동 로그인/로그아웃 처리를 담당합니다.")
    console.log("isLoggedIn : ", isLoggedIn, "hasOnbordingDone :", hasOnbordingDone);

  }, []);


  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(Auth)" />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Protected guard={!hasOnbordingDone}>
            <Stack.Screen name="onbording" />
          </Stack.Protected>
          <Stack.Protected guard={hasOnbordingDone}>
            <Stack.Screen name="(Tabs)" />
          </Stack.Protected>
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}

