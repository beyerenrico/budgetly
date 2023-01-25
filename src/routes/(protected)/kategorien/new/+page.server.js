import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { categorySchema } from '$lib/utils/schema';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	await parent();
}

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const validate = categorySchema.safeParse(body);

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

		try {
			await prisma.category.create({
				data: {
					title: body.title,
					description: body.description,
					userId: user.id
				}
			});
		} catch (err) {
			return fail(500, {
				message: 'Category could not be created.'
			});
		}

		throw redirect(303, '/kategorien');
	}
};
