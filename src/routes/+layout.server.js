import { getServerSession } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	return {
		session: await getServerSession(event)
	};
}
