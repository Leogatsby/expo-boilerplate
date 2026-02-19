import { useAuthStore } from "@/store/useAuthStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  const { isLoggedIn, hasOnbordingDone } = useAuthStore();

  console.log("isLoggedIn : ", isLoggedIn, "hasOnbordingDone :", hasOnbordingDone);

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

