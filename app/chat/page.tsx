'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { Send, Loader2, RefreshCw, User, Edit2, Globe, Lock, Share2, Paperclip, X, Zap, Download, Share } from 'lucide-react'
import Layout from '@/components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Inter } from 'next/font/google'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const inter = Inter({ subsets: ['latin'] })

type Message = {
  id: number
  content: string
  isUser: boolean
}

type Result = {
  id: number
  content: string
}

const AnimatedAILogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      {/* A */}
      <path d="M30 75L45 30H55L70 75H60L57 65H43L40 75H30ZM45 55H55L50 40L45 55Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* I */}
      <path d="M75 30H85V75H75V30Z" fill="currentColor">
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
)

// Add this custom ShareIcon component
const ShareIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.59 13.51L15.42 17.49"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.41 6.51L8.59 10.49"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

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
  const [isPublic, setIsPublic] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showMobileResultModal, setShowMobileResultModal] = useState(false)
  const [latestResult, setLatestResult] = useState<Result | null>(null)
  const [textareaHeight, setTextareaHeight] = useState(60) // Initial height
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight
      if (scrollHeight > 60 && textareaHeight === 60) {
        setTextareaHeight(Math.min(scrollHeight, 120)) // Increase height up to 120px
      }
    }
  }, [currentPrompt, textareaHeight])

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
      setLatestResult(newResult)
      setIsGenerating(false)

      const assistantMessage: Message = {
        id: Date.now() + 1,
        content: "Result generated successfully!",
        isUser: false,
      }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])

      // Show the mobile result modal
      if (window.innerWidth < 768) {
        setShowMobileResultModal(true)
      }
    }, 2000)
  }

  const handleClearAll = () => {
    setMessages([])
    setResults([])
  }

  const handleTitleClick = () => {
    setIsDialogOpen(true)
    setTempTitle(title)
  }

  const handleTitleChange = () => {
    setTitle(tempTitle)
    setIsDialogOpen(false)
  }

  const handlePublicToggle = () => {
    setIsPublic(!isPublic)
  }

  // Add this function to generate a random gradient
  const getRandomGradient = () => {
    const colors = [
      'from-blue-500 to-purple-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-blue-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const getLabelColor = () => {
    if (isPublic) {
      return 'bg-gradient-to-r from-green-400 to-blue-500 text-white';
    }
    return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
  }

  const handleShare = () => {
    // Implement share functionality here
    console.log('Share output button clicked');
  }

  const handleFileUpload = () => {
    // Implement file upload functionality here
    console.log('File upload button clicked');
  }

  const getUserInitial = () => {
    // Assuming the user's name is "User" for this example
    // You should replace this with the actual user's name from your authentication system
    const userName = "User";
    return userName.charAt(0).toUpperCase();
  }

  const handleDownload = () => {
    // Implement download functionality here
    console.log('Download button clicked');
  }

  return (
    <Layout hideHeader hideFooter isAICreatorPage>
      <div className={`flex flex-col md:flex-row h-screen ${inter.className} text-sm`}>
        {/* Chat Column */}
        <Card className="flex-1 flex flex-col rounded-none border-b md:border-r md:border-b-0 md:w-1/2 min-w-0">
          <CardHeader className="p-2 flex flex-row items-center justify-between flex-wrap">
            <div className="flex items-center cursor-pointer flex-wrap" onClick={handleTitleClick}>
              <CardTitle className="text-xs md:text-sm font-normal mr-1 underline truncate max-w-[100px] md:max-w-none">{title}</CardTitle>
              <Edit2 size={12} className="mr-1 shrink-0" />
              <div className={`flex items-center text-[10px] md:text-xs px-1 py-0.5 rounded-full ${getLabelColor()} shrink-0`} style={{ height: '16px', lineHeight: '12px' }}>
                {isPublic ? (
                  <>
                    <Globe size={8} className="mr-0.5" />
                    <span className="hidden md:inline">Public</span>
                  </>
                ) : (
                  <>
                    <Lock size={8} className="mr-0.5" />
                    <span className="hidden md:inline">Private</span>
                  </>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="p-0.5 shrink-0" onClick={handleShare}>
              <Share2 size={14} />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-2">
            <ScrollArea className="h-full pr-2">
              {messages.map((message) => (
                <div key={message.id} className="flex mb-2 ml-1">
                  <div className={`w-6 h-6 flex items-center justify-center mr-1.5 shrink-0 rounded ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {message.isUser ? (
                      <span className="text-xs font-semibold">{getUserInitial()}</span>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <AnimatedAILogo />
                      </div>
                    )}
                  </div>
                  <div className={`flex-1 text-[10px] md:text-xs ${message.isUser ? 'pt-0.5' : 'pt-2'} break-words`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-2">
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSendPrompt(currentPrompt)
            }} className="flex w-full relative">
              <div className="relative flex-grow">
                <textarea
                  ref={textareaRef}
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow text-[10px] md:text-xs p-2 w-full resize-none rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pr-20 overflow-y-auto scrollbar-hide"
                  style={{
                    height: `${textareaHeight}px`,
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                />
                <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-background">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="p-1" 
                    onClick={handleFileUpload}
                  >
                    <Paperclip size={12} />
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isGenerating} 
                    size="sm" 
                    className="p-1 px-3 min-w-[60px]"
                  >
                    {isGenerating ? <Loader2 className="animate-spin h-3 w-3" /> : <Send size={12} />}
                  </Button>
                </div>
              </div>
            </form>
          </CardFooter>
        </Card>

        {/* Results Column */}
        <Card className="flex-1 flex flex-col rounded-none md:w-1/2 min-w-0">
          <CardHeader className="p-2 flex flex-col items-start space-y-2">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Output</h3>
                  <p className="text-xs text-gray-500">Generated results appear here</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare} 
                  className="text-[10px] md:text-xs py-1 px-2"
                  title="Share Output"
                >
                  <ShareIcon />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownload} 
                  className="text-[10px] md:text-xs py-1 px-2"
                  title="Download Output"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-2">
            <ScrollArea className="h-full">
              {results.map((result) => (
                <div key={result.id} className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] md:text-xs break-words">
                  {result.content}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Result Modal */}
      {showMobileResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 md:hidden">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Generation Result</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileResultModal(false)}>
                <X size={20} />
              </Button>
            </div>
            <div className="p-4">
              <p className="text-sm">{latestResult?.content}</p>
            </div>
            <div className="flex justify-end p-4 border-t">
              <Button variant="outline" size="sm" onClick={() => setShowMobileResultModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Edit Dashboard Title</DialogTitle>
          </DialogHeader>
          <Input
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            placeholder="Enter new title"
            className="text-sm"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="publicToggle"
              checked={isPublic}
              onChange={handlePublicToggle}
              className="w-4 h-4"
            />
            <Label htmlFor="publicToggle" className="text-sm">Public</Label>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} size="sm">Cancel</Button>
            <Button onClick={handleTitleChange} size="sm">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}
