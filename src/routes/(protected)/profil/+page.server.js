import { changeEmailSchema } from '$lib/utils/schema';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	return {
		currentEmail: locals.session.user.email
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	changeEmail: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const validate = changeEmailSchema.safeParse(body);

		if (!validate.success) {
			const errors = validate.error.errors.map((error) => {
				return {
					field: error.path[0],
					message: error.message
				};
			});

			console.log(errors);

			return fail(400, { error: true, errors });
		}

		const { user, error: err } = await locals.sb.auth.updateUser(validate.data);

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Ungültige E-Mail-Adresse'
				});
			}

			return fail(500, {
				error: 'Serverfehler. Bitte versuchen Sie es später nochmal.'
			});
		}

		return {
			status: 201
		};
	}
};
