<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	export let form;

	let loading = false;

	const submitRegister = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Benutzerkonto erstellt');
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
					aria-invalid={form?.error ? true : ''}
				/>
				{#if form?.errors}
					{#each form.errors as error}
						{#if error.field === 'email'}
							<small class="danger">{error.message}</small>
						{/if}
					{/each}
				{/if}
			</label>
			<label for="password">
				Passwort
				<input
					type="password"
					name="password"
					id="password"
					placeholder="********"
					disabled={loading}
					aria-invalid={form?.error ? true : ''}
				/>
				{#if form?.errors}
					{#each form.errors as error}
						{#if error.field === 'password'}
							<small class="danger">{error.message}</small>
						{/if}
					{/each}
				{/if}
			</label>
			<button type="submit" aria-busy={loading}>Benutzer erstellen</button>
			<small>
				<a href="/login"> Sie haben bereits einen Account? Jetzt anmelden! </a>
			</small>
		</form>
	</div>
</main>
