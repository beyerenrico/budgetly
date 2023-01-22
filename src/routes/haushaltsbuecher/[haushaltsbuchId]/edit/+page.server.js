import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, locals, params }) => {
		const body = Object.fromEntries(await request.formData());

		const { user } = locals.session;

		try {
			await prisma.budgetBook.upsert({
				where: {
					id: params.haushaltsbuchId
				},
				update: {
					title: body.title,
					description: body.description,
					year: Number(body.year)
				},
				create: {
					title: body.title,
					description: body.description,
					year: Number(body.year),
					user: {
						connect: {
							id: user.id
						}
					}
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, {
				message: 'Budget Book could not be updated.'
			});
		}

		return {
			status: 201
		};
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	return {
		budgetBook: await prisma.budgetBook.findUnique({
			where: {
				id: params.haushaltsbuchId
			}
		})
	};
}
