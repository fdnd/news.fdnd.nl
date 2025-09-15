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
  let { link } = await client.query(`
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

  // Sorting functions
  let numberOfHearts = (a, b) => {
    if (a.votes.length > b.votes.length) {
      return -1
    } else if (a.votes.length < b.votes.length) {
      return 1
    }
    return 0
  }
  let numberOfComments = (a, b) => {
    return a.comments.length > b.comments.length
  }

  link = link.sort(numberOfHearts)
  // console.log(link)

  return { link }
}
