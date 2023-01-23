import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const { user } = locals.session;

		try {
			await prisma.category.upsert({
				where: {
					id: params.id
				},
				update: {
					title: body.title,
					description: body.description
				},
				create: {
					title: body.title,
					description: body.description,
					userId: user.id
				}
			});
		} catch (err) {
			console.log(err);
			return fail(500, {
				message: 'Category could not be updated.'
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
		category: await prisma.category.findUnique({
			where: {
				id: params.id
			}
		})
	};
}
