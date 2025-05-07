"use client"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-blue-500" />
            Campus AI Assistant
          </CardTitle>
          <CardDescription>
            Ask me anything about campus facilities, events, courses, or general information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-[500px] overflow-y-auto p-4 bg-gray-50 rounded-md mb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-3">
                <Bot className="h-12 w-12" />
                <div>
                  <p className="font-medium">How can I help you today?</p>
                  <p className="text-sm">Ask me about campus navigation, events, or general information.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-md">
                  <Button
                    variant="outline"
                    onClick={() => handleInputChange({ target: { value: "Where is the library?" } } as any)}
                  >
                    Where is the library?
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleInputChange({ target: { value: "What events are happening this week?" } } as any)
                    }
                  >
                    This week's events?
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleInputChange({ target: { value: "How do I register for classes?" } } as any)}
                  >
                    How to register for classes?
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleInputChange({ target: { value: "What dining options are available?" } } as any)
                    }
                  >
                    Dining options?
                  </Button>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar className={`${message.role === "user" ? "ml-2" : "mr-2"} h-8 w-8`}>
                      <AvatarFallback>
                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
