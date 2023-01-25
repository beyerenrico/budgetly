import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { categorySchema } from '$lib/utils/schema';

/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	await parent();

	return {
		category: await prisma.category.findUnique({
			where: {
				id: params.id
			}
		})
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params, locals }) => {
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
			console.log('Error: ' + err);
			return fail(500, {
				message: 'Category could not be updated.'
			});
		}

		throw redirect(303, '/kategorien');
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
export async function load({ params }) {
	return {
		category: await prisma.category.findUnique({
			where: {
				id: params.id
			}
		})
	};
}
