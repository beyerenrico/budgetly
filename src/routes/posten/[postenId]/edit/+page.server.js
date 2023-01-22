import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const body = Object.fromEntries(await request.formData());

		const months = Object.entries(body)
			.filter(([key]) => key.startsWith('months:'))
			.filter(([_, value]) => value)
			.map(([key, value]) => {
				const [_, id] = key.split(':');

				return { id, value };
			});

		try {
			await prisma.item.update({
				where: {
					id: params.postenId
				},
				data: {
					title: body.title,
					description: body.description,
					budgetBook: {
						connect: { id: body.budgetBook }
					},
					type: body.type,
					category: {
						connect: { id: body.category }
					},
					months: {
						upsert: months.map(({ id, value }) => ({
							where: {
								itemId_monthId: {
									itemId: params.postenId,
									monthId: id
								}
							},
							update: {
								value: parseInt(value)
							},
							create: {
								value: parseInt(value),
								month: {
									connect: {
										id
									}
								}
							}
						}))
					}
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, {
				message: 'Item could not be updated.'
			});
		}

		return {
			status: 201
		};
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals }) {
	const { user } = locals.session;

	return {
		months: await prisma.month.findMany(),
		categories: await prisma.category.findMany(),
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id }
		}),
		item: await prisma.item.findUnique({
			where: {
				id: params.postenId
			},
			include: {
				budgetBook: true,
				category: true,
				months: true
			}
		})
	};
}
