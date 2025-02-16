"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"

type DiaryEntry = {
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

export default function DiaryHistory() {
  const router = useRouter();
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: 1,
      date: "2023-05-01",
      summary: "今日は充実した一日だった。新しいプロジェクトが始まり、チームの雰囲気も良かった。",
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
      summary: "仕事で少し困難があったが、なんとか乗り越えられた。明日はもっと良い日になることを願う。",
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

  const handleCardClick = (id: number) => {
    router.push(`/diary/${id}`);
  };

  return (
    <Card className="w-full max-w-4xl flex flex-col dark:bg-gray-800 mx-auto">
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-700"
                onClick={() => router.push(`/today`)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <CalendarIcon className="w-4 h-4 inline-block mr-2" />
                    {new Date().toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3 flex items-center justify-center">
                    <PlusIcon className="w-10 h-10" />
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
          </Dialog>
          {entries.map((entry) => (
            <Dialog key={entry.id}>
              <DialogTrigger asChild>
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-700"
                  onClick={() => handleCardClick(entry.id)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                    <CardTitle className="text-sm font-medium">
                      <CalendarIcon className="w-4 h-4 inline-block mr-2" />
                      {new Date(entry.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })}
                    </CardTitle>
                    <div className="text-2xl">{moodEmoji[entry.mood]}</div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {entry.summary}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
            </Dialog>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}

