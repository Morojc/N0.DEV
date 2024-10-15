import Layout from '@/components/Layout'
import GeneratorDashboard from '@/components/generator-dashboard'
import { AnimatedLogo } from '@/components/animated-logo'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col min-h-[calc(100vh-5rem)]">
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="mb-8">
            <AnimatedLogo />
          </div>
          <div className="max-w-4xl w-full px-4">
            <GeneratorDashboard />
          </div>
        </div>
      </div>
    </Layout>
  )
}
