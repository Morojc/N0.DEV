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
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col md:flex-row">
          <Card className="flex-1 flex flex-col rounded-none border-0">
            <CardHeader className="p-2 sm:p-3">
              <CardTitle className="text-base sm:text-lg">Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-2 sm:p-3">
              <ScrollArea className="h-full pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-2 p-2 rounded-lg text-xs sm:text-sm ${
                      message.isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    } max-w-[85%] sm:max-w-[80%]`}
                  >
                    {message.content}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-2 sm:p-3">
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
                  className="text-xs sm:text-sm"
                />
                <Button type="submit" size="sm" disabled={isGenerating || !currentPrompt.trim()}>
                  {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                </Button>
              </form>
            </CardFooter>
          </Card>
          <Card className="flex-1 flex flex-col rounded-none border-0 md:border-l">
            <CardHeader className="flex flex-row items-center justify-between p-2 sm:p-3">
              <CardTitle className="text-base sm:text-lg">Results</CardTitle>
              <Button variant="outline" size="sm" onClick={handleClearAll} className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-2 sm:p-3">
              <Tabs defaultValue="preview" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="preview" className="text-xs sm:text-sm">Preview</TabsTrigger>
                  <TabsTrigger value="code" className="text-xs sm:text-sm">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="flex-grow overflow-hidden mt-2">
                  <ScrollArea className="h-full">
                    {results.map((result) => (
                      <div key={result.id} className="mb-2 p-2 sm:p-3 bg-muted rounded-lg text-xs sm:text-sm">
                        {result.content}
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="code" className="flex-grow overflow-hidden mt-2">
                  <ScrollArea className="h-full">
                    {results.map((result) => (
                      <pre key={result.id} className="mb-2 p-2 sm:p-3 bg-muted rounded-lg overflow-x-auto text-xs">
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
