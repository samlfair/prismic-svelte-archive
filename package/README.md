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
npm i prismic-svelte
```

Then, create `/src/lib/prismic.js`, and paste in the following code:

```js
import createPrismicSvelte from 'prismic-svelte'

const config = {
  // Fill in your repo name (required)
  repoName: 'prismicio-docs-v3',

  // Define a route for each Custom Type
  routes: [
    {
      type: 'homepage',
      path: '/',
    },
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
  options: null,
}

const Prismic = createPrismicSvelte(config)

export const { repoName, endpoint, Client, asText, asHTML, asLink, asDate } =
  Prismic

export default Prismic
```

Fill in the config options. Only `repoName` is required.

`repoName`: The name of your [repository](https://prismic.io/docs/core-concepts/what-is-a-repo) in Prismic (required).

`routes`: A collection of routes for Prismic's [Route Resolver](https://prismic.io/docs/core-concepts/link-resolver-route-resolver).

`accessToken`: An access token for the Prismic API; required only when your repo is private.

`options`: Options for your Prismic API queries.

## Usage

In Svelte projects, use a relative path to import the Prismic helpers:

```html
<!-- Standard .svelte component -->

<script>
  import Prismic from './lib/prismic'
</script>
```

In SvelteKit, use the `$` alias:

```html
<!-- In a SvelteKit project -->

<script>
  import Prismic from '$lib/prismic'
</script>
```

The plugin exports the following properties and methods:

- `repoName`
- `endpoint`
- `asText()`
- `asHTML()`
- `asLink()`
- `asDate()`
- `Client()`
- `Client().get()`
- `Client().getFirst()`
- `Client().getAll()`
- `Client().getByID()`
- `Client().getByIDs()`
- `Client().getAllByIDs()`
- `Client().getByUID()`
- `Client().getSingle()`
- `Client().getByType()`
- `Client().getAllByType()`
- `Client().getByTag()`
- `Client().getAllByTag()`
- `Client().getByTags()`
- `Client().getAllByTags()`
- ...

See prismic.io/docs for information on how to use these methods.
