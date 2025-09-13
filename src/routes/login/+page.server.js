import { allowedDomain, generateToken, sendMail } from '$lib/utils/auth'

import { fail } from '@sveltejs/kit'

export const actions = {
  default: async function ({ request, url }) {
    const data = await request.formData()
    const email = data.get('email')

    if (typeof email !== 'string' || !allowedDomain(email)) return fail(400, { email, invalid: true })

    const magic_link = await generateToken(email, url)

    try {
      await sendMail(email, magic_link)
    } catch (error) {
      return fail(500, { email, error: 'Error sending magic link:', error })
    }

    return { success: true }
  },
}
