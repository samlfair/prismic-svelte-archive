const importSliceZone = () => `
import SliceZone from 'prismic-svelte/SliceZone.svelte'; 
`

const importPrismic = () => `
import { prismic } from 'prismic-svelte'; 
`

const initClient = (repoName, routes, options) => `
prismic.client = prismic.setClientOptions("${repoName}", ${JSON.stringify({
  routes,
  ...options,
})});
`

export { importSliceZone, importPrismic, initClient }
