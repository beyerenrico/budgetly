import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { prisma } from '$lib/server/prisma';
import { authSchema } from '$lib/utils/schema';

/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({ request, locals }) => {
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

		const { data, error: err } = await locals.sb.auth.signUp(validate.data);

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Ungültige E-Mail-Adresse oder Passwort'
				});
			}

			return fail(500, {
				error: 'Serverfehler. Bitte versuchen Sie es später nochmal.'
			});
		}

		const { user } = data;

		try {
			await prisma.user.create({
				data: {
					id: user.id,
					email: user.email
				}
			});
		} catch (err) {
			return fail(500, {
				message: 'Serverfehler. Bitte versuchen Sie es später nochmal.'
			});
		}

		throw redirect(303, '/register/success');
	}
};

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const session = await getServerSession(event);

	if (session) {
		throw redirect(303, '/');
	}
}
