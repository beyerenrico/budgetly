import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const { locals } = event;

	const serverSession = await getServerSession(event);

	if (!locals.session || !serverSession) {
		throw redirect(303, '/login');
	}
}
