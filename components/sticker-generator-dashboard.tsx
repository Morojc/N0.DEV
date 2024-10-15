'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Image as ImageIcon, Settings, HelpCircle, Upload, Sparkles, Zap, Plus, User, LogOut, CreditCard, Moon, Sun, ChevronDown } from "lucide-react"
import { BackgroundLines } from './background-lines'
import { AnimatedLogo } from './animated-logo'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// New wrapper component for AnimatedLogo
const StyledAnimatedLogo = () => (
  <div className="relative w-48 h-12 flex items-center justify-center">
    <AnimatedLogo />
  </div>
)

export default function StickerGeneratorDashboard() { 
  const [prompt, setPrompt] = useState('')
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <BackgroundLines />
      {/* Beta Version Indicator */}
      <div className="absolute top-0 right-0 m-4 z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 blur-sm opacity-75 rounded-full"></div>
          <div className="relative bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
            <span className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Beta Version
            </span>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex flex-1">
        {/* Sidebar */}
        <div className="w-16 backdrop-blur-sm p-2 flex flex-col items-center border-r border-gray-200">
          <nav className="space-y-4 flex-grow py-4">
            <Button variant="ghost" size="icon" title="New Sticker">
              <PlusCircle className="h-6 w-6 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" title="My Stickers">
              <ImageIcon className="h-6 w-6 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" title="Settings">
              <Settings className="h-6 w-6 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" title="Help">
              <HelpCircle className="h-6 w-6 text-gray-600" />
            </Button>
          </nav>
          
          {/* Updated User options button */}
          <Popover open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
            <PopoverTrigger asChild>
              <button 
                className="mt-auto w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group relative"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              >
                <User className="h-5 w-5 text-white" />
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 blur animate-pulse"></span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" side="right" align="end">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">M</span>
                  </div>
                  <div>
                    <p className="font-semibold">morojc</p>
                    <p className="text-xs text-gray-500">hmoro.dev@outlook.com</p>
                    <p className="text-xs text-gray-500">Free</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
              <div className="p-2 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-2">Preferences</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Theme</span>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" className="p-1">
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-1">
                      <Moon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Language</span>
                  <Button variant="outline" size="sm" className="text-xs">
                    English
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="p-2 border-t border-gray-200">
                <Button className="w-full bg-black text-white hover:bg-gray-800" size="sm">
                  Upgrade Plan
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="h-16 backdrop-blur-sm border-b border-gray-200 p-4 relative z-10 flex items-center">
            <StyledAnimatedLogo />
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="space-y-2 relative">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900">How can I assist your creativity?</h2>
                  <p className="text-base text-gray-700">Let's create something fun together! Stickers, ideas, and endless creativity await!</p>
                </div>
                
                <div className="relative">
                  {/* Premium message section */}
                  <div className="bg-gray-100 border border-gray-300 border-b-0 rounded-t-md p-2 flex items-center justify-between text-xs">
                    <p className="text-gray-700">Need more messages? Get higher limits with Premium.</p>
                    <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50 h-6 text-xs px-2">
                      <Zap className="h-3 w-3 mr-1" />
                      Upgrade
                    </Button>
                  </div>

                  <Textarea
                    id="prompt"
                    placeholder="Dream big! What unique creation do you have in mind... Let your imagination run wild!"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-24 pb-12 backdrop-blur-sm border-gray-300 focus:border-gray-400 focus:ring-gray-400 resize-none rounded-t-none"
                    style={{ minHeight: '96px', maxHeight: '96px' }}
                  />
                  <Button 
                    className="absolute bottom-2 right-2 bg-gray-800 hover:bg-gray-900 text-white"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-2 left-2 text-gray-400 hover:text-gray-600"
                    title="Upload Image"
                  >
                    <Upload className="h-5 w-5" />
                  </Button>
                </div>

                {/* Updated labels section with prompts and icons */}
                <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-600">
                  <button onClick={() => setPrompt("Image: Futuristic city with neon lights.")} className="border border-gray-300 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors flex items-center font-bold">
                    Image: Futuristic city
                    <Plus className="h-3 w-3 ml-1 text-gray-400" />
                  </button>
                  <button onClick={() => setPrompt("Sticker: Cute cartoon animals with expressions.")} className="border border-gray-300 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors flex items-center font-bold">
                    Sticker: Cute animals
                    <Plus className="h-3 w-3 ml-1 text-gray-400" />
                  </button>
                  <button onClick={() => setPrompt("Emoji: Celestial-themed emojis with glow.")} className="border border-gray-300 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors flex items-center font-bold">
                    Emoji: Celestial theme
                    <Plus className="h-3 w-3 ml-1 text-gray-400" />
                  </button>
                  <button onClick={() => setPrompt("Video: Space journey through planets, wormhole.")} className="border border-gray-300 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors flex items-center font-bold">
                    Video: Space journey
                    <Plus className="h-3 w-3 ml-1 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Updated footer section with pipe separators */}
      <footer className="relative z-10 py-2 text-center">
        <div className="flex justify-center items-center space-x-1 text-xs text-gray-500">
          <a href="#" className="hover:underline">FAQ</a>
          <span className="text-gray-300 px-1">|</span>
          <a href="#" className="hover:underline">Pricing</a>
          <span className="text-gray-300 px-1">|</span>
          <a href="#" className="hover:underline">Terms</a>
          <span className="text-gray-300 px-1">|</span>
          <a href="#" className="hover:underline">AI Policy</a>
          <span className="text-gray-300 px-1">|</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span className="text-gray-300 px-1">|</span>
          <a href="#" className="hover:underline">Legacy v0</a>
        </div>
      </footer>
    </div>
  )
}
