import { Card, XStack, YStack, Text, ScrollView } from "tamagui"
import { Plus, Calendar } from "@tamagui/lucide-icons";

export type DiaryEntry = {
  id: number
  date: string
  summary: string
  mood: "happy" | "neutral" | "sad"
  conversation: { sender: "ai" | "user"; content: string }[]
}

const moodEmoji = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
}

type Props = {
  onNewDiary: () => void
  onDiaryPress: (id: number) => void
  entries: DiaryEntry[]
}

export default function DiaryHistory({ onNewDiary, onDiaryPress, entries }: Props) {
  return (
    <Card
      size="$4"
      width="100%"
      maxWidth={800}
      // backgroundColor="$background"
    >
      <ScrollView height="100%">
        <YStack gap="$4">
          <Card
            pressStyle={{ scale: 0.98 }}
            onPress={onNewDiary}
            backgroundColor="$color1"
          >
            <YStack padding="$4" gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize={16}>
                  <Calendar size={16} style={{ marginRight: 8 }} />
                  {new Date().toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </Text>
              </XStack>
              <XStack
                justifyContent="center"
                alignItems="center"
                paddingVertical="$2"
              >
                <Plus size={40} />
              </XStack>
            </YStack>
          </Card>

          {entries.map((entry) => (
            <Card
              key={entry.id}
              pressStyle={{ scale: 0.98 }}
              onPress={() => onDiaryPress(entry.id)}
              backgroundColor="$color1"
            >
              <YStack padding="$4" gap="$2">
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={16}>
                    <Calendar size={16} style={{ marginRight: 8 }} />
                    {new Date(entry.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </Text>
                  <Text fontSize={24}>{moodEmoji[entry.mood]}</Text>
                </XStack>
                <Text fontSize={16} color="$gray11" numberOfLines={3}>
                  {entry.summary}
                </Text>
              </YStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </Card>
  );
}

