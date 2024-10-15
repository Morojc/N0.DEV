'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Sparkles, Zap, Plus } from "lucide-react"
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'
import ImageExamples from './image-examples'

export default function GeneratorDashboard() { 
  const [prompt, setPrompt] = useState('')
  const { theme } = useTheme()
  const router = useRouter()

  const handleGenerate = () => {
    if (prompt.trim()) {
      router.push(`/chat?prompt=${encodeURIComponent(prompt.trim())}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <div className="space-y-2 relative">
        <div className="text-center mb-4">
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>How can I assist your creativity?</h2>
          <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Let's create something fun together! Ideas and endless creativity await!</p>
        </div>
        
        <div className="relative">
          {/* Premium message section */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} border-b-0 rounded-t-md p-2 flex items-center justify-between text-xs`}>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} flex-1 mr-2`}>Need to expand your dialogue? Upgrade to Premium for limitless messaging!</p>
            <Button variant="outline" size="sm" className={`${theme === 'dark' ? 'text-yellow-400 border-yellow-400 hover:bg-gray-700' : 'text-yellow-600 border-yellow-600 hover:bg-yellow-50'} h-6 text-xs px-2 whitespace-nowrap`}>
              <Zap className="h-3 w-3 mr-1" />
              Upgrade
            </Button>
          </div>

          <Textarea
            id="prompt"
            placeholder="Dream big! What unique creation do you have in mind... Let your imagination run wild!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={`w-full h-24 pb-12 backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'} focus:border-gray-400 focus:ring-gray-400 resize-none rounded-t-none`}
            style={{ minHeight: '96px', maxHeight: '96px' }}
          />
          <Button 
            className={`absolute bottom-2 right-2 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-900'} text-white`}
            onClick={handleGenerate}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Generate
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute bottom-2 left-2 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
            title="Upload Image"
          >
            <Upload className="h-5 w-5" />
          </Button>
        </div>

        {/* Updated labels section with prompts and icons */}
        <div className="flex flex-wrap gap-2 mt-3 text-xs justify-center">
          {['Image: Futuristic city', 'Icon: Cute animals', 'Graphic: Celestial theme', 'Video: Space journey'].map((label) => (
            <button 
              key={label}
              onClick={() => setPrompt(label)}
              className={`border ${theme === 'dark' ? 'border-gray-700 text-white hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-100'} px-2 py-1 rounded-full transition-colors flex items-center font-bold`}
            >
              {label}
              <Plus className={`h-3 w-3 ml-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`} />
            </button>
          ))}
        </div>
      </div>
      {/* Add the ImageExamples component here */}
      <ImageExamples />
    </div>
  )
}
