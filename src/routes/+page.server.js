import { redirect } from '@sveltejs/kit';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load(event) {
	const { locals } = event;

	const serverSession = await getServerSession(event);

	if (!locals.session || !serverSession) {
		throw redirect(303, '/login');
	}

	const { user } = locals.session;

	return {
		categories: await prisma.category.findMany({
			where: { userId: user.id }
		}),
		items: await prisma.item.findMany({
			where: { userId: user.id },
			include: {
				budgetBook: true
			}
		}),
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id }
		})
	};
}
