<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	let loading = false;

	const submitPasswordReset = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Bestätigungsemail wurde versendet');
					await update();
					break;
				case 'failure':
					toast.error('Überprüfen Sie bitte die Eingabewerte', {
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

<header>
	<h1>Passwort zurücksetzen</h1>
</header>
<main>
	<div class="container">
		<form action="?/resetPassword" method="POST" use:enhance={submitPasswordReset}>
			<h2>Bitte geben Sie Ihre E-Mail-Adresse an</h2>
			<label for="email">
				E-Mail-Adresse
				<input type="email" name="email" id="email" placeholder="max.mustermann@gmx.de" />
				<button type="submit">Senden</button>
			</label>
		</form>
	</div>
</main>

<style>
	header {
		text-align: center;
	}
</style>
