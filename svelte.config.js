// svelte.config.js
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';

/**
 * This will add autocompletion if you're working with SvelteKit
 *
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: preprocess({
		// ...svelte-preprocess options
	})
	// ...other svelte options
};

export default config;
