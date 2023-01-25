<script>
	import countdownTimer from '$lib/utils/countDown.js';
	import { factorStore } from '$lib/utils/factorStore.js';
	import { enhance } from '$app/forms';
	import { supabaseClient } from '$lib/supabase.js';
	import { fail } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';

	const OAUTH_PROVIDERS = ['google', 'github'];

	export let data;
	export let form;

	let factorLoading = false;
	let emailLoading = false;
	let passwordLoading = false;
	let emailChangeSuccessful = false;
	let passwordChangeSuccessful = false;

	let currentEmailInput;
	let currentEmailConfirmInput;
	let currentPasswordInput;
	let currentPasswordConfirmInput;
	let userMetadata;
	let appMetadata;

	let challengeCreated = false;
	let challengeData;
	let code;

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

	const enrollFactor = async ({ cancel }) => {
		cancel();

		const { data, error: err } = await supabaseClient.auth.mfa.enroll({
			factorType: 'totp'
		});

		if (err) {
			toast.error(err.toString(), {
				duration: 12000
			});
			return fail(500, { message: err });
		}

		$factorStore = data;
	};

	const createChallenge = async () => {
		const { data, error: err } = await supabaseClient.auth.mfa.challenge({
			factorId: $factorStore.id
		});

		if (err) {
			console.error(err);
		}

		challengeCreated = true;
		challengeData = data;
	};

	const verifyChallenge = async ({ cancel }) => {
		cancel();

		const { data, error: err } = await supabaseClient.auth.mfa.verify({
			factorId: $factorStore.id,
			challengeId: challengeData.id,
			code: code.toString()
		});

		if (err) {
			// toast.error(err.toString(), {
			// 	duration: 12000
			// });
			fail(500, { message: err });
		}

		console.log(data);
	};

	$: ({ currentEmail, session } = data);
	$: userMetadata = session?.user?.user_metadata;
	$: appMetadata = session?.user?.app_metadata;
</script>

<header>
	<h1>Profil</h1>
</header>
<main>
	<div class="container">
		{#if OAUTH_PROVIDERS.includes(appMetadata.provider)}
			<section id={userMetadata.provider_id}>
				<h2>
					Nutzerinformationen ({appMetadata.provider.charAt(0).toUpperCase() +
						appMetadata.provider.slice(1)})
				</h2>
				<div class="grid">
					<div>
						<img
							height="150px"
							width="150px"
							src={userMetadata.avatar_url}
							alt={userMetadata.name}
							class="round"
						/>
					</div>
					<ul>
						<li>Vollständiger Name: {userMetadata.full_name}</li>
						<li>E-Mail-Adresse: {userMetadata.email}</li>
						{#if userMetadata.user_name}
							<li>Nutzername: {userMetadata.user_name}</li>
						{/if}
					</ul>
				</div>
			</section>
		{/if}
		<section>
			<h2>Multi-Faktor-Authentifizierung</h2>
			<form action="/profil" method="POST" use:enhance={enrollFactor}>
				<button type="submit" aria-busy={!!$factorStore} disabled={!!$factorStore}
					>{!!$factorStore ? 'Vorgang läuft' : 'Multi-Faktor-Authentifizierung hinzufügen'}</button
				>
			</form>

			{#if $factorStore}
				{#if $factorStore.totp && !challengeCreated}
					<div class="grid">
						<div>
							<img
								src={$factorStore.totp.qr_code}
								alt={$factorStore.totp.uri}
								style="background-color: #fff; width: 100%;"
							/>
						</div>
						<div>
							<article style="display: block; margin-bottom: 1rem;">
								<p>
									Scannen Sie den QR-Code mit Ihrer Authentifizierungs-App oder geben Sie den unten
									stehenden Geheimschlüssel ein:
								</p>
								<p>
									<strong>{$factorStore.totp.secret}</strong>
								</p>
								<p>
									<strong>WICHTIG:</strong> Bitte notieren Sie sich den Geheimschlüssel, da Sie ihn gegebenenfalls
									erneut benötigen, wenn Sie Ihr Gerät wechseln.
								</p>
							</article>
							<p>
								Fahren Sie fort, wenn Sie die Authentifizierung in Ihrer App eingerichtet haben.
							</p>
							<button on:click={() => (challengeCreated = true)}>Weiter</button>
						</div>
					</div>
				{/if}
			{/if}

			{#if challengeCreated}
				<article style="display: block; padding-top: 2rem; padding-bottom: 1rem;">
					<form action="?/createAndVerifyChallenge" method="POST">
						<p>Geben Sie anschließend den generierten Code aus der Authentifizierungsapp ein</p>
						<label for="code">
							Code
							<input type="number" name="code" id="code" />
							<input type="hidden" name="factorId" id="factorId" value={$factorStore.id} />
						</label>
						<button type="submit">Verifizierung abschließen</button>
					</form>
				</article>
			{/if}

			{#if appMetadata.mfa}
				<div class="grid">
					<div>
						<h3>Aktive Faktoren</h3>
						<ul>
							{#each appMetadata.mfa as factor}
								<li>
									{factor.type} ({factor.created_at})
									<form
										action="?/deleteFactor"
										method="POST"
										on:submit|preventDefault={() => {
											factorLoading = true;
										}}
									>
										<input type="hidden" name="factor_id" value={factor.id} />
										<button type="submit" disabled={factorLoading}> Entfernen </button>
									</form>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}
		</section>
		{#if appMetadata.providers.includes('email')}
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
								<small
									>Sie erhalten anschließend Bestätigungsemails an je Ihre alte und neue Adresse</small
								>
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
							</form>
						{/if}
					</section>
				</div>
			</div>
		{/if}
	</div>
</main>

<style lang="scss">
</style>
