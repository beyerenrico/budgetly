<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import FaFacebookF from 'svelte-icons/fa/FaFacebookF.svelte';
	import FaGoogle from 'svelte-icons/fa/FaGoogle.svelte';
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';

	export let form;

	let loading = false;

	const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Erfolgreich angemeldet');
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
		<h1>Anmelden</h1>
		<form action="?/login" method="POST" use:enhance={submitLogin}>
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
			<button type="submit" aria-busy={loading}>Anmelden</button>
			<small class="form-footer">
				<a href="/register"> Sie besitzen noch keinen Account? Jetzt registrieren! </a>
				<a href="/reset-password"> Passwort vergessen? </a>
			</small>
		</form>

		<hr />

		<form class="grid" method="POST">
			<div>
				<button
					formaction="?/login&provider=google"
					class="small icon"
					data-tooltip="Mit Google anmelden"
				>
					<FaGoogle />
				</button>
			</div>
			<div>
				<button
					formaction="?/login&provider=github"
					class="small icon"
					data-tooltip="Mit Github anmelden"
				>
					<FaGithub />
				</button>
			</div>
		</form>
	</div>
</main>

<style lang="scss">
	.form-footer {
		display: flex;
		justify-content: space-between;
	}

	hr {
		margin: 2rem 0;
	}

	.icon {
		height: 42px;
	}

	.container {
		max-width: 600px;
	}
</style>
