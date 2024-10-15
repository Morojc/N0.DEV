'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Heart } from 'lucide-react'

interface EmojiCardProps {
  emoji: {
    id: number
    url: string
  }
}

export default function EmojiCard({ emoji }: EmojiCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={emoji.url} alt="Generated Emoji" className="w-full h-auto rounded-lg" />
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <Button variant="ghost" size="icon" className="text-white hover:text-blue-400">
            <Download className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-red-400">
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  )
}
