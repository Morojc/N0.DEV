'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Image as ImageIcon, Settings, HelpCircle, LogOut } from "lucide-react"
import { BackgroundLines } from './background-lines'
import { AnimatedLogo } from './animated-logo'

export default function StickerGeneratorDashboard() {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <BackgroundLines />
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-16 bg-white/80 backdrop-blur-sm p-2 flex flex-col items-center border-r border-gray-200">
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
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
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
                <Textarea
                  id="prompt"
                  placeholder="Describe the sticker you want to generate... Let your imagination run wild!"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-32 pb-12 bg-white/80 backdrop-blur-sm border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                />
                <Button 
                  className="absolute bottom-2 right-2 bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Generate Sticker
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
