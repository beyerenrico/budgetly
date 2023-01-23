import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	if (!locals.session) {
		throw redirect(303, '/login');
	}

	const { user } = locals.session;

	return {
		categories: await prisma.category.findMany(),
		items: await prisma.item.findMany({
			where: { userId: user.id }
		}),
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id }
		})
	};
}
