"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { ChevronRight, FileText, Loader2 } from "lucide-react"

interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
}

function parseSidebarContent(content: string): NavItem[] {
  const lines = content.split('\n')
  const navigation: NavItem[] = []
  let currentSection: NavItem | null = null

  for (const line of lines) {
    if (!line.trim()) continue

    if (line.trim().startsWith('- ') && !line.startsWith('  ')) {
      const linkMatch = line.trim().match(/\[(.*?)\]\((.*?)\)/)
      if (linkMatch) {
        const [, title, href] = linkMatch
        currentSection = {
          title,
          href: href.endsWith('.md') ? `/docs/${href.replace('.md', '')}` : undefined,
          items: []
        }
      } else {
        const title = line.trim().replace('- ', '')
        currentSection = {
          title,
          items: []
        }
      }
      navigation.push(currentSection)
    } else if (line.startsWith('  -') && currentSection) {
      const linkMatch = line.trim().match(/\[(.*?)\]\((.*?)\)/)
      if (linkMatch) {
        const [, title, href] = linkMatch
        const subItem: NavItem = {
          title,
          href: href.endsWith('.md') ? `/docs/${href.replace('.md', '')}` : `/docs/${href}`
        }
        currentSection.items?.push(subItem)
      }
    }
  }
  return navigation.filter(section => 
    section.title && (!section.items || section.items.length > 0)
  )
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [navigation, setNavigation] = useState<NavItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSidebar() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/docs/_sidebar')
        if (!response.ok) throw new Error('Falha ao carregar o menu')
      
        const data = await response.json()
        const parsedNavigation = parseSidebarContent(data.content)
        setNavigation(parsedNavigation)
      }
      catch (err) {
        console.error('Erro ao carregar sidebar:', err)
        setError('Falha ao carregar o menu de navegação')
      } finally {
        setLoading(false)
      }
    }

    fetchSidebar()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-destructive">
        {error}
      </div>
    )
  }

  return (
    <div className={cn("border-r bg-muted/40 w-72", className)}>
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="font-bold">Docs</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)] py-6">
        <div className="px-3">
        {navigation.map((section, index) => (
            <div key={index} className="pb-4">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">
                {section.title}
              </h4>
              {section.items?.map((item, itemIndex) => (
                <Button
                  key={itemIndex}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-muted"
                  )}
                  asChild>
                  <Link href={item.href || '#'}>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}