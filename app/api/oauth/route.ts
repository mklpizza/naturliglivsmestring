import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID
  const origin = request.nextUrl.origin
  const redirectUri = `${origin}/api/oauth/callback`
  const scope = 'repo'

  const authUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scope}`

  return NextResponse.redirect(authUrl)
}
