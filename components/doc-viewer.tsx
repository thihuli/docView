"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Edit2, Save, RotateCcw } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { renderMarkdown } from "@/lib/markdown"
import { useToast } from "@/hooks/use-toast"

interface LocalEdit {
  content: string
  timestamp: string
  originalContent: string
}

export function DocViewer({ content: originalContent }: { content: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentContent, setCurrentContent] = useState(originalContent)
  const [hasLocalChanges, setHasLocalChanges] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const currentPath = window.location.pathname
    const localEdits = JSON.parse(localStorage.getItem("docEdits") || "{}")
    const localEdit = localEdits[currentPath] as LocalEdit | undefined

    if (localEdit) {
      setCurrentContent(localEdit.content)
      setHasLocalChanges(true)
    } else {
      setCurrentContent(originalContent)
      setHasLocalChanges(false)
    }
  }, [originalContent])

  const handleSave = () => {
    try {
      const timestamp = new Date().toISOString()
      const currentPath = window.location.pathname
      const localEdits = JSON.parse(localStorage.getItem("docEdits") || "{}")
      
      localEdits[currentPath] = {
        content: currentContent,
        timestamp,
        originalContent,
      }
      
      localStorage.setItem("docEdits", JSON.stringify(localEdits))
      setIsEditing(false)
      setHasLocalChanges(true)
      
      toast({
        title: "Alterações salvas",
        description: "Suas alterações foram salvas localmente com sucesso.",
        duration: 3000,
      })
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas alterações.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleRestore = () => {
    const currentPath = window.location.pathname
    const localEdits = JSON.parse(localStorage.getItem("docEdits") || "{}")
    delete localEdits[currentPath]
    localStorage.setItem("docEdits", JSON.stringify(localEdits))
    
    setCurrentContent(originalContent)
    setHasLocalChanges(false)
    
    toast({
      title: "Documento restaurado",
      description: "O documento foi restaurado para a versão original.",
      duration: 3000,
    })
  }

  const handleEdit = () => {
    setIsEditing(true)
    toast({
      title: "Modo de edição ativado",
      description: "Você pode editar o conteúdo agora.",
      duration: 2000,
    })
  }

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 space-x-2">
        {isEditing ? (
          <Button 
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
        ) : (
          <>
            {hasLocalChanges && (
              <Button 
                onClick={handleRestore}
                variant="outline"
                className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Restaurar Original
              </Button>
            )}
            <Button 
              onClick={handleEdit}
              variant="outline"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </>
        )}
      </div>
      
      {isEditing ? (
        <Textarea
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
          className="min-h-[500px] mt-12 font-mono"
          placeholder="Digite o conteúdo em Markdown..."
        />
      ) : (
        <article className="prose prose-slate dark:prose-invert max-w-none mt-12">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: renderMarkdown(currentContent) 
            }} 
          />
        </article>
      )}
    </div>
  )
}