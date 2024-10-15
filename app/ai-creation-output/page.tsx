'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { Sparkles, Send, Loader2, RefreshCw } from 'lucide-react'
import Layout from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Message = {
  id: number
  content: string
  isUser: boolean
}

type Result = {
  id: number
  content: string
}

export default function AICreationOutput() {
  const [messages, setMessages] = useState<Message[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get('prompt')

  useEffect(() => {
    if (initialPrompt) {
      handleSendPrompt(initialPrompt)
    }
  }, [initialPrompt])

  const handleSendPrompt = async (prompt: string) => {
    if (!prompt.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      content: prompt,
      isUser: true,
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
    setCurrentPrompt("")
    setIsGenerating(true)

    // Simulating API call with setTimeout
    setTimeout(() => {
      const newResult: Result = {
        id: Date.now(),
        content: `Generated result for: "${prompt}"`,
      }
      setResults((prevResults) => [...prevResults, newResult])
      setIsGenerating(false)

      const assistantMessage: Message = {
        id: Date.now() + 1,
        content: "Result generated successfully!",
        isUser: false,
      }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])
    }, 2000)
  }

  const handleClearAll = () => {
    setMessages([])
    setResults([])
  }

  return (
    <Layout hideHeader>
      <div className="container mx-auto p-2 sm:p-4 h-[calc(100vh-4rem)] flex flex-col">
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 flex-grow">
          <Card className="flex flex-col">
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="text-lg sm:text-xl">Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-2 sm:p-4">
              <ScrollArea className="h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)] pr-2 sm:pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                      message.isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    } max-w-[85%] sm:max-w-[80%]`}
                  >
                    {message.content}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-2 sm:p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendPrompt(currentPrompt)
                }}
                className="flex w-full items-center space-x-2"
              >
                <Input
                  type="text"
                  placeholder="Type your prompt..."
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  className="text-sm sm:text-base"
                />
                <Button type="submit" size="icon" disabled={isGenerating || !currentPrompt.trim()}>
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4">
              <CardTitle className="text-lg sm:text-xl">Results</CardTitle>
              <Button variant="outline" size="sm" onClick={handleClearAll} className="text-xs sm:text-sm">
                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Clear All
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-2 sm:p-4">
              <Tabs defaultValue="preview" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-2 sm:mb-4">
                  <TabsTrigger value="preview" className="text-sm sm:text-base">Preview</TabsTrigger>
                  <TabsTrigger value="code" className="text-sm sm:text-base">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="flex-grow overflow-hidden mt-2 sm:mt-4">
                  <ScrollArea className="h-[calc(100vh-20rem)] md:h-[calc(100vh-16rem)]">
                    {results.map((result) => (
                      <div key={result.id} className="mb-3 sm:mb-4 p-3 sm:p-4 bg-muted rounded-lg text-sm sm:text-base">
                        {result.content}
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="code" className="flex-grow overflow-hidden mt-2 sm:mt-4">
                  <ScrollArea className="h-[calc(100vh-20rem)] md:h-[calc(100vh-16rem)]">
                    {results.map((result) => (
                      <pre key={result.id} className="mb-3 sm:mb-4 p-3 sm:p-4 bg-muted rounded-lg overflow-x-auto text-xs sm:text-sm">
                        <code>{result.content}</code>
                      </pre>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
