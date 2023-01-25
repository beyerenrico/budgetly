import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { authSchema } from '$lib/utils/schema';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const session = await getServerSession(event);

	if (session) {
		throw redirect(303, '/');
	}
}

const OAUTH_PROVIDERS = ['google', 'github'];

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider');

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: 'Ungültiger Anbieter'
				});
			}

			const { data, error: err } = await locals.sb.auth.signInWithOAuth({
				provider
			});

			if (err) {
				return fail(500, {
					message: 'Serverfehler. Bitte versuchen Sie es später nochmal.'
				});
			}

			throw redirect(303, data.url);
		}

		const body = Object.fromEntries(await request.formData());

		const validate = authSchema.safeParse(body);

		if (!validate.success) {
			const errors = validate.error.errors.map((error) => {
				return {
					field: error.path[0],
					message: error.message
				};
			});

			return fail(400, { error: true, errors });
		}

		const { error: err } = await locals.sb.auth.signInWithPassword(validate.data);

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Ungültige Anmeldedaten'
				});
			}

			return fail(500, {
				error: 'Serverfehler. Bitte versuchen Sie es später nochmal.'
			});
		}

		throw redirect(303, '/');
	}
};
