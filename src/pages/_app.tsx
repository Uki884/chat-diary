import { TamaguiProvider, YStack } from "tamagui";
import config from "../../tamagui.config";
import type { AppProps } from "next/app";
import { FooterNav } from "@/components/FooterNav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TamaguiProvider config={config}>
      <YStack flex={1} backgroundColor="$background" height={'100vh'}>
        <Component {...pageProps} />
        <FooterNav />
      </YStack>
    </TamaguiProvider>
  );
}
