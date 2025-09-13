import { DIRECTUS_EMAIL, DIRECTUS_PASSW } from '$env/static/private'
import { authentication, createDirectus, createItems, deleteItem, readItems, rest } from '@directus/sdk'

import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ cookies, request }) => {
    const session = cookies.get('session')

    // Check if there is an active session
    if (session) {
      // Get data from form fields
      const data = await request.formData()
      const title = data.get('title')
      const url = data.get('url')
      const email = JSON.parse(session).email

      // Connect to directus and authenticate
      const client = createDirectus('https://fdnd.directus.app').with(rest()).with(authentication('json'))
      const login = await client.login({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSW })

      // Check if the url already exists
      const existingLink = await client.request(readItems('link', { fields: ['id'], filter: { url: { _eq: url } } }))

      // The url exists, redirect to the original post
      if (existingLink.length > 0) {
        const id = existingLink[0].id
        redirect(302, `/${id}/?error=duplicate`)

        // The url does not exist, create a new link
      } else {
        const result = await client.request(createItems('link', { title, url, email }))
        redirect(302, '/')
      }
    } else {
      redirect(302, '/login?error=submit')
    }
  },
}
