import { DIRECTUS_EMAIL, DIRECTUS_PASSW } from '$env/static/private'
import { authentication, createDirectus, createItems, deleteItem, readItems, rest } from '@directus/sdk'

import { redirect } from '@sveltejs/kit'

export async function POST({ cookies, request }) {
  const session = cookies.get('session')

  // Controleer of er een actieve session is (TODO valideer de session)
  if (session) {
    const data = await request.formData()
    const link = data.get('id')
    const email = JSON.parse(session).email

    const client = createDirectus('https://fdnd.directus.app').with(rest()).with(authentication('json'))
    const login = await client.login({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSW })

    const existingVote = await client.request(
      readItems('vote', {
        fields: ['id'],
        filter: { _and: [{ link: { id: { _eq: link } } }, { email: { _eq: email } }] },
      })
    )
    if (existingVote.length > 0) {
      const uuid = existingVote[0].id
      console.log(`Trying to delete vote with uuid: ${uuid}`)
      const deletedVote = await client.request(deleteItem('vote', uuid))
      redirect(302, '/?vote=false')
    } else {
      console.log(`No result, let's add a vote`)
      const result = await client.request(createItems('vote', { link, email }))
      redirect(302, '/?vote=true')
    }
  } else {
    redirect(302, '/login?error=vote')
  }
}
