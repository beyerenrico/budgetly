import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { itemSchema } from '$lib/utils/schema';

/** @type {import('./$types').PageLoad} */
export async function load({ locals, parent }) {
	await parent();

	const { user } = locals.session;

	return {
		months: await prisma.month.findMany(),
		categories: await prisma.category.findMany(),
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id }
		})
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request, locals }) => {
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

		const { user } = locals.session;

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
			await prisma.item.create({
				data: {
					title: body.title,
					description: body.description,
					budgetBookId: body.budgetBook,
					type: body.type,
					categoryId: body.category,
					userId: user.id,
					months: {
						create: months.map(({ id, value }) => ({
							value: parseFloat(body.type === 'EXPENSE' ? -value : value),
							rank: parseInt(ranks.filter((obj) => obj.id === id).map((obj) => obj.value)),
							monthId: id,
							budgetBookId: body.budgetBook
						}))
					}
				}
			});
		} catch (err) {
			console.log('Error: ' + err);
			return fail(500, {
				message: 'Item could not be created.'
			});
		}

		throw redirect(303, '/posten');
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const { user } = locals.session;

	return {
		months: await prisma.month.findMany(),
		categories: await prisma.category.findMany(),
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id }
		})
	};
}
