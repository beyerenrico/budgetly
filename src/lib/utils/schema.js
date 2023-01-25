import { z } from 'zod';

export const authSchema = z.object({
	email: z.string().email({ message: 'Ungültige E-Mail-Adresse' }),
	password: z.string().min(1, { message: 'Passwort erforderlich' })
});

export const changeEmailSchema = z.object({
	email: z.string().email({ message: 'Ungültige E-Mail-Adresse' })
});

export const budgetBookSchema = z.object({
	title: z.string().min(1, { message: 'Titel erforderlich' }),
	year: z.string().min(1, { message: 'Jahr erforderlich' })
});

export const categorySchema = z.object({
	title: z.string().min(1, { message: 'Titel erforderlich' })
});

export const itemSchema = z.object({
	title: z.string().min(1, { message: 'Titel erforderlich' }),
	budgetBook: z.string().min(1, { message: 'Haushaltsbuch erforderlich' }),
	type: z.string().min(1, { message: 'Typ erforderlich' })
});
