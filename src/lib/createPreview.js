// import { getApi } from '@prismicio/client'
// import { getEndpoint } from '@prismicio/client'

export async function createPreview(query, headers, repoName) {
  console.log(`
  I
  do not know
  how previews work
  in client v6
  yet

  forgive me
  for eating
  the plums in
  the icebox
  `)
  // const req = { headers }
  // const token = query.get('token')
  // const documentId = query.get('documentId')
  // const apiEndpoint = getEndpoint(repoName)
  // const api = await Prismic.getApi(apiEndpoint, { req })
  // const url = await api
  //   .getPreviewResolver(token, documentId)
  //   .resolve(linkResolver, '/')
  // console.log(url)
  const url = '/'
  return {
    status: 302,
    headers: {
      location: url,
    },
    body: {},
  }
}

export default createPreview
