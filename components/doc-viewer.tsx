"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Edit2, Save } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { renderMarkdown } from "@/lib/markdown"
import { useToast } from "@/hooks/use-toast"

export function DocViewer({ content }: { content: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const { toast } = useToast()

  const handleSave = () => {
    try {
      const timestamp = new Date().toISOString()
      const localEdits = JSON.parse(localStorage.getItem("docEdits") || "{}")
      const currentPath = window.location.pathname
      
      localEdits[currentPath] = {
        content: editedContent,
        timestamp,
        originalContent: content,
      }
      
      localStorage.setItem("docEdits", JSON.stringify(localEdits))
      setIsEditing(false)
      
      toast({
        title: "Alterações salvas",
        description: "Suas alterações foram salvas localmente com sucesso.",
        duration: 3000,
        variant: "default",
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
          <Button 
            onClick={handleEdit}
            variant="outline"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Editar
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="min-h-[500px] mt-12 font-mono"
          placeholder="Digite o conteúdo em Markdown..."
        />
      ) : (
        <article className="prose prose-slate dark:prose-invert max-w-none mt-12">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: renderMarkdown(content) 
            }} 
          />
        </article>
      )}
    </div>
  )
}