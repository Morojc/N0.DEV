import React from 'react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

const images = [
  { src: '/landscape-boat.png', alt: 'Mystical landscape with a red-sailed boat' },
  { src: '/flower-closeup.png', alt: 'Close-up of a frosted red flower' },
  { src: '/woman-armor.png', alt: 'Portrait of a woman in futuristic armor' },
]

export default function ImageExamples() {
  const { theme } = useTheme()

  return (
    <div className="mt-6 relative mx-auto max-w-[456px]">
      <div className="futuristic-showcase grid grid-cols-3 gap-[3px]">
        {images.map((image, index) => (
          <div key={index} className="showcase-item">
            <div className="image-frame">
              <Image
                src={image.src}
                alt={image.alt}
                width={150}
                height={150}
                style={{ objectFit: 'cover' }}
                className="rounded-none"
              />
            </div>
          </div>
        ))}
      </div>
      <p className={`text-[11px] mt-4 text-center max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Explore our AI-generated masterpieces. Each image showcases a unique creation, demonstrating the boundless potential of our creative AI.
      </p>
    </div>
  )
}
