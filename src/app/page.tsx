import TodaysDiary from "@/components/TodaysDiary"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#fffaf0] dark:bg-gray-900">
      <TodaysDiary />
    </main>
  )
}

