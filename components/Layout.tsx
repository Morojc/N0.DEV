'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle, Image as ImageIcon, Settings, HelpCircle, User, LogOut, CreditCard, Moon, Sun, ChevronDown, Menu } from "lucide-react"
import { AnimatedLogo } from './animated-logo'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTheme } from '@/contexts/ThemeContext'
import AnimatedBackgroundLines from './animated-background-lines'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const StyledAnimatedLogo = () => {
  return (
    <div className="relative w-48 h-12 md:w-64 md:h-16 flex items-center justify-center">
      <AnimatedLogo />
    </div>
  )
}

export default function Layout({ children, hideHeader = false }: LayoutProps) { 
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`relative min-h-screen overflow-hidden flex flex-col md:flex-row ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <AnimatedBackgroundLines />
      
      {/* Mobile Header - Always show the menu button */}
      <header className={`md:hidden h-16 backdrop-blur-sm border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4 flex items-center justify-between`}>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
        </Button>
        {!hideHeader && <StyledAnimatedLogo />}
        <div className="w-6" /> {/* Placeholder for balance */}
      </header>

      {!hideHeader && (
        /* Beta Version Indicator */
        <div className="absolute top-0 right-0 m-4 z-50">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-purple-600 to-pink-600' : 'from-purple-400 to-pink-500'} blur-sm opacity-75 rounded-full`}></div>
            <div className={`relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} px-3 py-1 rounded-full border border-gray-200 shadow-sm`}>
              <span className={`text-xs font-semibold bg-gradient-to-r ${theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
                Beta Version
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-16 backdrop-blur-sm p-1 flex flex-col items-center border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-col h-full justify-between">
          <nav className="space-y-4 py-4">
            <Link href="/">
              <Button variant="ghost" size="icon" title="Home" className="h-12 w-12">
                <PlusCircle className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" title="My Creations" className="h-12 w-12">
              <ImageIcon className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
            </Button>
            <Button variant="ghost" size="icon" title="Settings" className="h-12 w-12">
              <Settings className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
            </Button>
            <Button variant="ghost" size="icon" title="Help" className="h-12 w-12">
              <HelpCircle className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
            </Button>
          </nav>
          
          {/* User options button */}
          <div className="pb-4 w-full flex justify-center relative">
            <Popover open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
              <PopoverTrigger asChild>
                <button 
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme === 'dark' ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500'} flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group relative`}
                  onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                >
                  <User className="h-5 w-5 text-white" />
                  <span className={`absolute -inset-0.5 rounded-full bg-gradient-to-r ${theme === 'dark' ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500'} opacity-75 group-hover:opacity-100 blur animate-pulse`}></span>
                </button>
              </PopoverTrigger>
              <PopoverContent className={`w-64 p-0 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`} side="right" align="end" sideOffset={5}>
                <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">M</span>
                    </div>
                    <div>
                      <p className="font-semibold">morojc</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>hmoro.dev@outlook.com</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Free</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Button variant="ghost" className={`w-full justify-start ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} size="sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </Button>
                  <Button variant="ghost" className={`w-full justify-start ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
                <div className={`p-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Preferences</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Theme</span>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className={`p-1 ${theme === 'dark' ? 'bg-gray-700 text-white' : ''}`} onClick={toggleTheme}>
                        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Language</span>
                    <Button variant="outline" size="sm" className={`text-xs ${theme === 'dark' ? 'bg-gray-700 text-white' : ''}`}>
                      English
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
                <div className={`p-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Button className="w-full bg-black text-white hover:bg-gray-800" size="sm">
                    Upgrade Plan
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {!hideHeader && (
          /* Desktop Header */
          <header className={`hidden md:flex h-20 backdrop-blur-sm border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4 relative z-10 items-center justify-center`}>
            <StyledAnimatedLogo />
          </header>
        )}

        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-2 text-center">
          <div className={`flex flex-wrap justify-center items-center space-x-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
            {['FAQ', 'Pricing', 'Terms', 'AI Policy', 'Privacy', 'Legacy n0'].map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && <span className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'} px-1`}>|</span>}
                <a href="#" className="hover:underline">{item}</a>
              </React.Fragment>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
