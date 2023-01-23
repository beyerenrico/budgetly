import { getServerSession } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	return {
		session: locals.session
	};
}
