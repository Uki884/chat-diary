// import Link from "next/link"
import { XStack, YStack, Text } from "tamagui"
import { Home, Calendar, PenTool, Settings } from "@tamagui/lucide-icons";

export const FooterNav = () => {
  return (
    <YStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="$background"
      borderTopWidth={1}
      borderColor="$borderColor"
    >
      <XStack justifyContent="space-around" alignItems="center" padding="$2">
        {/* <Link href="/" passHref> */}
          <YStack alignItems="center" padding="$2">
            <Home size={24} />
            <Text fontSize={10} marginTop="$1">
              ホーム
            </Text>
          </YStack>
        {/* </Link> */}
        <YStack alignItems="center" opacity={0.5}>
          <Calendar size={24} />
          <Text fontSize={10} marginTop="$1">
            カレンダー
          </Text>
        </YStack>
        {/* <Link href="/today" passHref> */}
          <YStack alignItems="center" padding="$2">
            <PenTool size={24} />
            <Text fontSize={10} marginTop="$1">
              今日の日記
            </Text>
          </YStack>
        {/* </Link> */}
        {/* <Link href="/settings" passHref> */}
          <YStack alignItems="center" padding="$2">
            <Settings size={24} />
            <Text fontSize={10} marginTop="$1">
              設定
            </Text>
          </YStack>
        {/* </Link> */}
      </XStack>
    </YStack>
  );
}

