import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return new NextResponse(script('error', { message: 'Ingen kode modtaget fra GitHub' }), {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  const data = await tokenRes.json()

  if (data.error || !data.access_token) {
    return new NextResponse(script('error', data), {
      headers: { 'Content-Type': 'text/html' },
    })
  }

  return new NextResponse(
    script('success', { token: data.access_token, provider: 'github' }),
    { headers: { 'Content-Type': 'text/html' } }
  )
}

function script(status: 'success' | 'error', content: object) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`
  return `<!doctype html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(${JSON.stringify(message)}, e.origin);
        window.close();
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  <\/script></body></html>`
}
