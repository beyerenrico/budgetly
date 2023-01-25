<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;

	let loading = false;
	let emailChangeSuccessful = false;

	const submitEmailChangeForm = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Bestätigungsemail wurde versendet');
					await update();
					break;
				case 'failure':
					console.log(result);
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

	let currentEmailInput;

	$: ({ currentEmail } = data);
	$: currentEmailInput = currentEmail;
</script>

<main>
	<div class="container">
		<h1>Profil</h1>
		<section>
			{#if emailChangeSuccessful}
				<div class="success">
					<p>Die E-Mail-Adresse wurde erfolgreich geändert.</p>
					<p>Bitte überprüfen Sie Ihr E-Mail-Postfach</p>
				</div>
			{:else}
				<form action="?/changeEmail" method="POST" use:enhance={submitEmailChangeForm}>
					<label for="email">
						E-Mail-Adresse
						<input
							type="email"
							name="email"
							id="email"
							bind:value={currentEmailInput}
							aria-busy={loading}
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
					<button type="submit" disabled={currentEmailInput === currentEmail} aria-busy={loading}
						>E-Mail-Adresse anpassen</button
					>
					<small>Sie erhalten anschließend eine Bestätigungsemail an die neue Adresse</small>
				</form>
			{/if}
		</section>
	</div>
</main>

<style>
</style>
