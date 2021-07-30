# `prismic-svelte`

**WARNING: This project is in early development. See issues and planning on [the GitHub repo](https://github.com/samlfair/prismic-svelte).**

A set of helpers for developing Prismic projects with Svelte.

## To do

- [ ] Add HTML Serializer to config (and asHTML)
- [ ] Add Slices to config
- [ ] Create a SliceZone component
- [ ] Handle the API options
- [ ] Add TypeScript and re-enable `config.kit.emitTypes`

Do we want to add an Image component?

## Installation

To add `prismic-svelte`, first install:

```bash
npm i prismic-svelte@alpha
```

In `svelte.config.js`, import the plugin and add it to Svelte's preprocessor. Update the repo name.

```js
import { usePrismic } from 'prismic-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
  },
  preprocess: [usePrismic({ repoName: 'your-repo-name' })],
}
```

Fill in the config options. Only `repoName` is required.

`repoName`: The name of your [repository](https://prismic.io/docs/core-concepts/what-is-a-repo) in Prismic (required).

`routes`: A collection of routes for Prismic's [Route Resolver](https://prismic.io/docs/core-concepts/link-resolver-route-resolver).

`accessToken`: An access token for the Prismic API; required only when your repo is private.

`options`: Options for your Prismic API queries.

## Usage

The plugin injects a `SliceZone` component and `prismic` object into your app as needed.

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

The plugin exports the following properties and methods:

- `asText()`
- `asHTML()`
- `asLink()`
- `asDate()`
- `Client()`
- `usePrismic()`

See prismic.io/docs for information on how to use these methods.
