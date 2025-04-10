import { NextResponse } from "next/server"

const BITBUCKET_WORKSPACE = process.env.BITBUCKET_WORKSPACE
const BITBUCKET_REPO = process.env.BITBUCKET_REPO
const BITBUCKET_BRANCH = process.env.BITBUCKET_BRANCH

export async function GET() {
  try {
    const url = `https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${BITBUCKET_REPO}/src/${BITBUCKET_BRANCH}/docs/_sidebar.md`
  
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar sidebar: ${response.statusText}`)
    }

    const content = await response.text()
    return NextResponse.json({ content })

  } catch (error) {
    console.error('Erro ao buscar sidebar:', error)
    return NextResponse.json(
      { error: 'Erro ao carregar menu de navegação' },
      { status: 500 }
    )
  }
}