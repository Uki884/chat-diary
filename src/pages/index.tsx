import DiaryHistory, { DiaryEntry } from "@/components/DiaryHistory"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { YStack } from "tamagui"

export default function Home() {
  const router = useRouter();

  const handleDiaryPress = (id: number) => {
    router.push(`/diary/${id}`);
  }

  const handleNewDiary = () => {
    router.push(`/diary/newaaa`);
  }

  const [entries] = useState<DiaryEntry[]>([
    {
      id: 1,
      date: "2023-05-01",
      summary:
        "今日は充実した一日だった。新しいプロジェクトが始まり、チームの雰囲気も良かった。",
      mood: "happy",
      conversation: [],
    },
    {
      id: 2,
      date: "2023-05-02",
      summary: "家族と過ごすリラックスした日。久しぶりに家族全員で映画を見た。",
      mood: "happy",
      conversation: [],
    },
    {
      id: 3,
      date: "2023-05-03",
      summary:
        "仕事で少し困難があったが、なんとか乗り越えられた。明日はもっと良い日になることを願う。",
      mood: "neutral",
      conversation: [],
    },
    {
      id: 4,
      date: "2023-05-04",
      summary: "体調を崩してしまい、一日中寝ていた。早く良くなりたい。",
      mood: "sad",
      conversation: [],
    },
  ]);

  return (
    <YStack
      padding="$4"
      height="calc(100vh - 80px)"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <DiaryHistory
        onNewDiary={handleNewDiary}
        onDiaryPress={handleDiaryPress}
        entries={entries}
      />
    </YStack>
  );
};
