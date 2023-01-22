import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { prisma } from '../../lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { data, error: err } = await locals.sb.auth.signUp({
			email: body.email,
			password: body.password
		});

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

		console.log(user);

		try {
			await prisma.user.create({
				data: {
					id: user.id,
					email: user.email
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, {
				message: 'User could not be created.'
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
