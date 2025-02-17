import { SplashScreen, Tabs } from "expo-router";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Home, PenTool } from "@tamagui/lucide-icons";

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }
  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="today/index"
          options={{
            title: "今日の日記",
            tabBarIcon: ({ color }) => <PenTool size={24} color={color} />,
          }}
        />
      </Tabs>
    </TamaguiProvider>
  );
}