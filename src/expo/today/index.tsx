
import DiaryChat, { Message } from "@/components/DiaryChat";
import { View, YStack } from 'tamagui';

const getDiaryData = (id: number) => {
  const diaries = [
    {
      id: 1,
      date: "2023-05-01",
      messages: [
        {
          id: 1,
          content: "今日はどんな1日でしたか？",
          sender: "ai",
          timestamp: new Date(),
        },
        {
          id: 2,
          content:
            "今日は新しいプロジェクトが始まりました。チームの雰囲気も良く、とても充実した一日でした。",
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: 3,
          content:
            "素晴らしいですね！新しいプロジェクトの詳細を教えていただけますか？",
          sender: "ai",
          timestamp: new Date(),
        },
        {
          id: 4,
          content:
            "AIを使った新しい製品開発です。技術的にも挑戦的で、とてもワクワクしています。",
          sender: "user",
          timestamp: new Date(),
        },
      ],
    },
    // 他の日記データ...
  ];
  return diaries.find((diary) => diary.id === id) || diaries[0];
};

export default function Page() {
  const id = Number.parseInt("1");
  const diaryData = getDiaryData(id);

  return (
    <YStack
      height="100vh"
    >
      <DiaryChat
        id={1}
        date=""
        initialMessages={diaryData.messages as Message[]}
      />
    </YStack>
  );
}