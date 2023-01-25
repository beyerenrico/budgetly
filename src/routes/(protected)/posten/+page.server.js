import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load({ locals, parent }) {
	await parent();

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

/** @type {import('./$types').Actions} */
export const actions = {
	search: async ({ request, locals }) => {
		const { user } = locals.session;

		const body = Object.fromEntries(await request.formData());

		const filterBudgetBooksWhereClause = body.budgetBook ? { id: body.budgetBook } : {};
		const filterSearch = body.searchPosten
			? { title: { contains: body.searchPosten, mode: 'insensitive' } }
			: {};

		return {
			body,
			filteredBudgetBooks: await prisma.budgetBook.findMany({
				where: {
					AND: [
						{
							userId: user.id
						},
						filterBudgetBooksWhereClause
					]
				},
				include: {
					items: {
						where: filterSearch,
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
};
