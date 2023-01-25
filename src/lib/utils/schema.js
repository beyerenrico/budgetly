import { z } from 'zod';

export const authSchema = z.object({
	email: z.string().email({ message: 'Ungültige E-Mail-Adresse' }),
	password: z.string().min(1, { message: 'Passwort erforderlich' })
});

export const changeEmailSchema = z
	.object({
		email: z.string().email({ message: 'Ungültige E-Mail-Adresse' }),
		confirm_email: z.string().email({ message: 'Ungültige E-Mail-Adresse' })
	})
	.superRefine(({ email, confirm_email }, ctx) => {
		if (email !== confirm_email) {
			ctx.addIssue({
				code: 'mismatch',
				message: 'E-Mail-Adressen stimmen nicht überein',
				path: ['confirm_email']
			});
		}
	});

export const changePasswordSchema = z
	.object({
		password: z.string().min(1, { message: 'Passwort erforderlich' }),
		confirm_password: z.string().min(1, { message: 'Passwort erforderlich' })
	})
	.superRefine(({ password, confirm_password }, ctx) => {
		if (password !== confirm_password) {
			ctx.addIssue({
				code: 'mismatch',
				message: 'Passwörter stimmen nicht überein',
				path: ['confirm_password']
			});
		}
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
