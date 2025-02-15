"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export type Message = {
  id: number;
  content: string;
  sender: "ai" | "user";
};

type DiaryChatProps = {
  id: number;
  date: string;
  initialMessages: Message[];
};

export default function DiaryChat({
  id,
  date,
  initialMessages,
}: DiaryChatProps) {
  console.log("messages", initialMessages);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, content: input, sender: "user" },
      ]);
      setInput("");
    }
  };

  return (
    <Card className="w-full max-w-2xl h-[80vh] flex flex-col dark:bg-gray-800 mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-serif flex items-center justify-between">
          {date}
          <Button variant="outline" onClick={handleSend} className="">
            日記を終える
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`flex items-end ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {message.sender === "ai" ? "📔" : "✍️"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`mx-2 py-2 px-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-[#e6f3ff] text-gray-800 dark:bg-blue-700 dark:text-white"
                      : "bg-[#f0f0f0] text-gray-800 dark:bg-gray-600 dark:text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Textarea
          placeholder="今日の出来事や感情を自由に書いてください..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          className="w-full min-h-[100px] bg-white dark:bg-gray-700"
        />
        <div className="flex w-full space-x-2">
          <Button onClick={handleSend} className="flex-1">
            書く
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
