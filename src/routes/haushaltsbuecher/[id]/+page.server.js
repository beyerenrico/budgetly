import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	return {
		budgetBook: await prisma.budgetBook.findUnique({
			where: { id: params.id }
		}),
		months: await prisma.month.findMany(),
		categories: await prisma.category.findMany({
			include: {
				items: {
					where: {
						budgetBookId: params.id
					},
					include: {
						months: {
							orderBy: {
								rank: 'asc'
							}
						}
					}
				}
			}
		}),
		itemsInMonths: await prisma.itemsInMonths.groupBy({
			by: ['monthId', 'rank'],
			orderBy: {
				rank: 'asc'
			},
			where: {
				budgetBookId: params.id
			},
			_sum: {
				value: true
			}
		})
	};
}
