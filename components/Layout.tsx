'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle, Image as ImageIcon, Settings, HelpCircle, User, LogOut, CreditCard, Moon, Sun, ChevronDown, Menu, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTheme } from '@/contexts/ThemeContext'
import AnimatedBackgroundLines from './animated-background-lines'
import Link from 'next/link'
import { AnimatedLogo } from './animated-logo'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  isAICreatorPage?: boolean;
}

export default function Layout({ children, hideHeader = false, hideFooter = false, isAICreatorPage = false }: LayoutProps) { 
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const menuItems = [
    { icon: <PlusCircle />, label: 'Home', href: '/' },
    { icon: <ImageIcon />, label: 'My Creations', href: '#' },
    { icon: <Settings />, label: 'Settings', href: '#' },
    { icon: <HelpCircle />, label: 'Help', href: '#' },
  ]

  return (
    <div className={`relative min-h-screen flex flex-col md:flex-row ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <AnimatedBackgroundLines />
      
      {/* Mobile Header */}
      {isMobile && (
        <header className={`h-16 backdrop-blur-sm border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4 flex items-center justify-between`}>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
            )}
          </Button>
          <div className="w-6" /> {/* Placeholder for balance */}
        </header>
      )}

      {/* Animated Radial Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-64 h-64"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute"
                    style={{
                      top: `${50 + 40 * Math.sin((index * Math.PI) / 2)}%`,
                      left: `${50 + 40 * Math.cos((index * Math.PI) / 2)}%`,
                    }}
                  >
                    <Link href={item.href} className="pointer-events-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-16 h-16 rounded-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="text-xs mt-1">{item.label}</span>
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Beta Version Indicator and User Button */}
      {!hideHeader && !isAICreatorPage && !isMobile && (
        <div className="absolute top-0 right-0 m-3 z-50 flex items-center space-x-2">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-purple-600 to-pink-600' : 'from-purple-400 to-pink-500'} blur-sm opacity-75 rounded-full`}></div>
            <div className={`relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} px-2 py-0.5 rounded-full border border-gray-200 shadow-sm`}>
              <span className={`text-[10px] font-semibold bg-gradient-to-r ${theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
                Beta Version
              </span>
            </div>
          </div>
          <Popover open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
            <PopoverTrigger asChild>
              <button 
                className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme === 'dark' ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500'} flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group relative`}
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              >
                <User className="h-4 w-4 text-white" />
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
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className={`md:block md:w-14 backdrop-blur-sm p-1 flex flex-col items-center border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col h-full w-full">
            <nav className="space-y-2 py-2">
              {menuItems.map((item, index) => (
                <Link key={index} href={item.href}>
                  <Button variant="ghost" size="icon" title={item.label} className="h-9 w-9">
                    {item.icon}
                  </Button>
                </Link>
              ))}
            </nav>

            {isAICreatorPage && (
              <div className="mt-auto pb-2">
                <Popover open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
                  <PopoverTrigger asChild>
                    <button 
                      className={`w-9 h-9 rounded-full bg-gradient-to-r ${theme === 'dark' ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500'} flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group relative`}
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
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {!hideHeader && !isMobile && (
          /* Desktop Header */
          <header className={`hidden md:flex h-14 backdrop-blur-sm border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-2 relative z-10 items-center justify-center`}>
            {/* Header content */}
          </header>
        )}

        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        {!hideFooter && (
          <footer className="relative z-10 py-2 text-center mt-auto">
            <div className={`flex flex-wrap justify-center items-center space-x-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
              {['FAQ', 'Pricing', 'Terms', 'AI Policy', 'Privacy', 'Legacy n0'].map((item, index) => (
                <React.Fragment key={item}>
                  {index > 0 && <span className={`${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'} px-1`}>|</span>}
                  <a href="#" className="hover:underline">{item}</a>
                </React.Fragment>
              ))}
            </div>
          </footer>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
