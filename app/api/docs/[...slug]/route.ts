import { NextResponse } from "next/server"

const BITBUCKET_WORKSPACE = process.env.BITBUCKET_WORKSPACE
const BITBUCKET_REPO = process.env.BITBUCKET_REPO
const BITBUCKET_BRANCH = process.env.BITBUCKET_BRANCH

async function fetchFromBitbucket(path: string) {
  const url = `https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${BITBUCKET_REPO}/src/${BITBUCKET_BRANCH}/docs/${path}`

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar arquivo: ${response.statusText}`)
    }

    const content = await response.text()
    return content

  } catch (error) {
    console.error('Erro ao buscar arquivo do Bitbucket:', error)
    throw error
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) { 
  try {
    const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug
    const filePath = slug === 'homepage' ? 'homepage.md' : `${slug}.md`
  
    const content = await fetchFromBitbucket(filePath)

    return NextResponse.json({ content })

  } catch (error) {
    console.error('Erro na rota API:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar documento' },
      { status: 500 }
    )
  }
}