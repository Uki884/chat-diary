import Link from "next/link"
import { Home, Calendar, PenTool, Settings } from "lucide-react"

export const FooterNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="container mx-auto flex justify-around items-center py-2">
        <Link href="/" className="flex flex-col items-center p-2">
          <Home size={24} />
          <span className="text-xs mt-1">ホーム</span>
        </Link>
        <Link href="#" className="flex flex-col items-center opacity-50 cursor-not-allowed">
          <Calendar size={24} />
          <span className="text-xs mt-1">カレンダー</span>
        </Link>
        <Link href="/today" className="flex flex-col items-center p-2">
          <PenTool size={24} />
          <span className="text-xs mt-1">今日の日記</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center p-2">
          <Settings size={24} />
          <span className="text-xs mt-1">設定</span>
        </Link>
      </div>
    </nav>
  );
}

