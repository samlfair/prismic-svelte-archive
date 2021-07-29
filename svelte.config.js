/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    package: {
      // This is bad. Must add TypeScript and re-enable emitTypes
      // https://kit.svelte.dev/docs#packaging
      emitTypes: false,
    },
  },
}

export default config
