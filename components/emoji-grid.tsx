import EmojiCard from './emoji-card'

// TODO: Replace with actual data fetching
const mockEmojis = [
  { id: 1, url: 'https://example.com/emoji1.png' },
  { id: 2, url: 'https://example.com/emoji2.png' },
  { id: 3, url: 'https://example.com/emoji3.png' },
  { id: 4, url: 'https://example.com/emoji4.png' },
]

export default function EmojiGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mockEmojis.map((emoji) => (
        <EmojiCard key={emoji.id} emoji={emoji} />
      ))}
    </div>
  )
}
