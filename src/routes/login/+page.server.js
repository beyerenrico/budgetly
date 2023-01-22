import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { data, error: err } = await locals.sb.auth.signInWithPassword({
			email: body.email,
			password: body.password
		});

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

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const session = await getServerSession(event);

	if (session) {
		throw redirect(303, '/');
	}
}
