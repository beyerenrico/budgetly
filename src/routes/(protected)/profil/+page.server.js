import { changeEmailSchema, changePasswordSchema } from '$lib/utils/schema';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	return {
		currentEmail: locals.session.user.email,
		session: locals.session
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

			return fail(400, { error: true, errors });
		}

		const { error: err } = await locals.sb.auth.updateUser({ email: validate.data.email });

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
	},
	changePassword: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const validate = changePasswordSchema.safeParse(body);

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

		const { error: err } = await locals.sb.auth.updateUser({ password: validate.data.password });

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Ungültiges Passwort'
				});
			}

			return fail(500, {
				error: 'Serverfehler. Bitte versuchen Sie es später nochmal.'
			});
		}

		return {
			status: 201
		};
	},
	createAndVerifyChallenge: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { data, error: err } = await locals.sb.auth.mfa.challengeAndVerify({
			factorId: body.factorId,
			code: body.code
		});

		if (err) {
			fail(500, { message: err });
		}

		console.log(data);
	}
};
