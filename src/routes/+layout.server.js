import { redirect } from '@sveltejs/kit'

export async function load({ cookies, url }) {
  const session = cookies.get('session')

  // Already authenticated and trying to access login page
  if (session && url.pathname === '/login') {
    throw redirect(302, '/')
  }

  // Trying to access a protected route
  if (!session && url.pathname !== '/login' && url.pathname.startsWith('/auth/')) {
    throw redirect(302, '/login')
  }

  return {
    user: session ? JSON.parse(session).email : null,
  }
}
