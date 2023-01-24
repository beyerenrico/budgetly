import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	const { user } = locals.session;

	return {
		categories: await prisma.category.findMany({
			where: {
				userId: user.id
			}
		})
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	search: async ({ request, locals }) => {
		const { user } = locals.session;

		const body = Object.fromEntries(await request.formData());

		const filterSearch = body.searchCategories
			? { title: { contains: body.searchCategories, mode: 'insensitive' } }
			: {};

		return {
			body,
			filteredCategories: await prisma.category.findMany({
				where: {
					AND: [
						{
							userId: user.id
						},
						filterSearch
					]
				}
			})
		};
	}
};
