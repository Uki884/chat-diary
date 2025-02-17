import { useState } from "react";
import { Card, YStack, XStack, Text, ScrollView, Button, TextArea, Avatar } from "tamagui";

export type Message = {
  id: number;
  content: string;
  sender: "ai" | "user";
  timestamp: Date;
};

type DiaryChatProps = {
  id: number;
  date: string;
  initialMessages: Message[];
};

export default function DiaryChat({
  date,
  initialMessages,
}: DiaryChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, content: input, sender: "user", timestamp: new Date() },
      ]);
      setInput("");
    }
  };

  return (
    <Card width="100%" backgroundColor="$background">
      <YStack flex={1} gap="$2">
        <XStack padding="$4" justifyContent="space-between" alignItems="center">
          <Text fontSize="$6" fontWeight="bold">
            {date}
          </Text>
          <Button onPress={handleSend} variant="outlined">
            日記を終える
          </Button>
        </XStack>
        <YStack padding="$4" gap="$2">
          <ScrollView 
          flex={1} 
          padding="$4" 
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          height={'80vh'}
        >
          {messages.map((message) => (
            <XStack
              key={message.id}
              justifyContent={
                message.sender === "user" ? "flex-end" : "flex-start"
              }
              marginVertical="$2"
            >
              <XStack
                alignItems="flex-end"
                flexDirection={
                  message.sender === "user" ? "row-reverse" : "row"
                }
                gap="$2"
              >
                {message.sender === "ai" && (
                  <Avatar circular size="$2">
                    <Avatar.Fallback>
                      <Text>📔</Text>
                    </Avatar.Fallback>
                  </Avatar>
                )}
                <YStack>
                  <Card
                    backgroundColor={
                      message.sender === "user" ? "$blue8" : "$gray4"
                    }
                    padding="$3"
                    borderRadius="$4"
                  >
                    <Text
                      color={message.sender === "user" ? "white" : "$gray12"}
                    >
                      {message.content}
                    </Text>
                  </Card>
                  <Text fontSize={10} color="$gray11" textAlign="right">
                    {message.timestamp.toLocaleString("ja-JP", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </YStack>
              </XStack>
            </XStack>
          ))}
        </ScrollView>
        </YStack>
        <YStack padding="$4" gap="$2">
          <TextArea
            size="$4"
            placeholder="今日の出来事や感情を自由に書いてください..."
            value={input}
            onChangeText={setInput}
            backgroundColor="$gray2"
            minHeight={100}
          />
          <Button onPress={handleSend} theme="active">
            書く
          </Button>
        </YStack>
      </YStack>
    </Card>
  );
}
