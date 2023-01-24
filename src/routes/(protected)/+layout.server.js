import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const session = await getServerSession(event);

	if (!session) {
		throw redirect(303, '/register');
	}
}
