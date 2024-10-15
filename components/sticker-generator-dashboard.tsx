'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Image as ImageIcon, Settings, HelpCircle, LogOut, Upload, Sparkles, Zap, Plus } from "lucide-react"
import { BackgroundLines } from './background-lines'
import { AnimatedLogo } from './animated-logo'

export default function StickerGeneratorDashboard() {
  const [prompt, setPrompt] = useState('')

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
          <Button variant="ghost" size="icon" className="mt-auto" title="Logout">
            <LogOut className="h-6 w-6 text-gray-600" />
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="h-16 backdrop-blur-sm border-b border-gray-200 p-4 relative z-10 flex items-center">
            <div className="w-48 h-12">
              <AnimatedLogo />
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="space-y-2 relative">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900">What can I help you shape?</h2>
                  <p className="text-lg text-gray-700">Generate stickers, ask more, be creative</p>
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
                    placeholder="Describe the sticker you want to generate... Let your imagination run wild!"
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
