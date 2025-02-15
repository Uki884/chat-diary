import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type DiaryEntry = {
  id: number
  date: string
  summary: string
  conversation: { sender: "ai" | "user"; content: string }[]
}

export default function DiaryHistory() {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    { id: 1, date: "2023-05-01", summary: "A productive day with some challenges", conversation: [] },
    { id: 2, date: "2023-05-02", summary: "Relaxing day spent with family", conversation: [] },
    // Add more entries as needed
  ])

  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)

  return (
    <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle>Diary History</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          {selectedEntry ? (
            <div>
              <Button variant="link" onClick={() => setSelectedEntry(null)}>
                Back to list
              </Button>
              <h3 className="text-lg font-semibold mt-2">{selectedEntry.date}</h3>
              <p className="text-muted-foreground mb-4">{selectedEntry.summary}</p>
              {selectedEntry.conversation.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
                  <div
                    className={`py-2 px-3 rounded-lg ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            entries.map((entry) => (
              <Button
                key={entry.id}
                variant="ghost"
                className="w-full justify-start text-left mb-2"
                onClick={() => setSelectedEntry(entry)}
              >
                <div>
                  <div className="font-semibold">{entry.date}</div>
                  <div className="text-sm text-muted-foreground">{entry.summary}</div>
                </div>
              </Button>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

