# `prismic-svelte`

**WARNING: This project is in early development. See issues and planning on [the GitHub repo](https://github.com/samlfair/prismic-svelte).**

A set of helpers for developing Prismic projects with Svelte.

## To do

- [ ] Add HTML Serializer to config (and asHTML)
- [ ] Add Slices to config
- [x] Create a SliceZone component
- [x] Make SliceZone component work
- [x] Handle the API options
- [ ] Add TypeScript and re-enable `config.kit.emitTypes`
- [ ] Configure previews with client v6
- [ ] Add a RichText component

Do we want to add an Image component?

## Installation

To add `prismic-svelte`, first install:

```bash
npm i prismic-svelte@alpha
```

At the root of your project, create a file called `prismic.config.js`. Paste in the following code, and update the values:

```js
const prismicConfig = {
  // Fill in your repo name
  repoName: 'sam-onboarding-nuxt-blog',

  // Define a route for each Custom Type
  routes: [
    {
      type: 'page',
      path: '/:uid',
    },
    {
      type: 'post',
      path: '/blog/:uid',
    },
  ],

  // Add an access token (only if your repo is private)
  accessToken: null,

  // Add any API options
  options: {},
}

export default prismicConfig
```

In `svelte.config.js`, import the plugin and add it to Svelte's preprocessor. Update the repo name.

```js
import { usePrismic } from 'prismic-svelte'
import { repoName } from './prismic.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
  },
  preprocess: [usePrismic({ repoName })],
}
```

Fill in the config options. Only `repoName` is required.

`repoName`: The name of your [repository](https://prismic.io/docs/core-concepts/what-is-a-repo) in Prismic (required).

`routes`: A collection of routes for Prismic's [Route Resolver](https://prismic.io/docs/core-concepts/link-resolver-route-resolver).

`accessToken`: An access token for the Prismic API; required only when your repo is private.

`options`: Options for your Prismic API queries.

To configure previews, create the file `/src/routes/preview.js` and paste in the following code:

```js
import { createPreview } from 'prismic-svelte'
import prismicConfig from './../../prismic.config.js'

export async function get({ query, headers }) {
  return await createPreview(query, headers, prismicConfig.repoName)
}
```

## Usage

The plugin injects a `SliceZone` component and `prismic` object into components in the `src` folder as needed.

The `prismic` object includes a `client` method, which you can use to query the Prismic API. The `client` is already initialized with the `repoName` and options that you specified in `svelte.config.js`. You can also pass the `fetch` variable (available globally in Svelte, and provided as an argument in SvelteKit's load function) and the `session` variable. Passing the `session` variable is necessary for previews to work.

In a standard Svelte component:

```html
<!-- Standard .svelte component -->

<script>
  $: clientData = null

  const getData = async () => {
    clientData = await prismic.client(fetch).getAll()
  }

  getData()
</script>
```

In a SvelteKit project:

```html
<!-- In a SvelteKit project -->

<script context="module">
  export async function load({ fetch, session }) {
    const allDocs = await prismic.client(fetch, session).getAll()
    return { props: { allDocs } }
  }
</script>

<script>
  export let allDocs
</script>
```

The SliceZone accepts a `slices` prop and a `body` prop. Slices is an object of Slice components. `body` is an array of Slice contents.

```svelte
<SliceZone slices={slices} body={doc.data.body} />
```

The plugin exports the following properties and methods:

- `asText()`
- `asHTML()`
- `asLink()`
- `documentAsLink()`
- `asDate()`
- `setClientOptions()`
- `initClient()`
- `usePrismic()`

See prismic.io/docs for information on how to use these methods.
