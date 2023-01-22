import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		categories: await prisma.category.findMany()
	};
}
