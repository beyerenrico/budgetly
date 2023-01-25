<script>
	import { enhance } from '$app/forms';
	import { supabaseClient } from '$lib/supabase.js';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;

	let emailLoading = false;
	let passwordLoading = false;
	let emailChangeSuccessful = false;
	let passwordChangeSuccessful = false;

	const submitEmailChangeForm = () => {
		emailLoading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
				case 'success':
					toast.success('Bestätigungsemail wurde versendet');
					await update();
					await submitLogout();
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

			emailLoading = false;
		};
	};

	const submitPasswordChangeForm = () => {
		passwordLoading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
				case 'success':
					toast.success('Passwort wurde erfolgreich geändert', {
						duration: 12000
					});
					await update();
					await submitLogout();
					break;
				case 'failure':
					toast.error('Überprüfen Sie bitte die Eingabewerte', {
						duration: 12000
					});
					await update();
					break;
				case 'error':
					toast.error('Es ist ein Fehler aufgetreten');
					break;
				default:
					await update();
			}

			passwordLoading = false;
		};
	};

	const submitLogout = async () => {
		const { error } = await supabaseClient.auth.signOut();

		if (error) {
			toast.success('Es ist ein Fehler aufgetreten', {
				duration: 12000
			});
		}

		toast.success('Daten wurden erfolgreich aktualisiert, bitte melden Sie sich erneut an', {
			duration: 12000
		});
	};

	let currentEmailInput;
	let currentEmailConfirmInput;
	let currentPasswordInput;
	let currentPasswordConfirmInput;

	$: ({ currentEmail } = data);
</script>

<header>
	<h1>Profil</h1>
</header>
<main>
	<div class="container">
		<div class="grid">
			<div>
				<section>
					<h2>E-Mail-Adresse ändern</h2>

					{#if emailChangeSuccessful}
						<div class="success">
							<p>Ihre E-Mail-Adresse wurde erfolgreich geändert.</p>
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
									placeholder={currentEmail}
									aria-busy={emailLoading}
									aria-invalid={form?.error ? true : ''}
									bind:value={currentEmailInput}
								/>
								{#if form?.errors}
									{#each form.errors as error}
										{#if error.field === 'email'}
											<small class="danger">{error.message}</small>
										{/if}
									{/each}
								{/if}
							</label>
							<label for="confirm_email">
								E-Mail-Adresse bestätigen
								<input
									type="email"
									name="confirm_email"
									id="confirm_email"
									placeholder={currentEmail}
									aria-busy={emailLoading}
									aria-invalid={form?.error ? true : ''}
									bind:value={currentEmailConfirmInput}
								/>
								{#if form?.errors}
									{#each form.errors as error}
										{#if error.field === 'email'}
											<small class="danger">{error.message}</small>
										{/if}
									{/each}
								{/if}
							</label>
							<button
								type="submit"
								disabled={currentEmailInput === currentEmail ||
									(!currentEmailInput && currentEmailConfirmInput === currentEmail) ||
									!currentEmailConfirmInput}
								aria-busy={emailLoading}>E-Mail-Adresse ändern</button
							>
							<small>Sie erhalten anschließend eine Bestätigungsemail an die neue Adresse</small>
						</form>
					{/if}
				</section>
			</div>
			<div>
				<section>
					<h2>Passwort ändern</h2>

					{#if passwordChangeSuccessful}
						<div class="success">
							<p>Ihr Passwort wurde erfolgreich geändert.</p>
							<p>Bitte überprüfen Sie Ihr E-Mail-Postfach</p>
						</div>
					{:else}
						<form action="?/changePassword" method="POST" use:enhance={submitPasswordChangeForm}>
							<label for="password">
								Passwort
								<input
									type="password"
									name="password"
									id="password"
									placeholder="Neues Passwort"
									aria-busy={passwordLoading}
									aria-invalid={form?.error ? true : ''}
									bind:value={currentPasswordInput}
								/>
								{#if form?.errors}
									{#each form.errors as error}
										{#if error.field === 'password'}
											<small class="danger">{error.message}</small>
										{/if}
									{/each}
								{/if}
							</label>
							<label for="confirm_password">
								Passwort bestätigen
								<input
									type="password"
									name="confirm_password"
									id="confirm_password"
									placeholder="Neues Passwort"
									aria-busy={passwordLoading}
									aria-invalid={form?.error ? true : ''}
									bind:value={currentPasswordConfirmInput}
								/>
								{#if form?.errors}
									{#each form.errors as error}
										{#if error.field === 'confirm_password'}
											<small class="danger">{error.message}</small>
										{/if}
									{/each}
								{/if}
							</label>
							<button
								type="submit"
								disabled={!(!!currentPasswordInput && !!currentPasswordConfirmInput)}
								>Passwort ändern</button
							>
							<small>Sie erhalten anschließend eine Bestätigungsemail an Ihre E-Mail-Adresse</small>
						</form>
					{/if}
				</section>
			</div>
		</div>
	</div>
</main>

<style>
	header {
		text-align: center;
	}
</style>
