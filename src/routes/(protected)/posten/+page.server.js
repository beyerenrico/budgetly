import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const { user } = locals.session;

	return {
		months: await prisma.month.findMany(),
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id },
			include: {
				items: {
					include: {
						category: true,
						months: {
							orderBy: {
								rank: 'asc'
							},
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
