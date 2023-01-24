import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { budgetBookSchema } from '$lib/utils/schema';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const validate = budgetBookSchema.safeParse(body);

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
			await prisma.budgetBook.create({
				data: {
					title: body.title,
					description: body.description,
					year: Number(body.year),
					userId: user.id
				}
			});
		} catch (err) {
			console.log('Error: ' + err);
			return fail(500, {
				message: 'Budget Book could not be created.'
			});
		}

		throw redirect(303, '/haushaltsbuecher');
	}
};
