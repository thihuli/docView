import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  // @ts-ignore
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

export function renderMarkdown(content: string): string {
  try {
    // @ts-ignore
    return marked(content)
  } catch (error) {
    console.error('Erro ao renderizar markdown:', error)
    return 'Erro ao renderizar o conteúdo'
  }
}