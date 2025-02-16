import { supabase } from './supabase'
import { Database } from '@/types/supabase'

type Diary = Database['public']['Tables']['Diary']['Row']
type DiaryRoom = Database['public']['Tables']['DiaryRoom']['Row']
type DiaryRoomUserMessage = Database['public']['Tables']['DiaryRoomUserMessage']['Row']
type DiaryRoomAiMessage = Database['public']['Tables']['DiaryRoomAiMessage']['Row']

export async function createDiary(userId: string, date: Date) {
  const { data, error } = await supabase
    .from('Diary')
    .insert({
      user_id: userId,
      date: date.toISOString().split('T')[0],
      status: 'init'
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getDiaryByDate(userId: string, date: Date) {
  const { data, error } = await supabase
    .from('Diary')
    .select(`
      *,
      DiaryRoom (
        *,
        DiaryRoomUserMessage (*),
        DiaryRoomAiMessage (*)
      )
    `)
    .eq('user_id', userId)
    .eq('date', date.toISOString().split('T')[0])
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 は結果が見つからない場合のエラー
  return data
}

export async function createDiaryMessage(
  diaryRoomId: string, 
  userId: string, 
  content: string,
  sender: 'user' | 'ai'
) {
  if (sender === 'user') {
    const { data, error } = await supabase
      .from('DiaryRoomUserMessage')
      .insert({
        diary_room_id: diaryRoomId,
        user_id: userId,
        content: content,
      })
      .select()
      .single()

    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase
      .from('DiaryRoomAiMessage')
      .insert({
        diary_room_id: diaryRoomId,
        content: content,
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
} 