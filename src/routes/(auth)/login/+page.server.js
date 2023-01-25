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

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals }) => {
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
