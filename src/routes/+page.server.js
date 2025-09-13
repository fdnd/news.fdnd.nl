import { createDirectus, graphql, readItems } from '@directus/sdk'

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete('session', { path: '/' })
    return { succes: true }
  },
}

export async function load() {
  /* REST manier
  const client = createDirectus('https://fdnd.directus.app').with(rest())
  const result = await client.request(readItems('link', {
    fields: ['id'],
  }))
  // */

  // GraphQL manier
  const client = createDirectus('https://fdnd.directus.app').with(graphql())
  const result = await client.query(`
    query {
      link {
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
          comment
          email
        }
      }
    }
  `)

  return { link: result.link }
}
