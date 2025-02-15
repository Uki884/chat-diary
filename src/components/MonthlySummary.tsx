"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function MonthlySummary() {
  const [summary, setSummary] = useState(
    "This month was filled with both challenges and achievements. You made significant progress on your personal project and improved your work-life balance. There were some stressful moments, particularly in the second week, but you managed to overcome them through effective time management and self-care practices. Your relationships with family and friends strengthened, especially after the weekend getaway in the third week. Overall, it was a month of growth and self-discovery.",
  )

  const handleExport = () => {
    // Logic to export summary as CSV or text
    console.log("Exporting summary")
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Monthly Summary - May 2023</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="min-h-[200px]" />
      </CardContent>
      <CardFooter>
        <Button onClick={handleExport}>Export Summary</Button>
      </CardFooter>
    </Card>
  )
}

