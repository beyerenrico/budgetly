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

<main>
	<div class="container">
		<h1>Passwort zurücksetzen</h1>
		<form action="?/resetPassword" method="POST" use:enhance={submitPasswordReset}>
			<label for="email">
				E-Mail-Adresse
				<input type="email" name="email" id="email" placeholder="max.mustermann@gmx.de" />
				<button type="submit">Senden</button>
			</label>
		</form>
	</div>
</main>

<style>
	.container {
		max-width: 600px;
	}
</style>
