import { DIRECTUS_EMAIL, DIRECTUS_PASSW } from '$env/static/private'
import { authentication, createDirectus, createItems, graphql, readItems, rest } from '@directus/sdk'

export const actions = {
  default: async ({ cookies, request }) => {
    const session = cookies.get('session')

    if (session) {
      const data = await request.formData()
      console.log(data)
      const link = data.get('link')
      const parent = data.get('parent') || null
      const comment = data.get('comment')
      const email = JSON.parse(session).email

      // Connect to directus and authenticate
      const client = createDirectus('https://fdnd.directus.app').with(rest()).with(authentication('json'))
      const login = await client.login({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSW })

      const result = await client.request(createItems('comment', { link, parent, comment, email }))
      return { succes: true }
    } else {
      redirect(302, '/login?error=comment')
    }
  },
}

export async function load({ cookies, params, url }) {
  const session = cookies.get('session') // cookie waarde
  const user = session ? JSON.parse(session).email : null // slug parameter
  const replyto = url.searchParams.get('replyto') // url parameter

  const client = createDirectus('https://fdnd.directus.app').with(graphql())
  const result = await client.query(`
    query {
      link(filter: { id: { _eq: "${params.uuid}"}}) {
        id
        date_created
        date_updated
        title
        url
        email
        votes {
          email
        }
        comments {
          id
          date_created
          date_updated
          parent {
            id
          }
          comment
          email
        }
      }
    }
  `)

  // console.log(result)
  // console.log('---')

  return { user, replyto, link: result.link[0] }
}
