"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ActivityData = {
  date: string
  hasDiary: boolean
}

const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

function generateMonthData(year: number, month: number): ActivityData[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`,
    hasDiary: Math.random() < 0.5, // 50%の確率で日記ありとする
  }))
}

export default function ActivityHeatmap() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [monthsData, setMonthsData] = useState<ActivityData[][]>([])
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)

    setMonthsData([
      generateMonthData(prevMonth.getFullYear(), prevMonth.getMonth()),
      generateMonthData(currentDate.getFullYear(), currentDate.getMonth()),
      generateMonthData(nextMonth.getFullYear(), nextMonth.getMonth()),
    ])
  }, [currentDate])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.offsetWidth / 3, // Corrected scroll position
        behavior: "smooth",
      })
    }
  }, []) // Corrected dependency

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Button variant="outline" size="sm" onClick={handlePrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <CardTitle className="text-lg font-serif text-center">
          {`${currentDate.getFullYear()}年 ${monthNames[currentDate.getMonth()]}`}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory">
          {monthsData.map((monthData, monthIndex) => (
            <div key={monthIndex} className="flex-shrink-0 w-full snap-start">
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({
                  length: new Date(currentDate.getFullYear(), currentDate.getMonth() + monthIndex - 1, 1).getDay(),
                }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-6 h-6"></div>
                ))}
                {monthData.map((day) => (
                  <TooltipProvider key={day.date}>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className={`h-6 flex items-center justify-center rounded-sm w-[100%] ${
                            day.hasDiary
                              ? "bg-green-500 text-white dark:bg-green-700"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {day.date.split("-")[2]}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{`${day.date}: ${day.hasDiary ? "日記あり" : "日記なし"}`}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

