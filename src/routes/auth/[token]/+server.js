import { redirect } from '@sveltejs/kit'
import { verify } from '$lib/utils/auth'

export function GET({ params }) {
  const { token } = params
  const email = verify(token)

  if (email) {
    const sessionData = {
      email,
      expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day from now (dd*hh*mm*milisecs)
    }

    const cookie = `session=${JSON.stringify(sessionData)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`

    return new Response(null, {
      status: 302,
      headers: {
        'Set-Cookie': cookie,
        Refresh: '0; url=/',
      },
    })
  } else {
    redirect(302, '/login?error=invalid_token')
  }
}
