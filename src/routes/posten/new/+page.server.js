import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const months = Object.entries(body)
			.filter(([key]) => key.startsWith('months:'))
			.filter(([_, value]) => value)
			.map(([key, value]) => {
				const [_, id] = key.split(':');

				return {
					value: parseInt(value),
					month: {
						connect: { id }
					}
				};
			});

		try {
			await prisma.item.create({
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
						create: months
					}
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, {
				message: 'Category could not be created.'
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
