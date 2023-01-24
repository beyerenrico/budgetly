import { fail, redirect } from '@sveltejs/kit';
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
								value: parseFloat(value),
								rank: parseInt(ranks.filter((obj) => obj.id === id).map((obj) => obj.value))
							},
							create: {
								value: parseFloat(value),
								rank: parseInt(ranks.filter((obj) => obj.id === id).map((obj) => obj.value)),
								monthId: id,
								budgetBookId: body.budgetBook
							}
						}))
					}
				}
			});
		} catch (err) {
			console.log('Error: ' + err);
			return fail(500, {
				message: 'Item could not be updated.'
			});
		}

		return {
			status: 201
		};
	},
	delete: async ({ params }) => {
		try {
			await prisma.category.delete({
				where: {
					id: params.id
				}
			});
		} catch (err) {
			console.log('Error: ' + err);
			return fail(500, {
				message: 'Category could not be deleted.'
			});
		}

		throw redirect(303, '/kategorien');
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
