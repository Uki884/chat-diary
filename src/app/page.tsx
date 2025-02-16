'use client'

import { useSession } from '@supabase/auth-helpers-react'
import DiaryHistory from '@/components/DiaryHistory'

export default function Home() {
  const session = useSession()

  if (!session) {
    return null
  }

  return <DiaryHistory />;
}

