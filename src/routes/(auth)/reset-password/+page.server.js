import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const session = await getServerSession(event);

	if (session) {
		throw redirect(303, '/');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	resetPassword: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { data, error } = await locals.sb.auth.resetPasswordForEmail(body.email);

		console.log(data, error);

		return {
			status: 201
		};
	}
};
