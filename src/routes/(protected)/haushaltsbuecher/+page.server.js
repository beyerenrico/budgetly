import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load({ locals, parent }) {
	await parent();

	const { user } = locals.session;

	return {
		budgetBooks: await prisma.budgetBook.findMany({
			where: { userId: user.id }
		})
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	search: async ({ request, locals }) => {
		const { user } = locals.session;

		const body = Object.fromEntries(await request.formData());

		const filterHaushaltsbuecher = body.searchHaushaltsbuecher
			? { title: { contains: body.searchHaushaltsbuecher, mode: 'insensitive' } }
			: {};

		return {
			body,
			filteredHaushaltsbuecher: await prisma.budgetBook.findMany({
				where: {
					AND: [
						{
							userId: user.id
						},
						filterHaushaltsbuecher
					]
				}
			})
		};
	}
};
