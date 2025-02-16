'use client'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const supabase = useSupabaseClient()
  const session = useSession();
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('ログアウトエラー:', error)
    } else {
      // ログアウト成功後、必要に応じてリダイレクトを実行（例：ログインページへ）
      router.push('/login')
    }
  }

  const handleLogin = () => {
    router.push('/login')
  }

  console.log("session", session)

  return (
    session ? <button onClick={handleLogout}>
      ログアウト
    </button> : null
  )
};
