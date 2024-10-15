'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function EmojiGeneratorForm() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await response.json()
      if (response.ok) {
        // TODO: Add the new emoji to the grid
        console.log('Generated emoji URL:', data.url)
      } else {
        console.error('Failed to generate emoji:', data.error)
      }
    } catch (error) {
      console.error('Error generating emoji:', error)
    }
    setIsGenerating(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={prompt}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
        placeholder="Enter your emoji prompt..."
        className="w-full p-2 border border-gray-300 rounded-md"
        rows={4}
      />
      <Button 
        type="submit" 
        disabled={isGenerating}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isGenerating ? 'Generating...' : 'Generate Emoji'}
      </Button>
    </form>
  )
}
