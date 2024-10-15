import { NextResponse } from 'next/server'
import { generateEmoji } from '@/lib/replicate'

export async function POST(request: Request) {
  const { prompt } = await request.json()
  
  try {
    const emojiUrl = await generateEmoji(prompt)
    return NextResponse.json({ url: emojiUrl })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate emoji' }, { status: 500 })
  }
}
