import { getServerSession } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const serverSession = await getServerSession(event);

	return {
		session: serverSession
	};
}
