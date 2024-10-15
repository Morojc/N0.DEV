import Layout from '@/components/Layout'
import StickerGeneratorDashboard from '@/components/sticker-generator-dashboard'

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl px-4">
          <StickerGeneratorDashboard />
        </div>
      </div>
    </Layout>
  )
}
