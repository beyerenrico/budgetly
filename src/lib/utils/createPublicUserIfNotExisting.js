import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export async function createPublicUserIfNotExisting(userFromSession) {
	if (!userFromSession) {
		return false;
	}

	const user = await prisma.user.findUnique({
		where: { email: userFromSession.email }
	});

	if (!user) {
		try {
			await prisma.user.create({
				data: {
					id: userFromSession.id,
					email: userFromSession.email
				}
			});
		} catch (err) {
			return fail(500, {
				message: 'Serverfehler. Bitte versuchen Sie es später nochmal.'
			});
		}
	}

	return true;
}

export default createPublicUserIfNotExisting();
