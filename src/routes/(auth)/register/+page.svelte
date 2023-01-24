<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	let loading = false;
	let hasErrors = false;

	const submitRegister = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Benutzerkonto erstellt');
					await update();
					break;
				case 'failure':
					hasErrors = true;
					toast.error('Ungültige Daten', {
						duration: 6000
					});
					await update();
					break;
				case 'error':
					toast.error('Es ist ein Fehler aufgetreten');
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>

<main>
	<div class="container">
		<h1>Registrieren</h1>
		<form action="?/register" method="POST" use:enhance={submitRegister}>
			<label for="email">
				E-Mail-Adresse
				<input
					type="email"
					name="email"
					id="email"
					placeholder="max@mustermann.de"
					disabled={loading}
					aria-invalid={hasErrors ? true : ''}
				/>
			</label>
			<label for="password">
				Passwort
				<input
					type="password"
					name="password"
					id="password"
					placeholder="********"
					disabled={loading}
					aria-invalid={hasErrors ? true : ''}
				/>
			</label>
			<button type="submit" disabled={loading}>Benutzer erstellen</button>
			<small>
				<a href="/login"> Sie haben bereits einen Account? Jetzt anmelden! </a>
			</small>
		</form>
	</div>
</main>
