"use client"

import { useState, useEffect } from "react"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import DiaryChat from "./DiaryChat"
import { getDiaryByDate, createDiary, createDiaryMessage } from "@/lib/diary"

type Message = {
  id: number
  content: string
  sender: "ai" | "user"
  timestamp: Date
}

export default function TodaysDiary() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [messages, setMessages] = useState<Message[]>([])
  const [date, setDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [diaryId, setDiaryId] = useState<string | null>(null)

  useEffect(() => {
    const loadTodaysDiary = async () => {
      console.log("session", session)
      if (!session?.user) return

      const today = new Date()
      setDate(today.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
      }))

      try {
        // 今日の日記を取得
        let diary = await getDiaryByDate(session.user.id, today)
        
        // 日記が存在しない場合は新規作成
        if (!diary) {
          diary = await createDiary(session.user.id, today)
          // AIの最初のメッセージを作成
          await createDiaryMessage(
            diary.id,
            session.user.id,
            "今日はどんな1日でしたか？",
            "ai"
          )
        }

        setDiaryId(diary.id)
        
        // メッセージを整形
        const formattedMessages: Message[] = [
          ...(diary.DiaryRoom?.DiaryRoomAiMessage || []).map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            sender: "ai" as const,
            timestamp: new Date(msg.created_at)
          })),
          ...(diary.DiaryRoom?.DiaryRoomUserMessage || []).map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            sender: "user" as const,
            timestamp: new Date(msg.created_at)
          }))
        ].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

        setMessages(formattedMessages)
      } catch (error) {
        console.error('Error loading diary:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTodaysDiary()
  }, [session])

  if (isLoading) return <div>Loading...</div>

  return (
    <DiaryChat
      id={diaryId!}
      date={date}
      initialMessages={messages}
    />
  )
}

