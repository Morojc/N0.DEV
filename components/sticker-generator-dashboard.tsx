'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Image as ImageIcon, Settings, HelpCircle, LogOut, Upload, Sparkles, Zap } from "lucide-react"
import { BackgroundLines } from './background-lines'
import { AnimatedLogo } from './animated-logo'

export default function StickerGeneratorDashboard() {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundLines />
      <div className="relative z-10 flex min-h-screen">
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
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-2 relative">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900">What can I help you shape?</h2>
                  <p className="text-lg text-gray-700">Generate stickers, ask more, be creative</p>
                </div>
                
                <div className="relative">
                  {/* New Premium message section */}
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
                    className="h-24 pb-12 backdrop-blur-sm border-gray-300 focus:border-gray-400 focus:ring-gray-400 resize-none rounded-t-none"
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
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
