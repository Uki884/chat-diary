"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, BookOpenIcon } from "lucide-react"

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
  ])

  return (
    <Card className="w-full max-w-4xl h-[80vh] flex flex-col bg-[#fffaf0] dark:bg-gray-800 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-center">日記一覧</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {entries.map((entry) => (
              <Dialog key={entry.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{entry.summary}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      <span>
                        <CalendarIcon className="w-5 h-5 inline-block mr-2" />
                        {new Date(entry.date).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          weekday: "long",
                        })}
                      </span>
                      <span className="text-2xl">{moodEmoji[entry.mood]}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <BookOpenIcon className="w-5 h-5 mr-2" />
                      要約
                    </h3>
                    <p>{entry.summary}</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">詳細な記録</h3>
                    {entry.conversation.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                      >
                        <div
                          className={`py-2 px-3 rounded-lg ${message.sender === "user" ? "bg-blue-100 dark:bg-blue-700" : "bg-gray-100 dark:bg-gray-600"}`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

