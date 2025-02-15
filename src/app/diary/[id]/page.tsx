"use client";

import { useParams } from "next/navigation";
import DiaryChat, { Message } from "@/components/DiaryChat";

// この関数は実際のアプリケーションでは、APIやデータベースから日記データを取得する処理に置き換えてください
const getDiaryData = (id: number) => {
  const diaries = [
    {
      id: 1,
      date: "2023-05-01",
      messages: [
        { id: 1, content: "今日はどんな1日でしたか？", sender: "ai" },
        {
          id: 2,
          content:
            "今日は新しいプロジェクトが始まりました。チームの雰囲気も良く、とても充実した一日でした。",
          sender: "user",
        },
        {
          id: 3,
          content:
            "素晴らしいですね！新しいプロジェクトの詳細を教えていただけますか？",
          sender: "ai",
        },
        {
          id: 4,
          content:
            "AIを使った新しい製品開発です。技術的にも挑戦的で、とてもワクワクしています。",
          sender: "user",
        },
      ],
    },
    // 他の日記データ...
  ];
  return diaries.find((diary) => diary.id === id) || diaries[0];
}

export default function DiaryPage() {
  const params = useParams();
  const id = Number.parseInt(params.id as string);
  const diaryData = getDiaryData(id);

  return (
    <DiaryChat
      id={diaryData.id}
      date={diaryData.date}
      initialMessages={diaryData.messages as Message[]}
    />
  );
}
