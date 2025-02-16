"use client"

import { useState, useEffect } from "react"
import DiaryChat from "./DiaryChat"

type Message = {
  id: number
  content: string
  sender: "ai" | "user"
  timestamp: Date
}

export default function TodaysDiary() {
  const [messages, setMessages] = useState<Message[]>([])
  const [date, setDate] = useState("")

  useEffect(() => {
    const today = new Date()
    setDate(today.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" }))
    setMessages([{ id: 1, content: "今日はどんな1日でしたか？", sender: "ai", timestamp: new Date() }])
  }, [])

  return (
    messages.length > 0 ? <DiaryChat id={1} date={date} initialMessages={messages} /> : <div>Loading...</div>
  )
}

