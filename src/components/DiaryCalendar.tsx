"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type DiaryEntry = {
  id: number
  date: string
  mood: "happy" | "neutral" | "sad"
}

const moodEmoji = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
}

export default function DiaryCalendar() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [entries] = useState<DiaryEntry[]>([
    { id: 1, date: "2023-05-01", mood: "happy" },
    { id: 2, date: "2023-05-02", mood: "happy" },
    { id: 3, date: "2023-05-03", mood: "neutral" },
    { id: 4, date: "2023-05-04", mood: "sad" },
    // Add more entries as needed
  ])

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const entry = entries.find((e) => new Date(e.date).toDateString() === selectedDate.toDateString())
      if (entry) {
        router.push(`/diary/${entry.id}`)
      }
    }
    setDate(selectedDate)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-center">日記カレンダー</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border"
          components={{
            DayContent: ({ date }) => {
              const entry = entries.find((e) => new Date(e.date).toDateString() === date.toDateString())
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {date.getDate()}
                  {entry && (
                    <Badge variant="secondary" className="absolute bottom-0 right-0">
                      {moodEmoji[entry.mood]}
                    </Badge>
                  )}
                </div>
              )
            },
          }}
        />
      </CardContent>
    </Card>
  )
}

