"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DocLayout } from "@/components/doc-layout"

interface LocalEdit {
  content: string
  timestamp: string
  originalContent: string
  path: string
}

export default function AdminPage() {
  const [localEdits, setLocalEdits] = useState<LocalEdit[]>([])
  const [selectedEdit, setSelectedEdit] = useState<LocalEdit | null>(null)

  useEffect(() => {
    const edits = JSON.parse(localStorage.getItem("docEdits") || "{}")
    const formattedEdits = Object.entries(edits).map(([path, edit]: [string, any]) => ({
      ...edit,
      path,
    }))
    setLocalEdits(formattedEdits)
  }, [])

  return (
    <DocLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Local Edits</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {localEdits.map((edit, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left mb-2"
                  onClick={() => setSelectedEdit(edit)}
                >
                  <div>
                    <div className="font-medium">{edit.path}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(edit.timestamp), "PPpp")}
                    </div>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Diff View</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEdit ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Original Content</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto">
                    {selectedEdit.originalContent}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Modified Content</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-auto">
                    {selectedEdit.content}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Select an edit to view differences
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DocLayout>
  )
}