import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const { user } = locals.session;

	return {
		categories: await prisma.category.findMany({
			where: {
				userId: user.id
			}
		})
	};
}
