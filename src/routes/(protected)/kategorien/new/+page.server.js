import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

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
			console.log('Error: ' + err);
			return fail(500, {
				message: 'Category could not be created.'
			});
		}

		throw redirect(303, '/kategorien');
	}
};
