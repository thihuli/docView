"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DocViewer } from "@/components/doc-viewer"
import { DocLayout } from "@/components/doc-layout"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DocsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/docs/${slug}`)
        if (!response.ok) throw new Error("Failed to fetch document")
        
        const data = await response.json()
        setContent(data.content)
      } catch (err) {
        setError("Failed to load document")
        toast({
          title: "Error",
          description: "Failed to load document",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDoc()
  }, [slug, toast])

  return (
    <DocLayout>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full text-destructive">
          {error}
        </div>
      ) : (
        <DocViewer content={content} />
      )}
    </DocLayout>
  )
}