import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { budgetBookSchema } from '$lib/utils/schema';

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, locals, params }) => {
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
			await prisma.budgetBook.upsert({
				where: {
					id: params.id
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
					userId: user.id
				}
			});
		} catch (err) {
			console.log('Error: ' + err);
			return fail(500, {
				message: 'Budget Book could not be updated.'
			});
		}

		throw redirect(303, '/haushaltsbuecher');
	},
	delete: async ({ params }) => {
		try {
			await prisma.budgetBook.delete({
				where: {
					id: params.id
				}
			});
		} catch (err) {
			console.log('Error: ' + err);
			return fail(500, {
				message: 'Budget Book could not be deleted.'
			});
		}

		throw redirect(303, '/haushaltsbuecher');
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	return {
		budgetBook: await prisma.budgetBook.findUnique({
			where: {
				id: params.id
			}
		})
	};
}
