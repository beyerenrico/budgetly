import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { itemSchema } from '$lib/utils/schema';

/** @type {import('./$types').PageLoad} */
export async function load({ params, locals, parent }) {
	await parent();

	const { user } = locals.session;

	return {
		months: await prisma.month.findMany(),
		categories: await prisma.category.findMany(),
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id }
		}),
		item: await prisma.item.findUnique({
			where: {
				id: params.id
			},
			include: {
				budgetBook: true,
				category: true,
				months: true
			}
		})
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const body = Object.fromEntries(await request.formData());

		const validate = itemSchema.safeParse(body);

		if (!validate.success) {
			const errors = validate.error.errors.map((error) => {
				return {
					field: error.path[0],
					message: error.message
				};
			});

			return fail(400, { error: true, errors });
		}

		const months = Object.entries(body)
			.filter(([key]) => key.startsWith('months:'))
			.filter(([_, value]) => value)
			.map(([key, value]) => {
				const [_, id] = key.split(':');

				return { id, value };
			});

		const ranks = Object.entries(body)
			.filter(([key]) => key.startsWith('rank:'))
			.filter(([_, value]) => value)
			.map(([key, value]) => {
				const [_, id] = key.split(':');

				return { id, value };
			});

		try {
			await prisma.item.update({
				where: {
					id: params.id
				},
				data: {
					title: body.title,
					description: body.description,
					budgetBookId: body.budgetBook,
					type: body.type,
					categoryId: body.category,
					months: {
						upsert: months.map(({ id, value }) => ({
							where: {
								itemId_monthId: {
									itemId: params.id,
									monthId: id
								}
							},
							update: {
								value: parseFloat(body.type === 'EXPENSE' ? -value : value),
								rank: parseInt(ranks.filter((obj) => obj.id === id).map((obj) => obj.value))
							},
							create: {
								value: parseFloat(body.type === 'EXPENSE' ? -value : value),
								rank: parseInt(ranks.filter((obj) => obj.id === id).map((obj) => obj.value)),
								monthId: id,
								budgetBookId: body.budgetBook
							}
						}))
					}
				}
			});
		} catch (err) {
			return fail(500, {
				message: 'Item could not be updated.'
			});
		}

		throw redirect(303, '/posten');
	},
	delete: async ({ params }) => {
		try {
			await prisma.category.delete({
				where: {
					id: params.id
				}
			});
		} catch (err) {
			return fail(500, {
				message: 'Category could not be deleted.'
			});
		}

		throw redirect(303, '/kategorien');
	}
};
