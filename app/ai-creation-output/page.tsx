'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { Send, Loader2, RefreshCw, User, Bot, Lock, Globe, Edit2 } from 'lucide-react'
import Layout from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
  const [isPrivate, setIsPrivate] = useState(false)
  const [title, setTitle] = useState("Customizable Dashboard Page")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState(title)
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get('prompt')
  const { theme } = useTheme()
  const titleInputRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (initialPrompt) {
      handleSendPrompt(initialPrompt)
    }
  }, [initialPrompt])

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.style.width = `${titleInputRef.current.scrollWidth}px`
    }
  }, [title])

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

  const handleTitleChange = () => {
    setTitle(tempTitle)
    setIsEditingTitle(false)
  }

  return (
    <Layout hideHeader>
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col md:flex-row">
          <Card className="flex-1 flex flex-col rounded-none border-0">
            <CardHeader className="p-2 sm:p-3 flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Dialog open={isEditingTitle} onOpenChange={setIsEditingTitle}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="p-1 h-auto">
                      <span className="text-xs sm:text-sm font-arial mr-2">{title}</span>
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Title</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        id="title"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <Button onClick={handleTitleChange}>Save changes</Button>
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="outline"
                  className={`text-[8px] sm:text-[10px] h-6 px-2 flex items-center 
                    ${isPrivate 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600' 
                      : 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600'
                    } transition-all duration-300 shadow-md hover:shadow-lg`}
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  {isPrivate ? (
                    <Lock className="h-3 w-3 mr-1" />
                  ) : (
                    <Globe className="h-3 w-3 mr-1" />
                  )}
                  <span className="ml-1">{isPrivate ? 'Private' : 'Public'}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-2 sm:p-3">
              <ScrollArea className="h-full pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start mb-2 space-x-2"
                  >
                    <div className={`rounded-full p-1 ${message.isUser ? 'bg-blue-500' : 'bg-gray-300'}`}>
                      {message.isUser ? <User size={12} className="text-white" /> : <Bot size={12} className="text-gray-700" />}
                    </div>
                    <div 
                      className={`p-2 rounded-lg text-[10px] sm:text-xs max-w-[85%] ${
                        message.isUser ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.content}
                    </div>
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
                  className="text-[10px] sm:text-xs"
                />
                <Button type="submit" size="sm" disabled={isGenerating || !currentPrompt.trim()}>
                  {isGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                </Button>
              </form>
            </CardFooter>
          </Card>
          <Card className="flex-1 flex flex-col rounded-none border-0 md:border-l">
            <CardHeader className="flex flex-row items-center justify-between p-2 sm:p-3">
              <CardTitle className="text-xs sm:text-sm">Results</CardTitle>
              <Button variant="outline" size="sm" onClick={handleClearAll} className="text-[10px] sm:text-xs">
                <RefreshCw className="h-2 w-2 mr-1" />
                Clear All
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-2 sm:p-3">
              <Tabs defaultValue="preview" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="preview" className="text-[10px] sm:text-xs">Preview</TabsTrigger>
                  <TabsTrigger value="code" className="text-[10px] sm:text-xs">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="flex-grow overflow-hidden mt-2">
                  <ScrollArea className="h-full">
                    {results.map((result) => (
                      <div key={result.id} className="mb-2 p-2 sm:p-3 bg-muted rounded-lg text-[10px] sm:text-xs">
                        {result.content}
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="code" className="flex-grow overflow-hidden mt-2">
                  <ScrollArea className="h-full">
                    {results.map((result) => (
                      <pre key={result.id} className="mb-2 p-2 sm:p-3 bg-muted rounded-lg overflow-x-auto text-[10px] sm:text-xs">
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
