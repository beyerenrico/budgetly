import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await prisma.category.upsert({
				where: {
					id: params.kategorieSlug
				},
				update: {
					title: body.title,
					description: body.description
				},
				create: {
					title: body.title,
					description: body.description
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
				id: params.kategorieSlug
			}
		})
	};
}
