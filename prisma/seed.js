import { PrismaClient } from '@prisma/client';
import monthsJSON from './months.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
	for (let i = 0; i < monthsJSON.months.length; i++) {
		await prisma.month.upsert({
			where: {
				slug: monthsJSON.months[i].slug
			},
			update: {},
			create: {
				slug: monthsJSON.months[i].slug,
				title: monthsJSON.months[i].title,
				rank: monthsJSON.months[i].rank
			}
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
