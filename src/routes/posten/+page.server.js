import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const { user } = locals.session;

	return {
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id },
			include: {
				items: {
					include: {
						category: true,
						months: {
							include: {
								month: true
							}
						}
					}
				}
			}
		})
	};
}
