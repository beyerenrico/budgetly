<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	export let form;

	let loading = false;

	const submitForm = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Haushaltsbuch wurde erstellt');
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
	<h1>Haushaltsbuch erstellen</h1>
</header>
<nav aria-label="breadcrumb">
	<div class="container">
		<ul>
			<li>
				<a href="/">Startseite</a>
			</li>
			<li>
				<a href="/haushaltsbuecher">Haushaltsbücher</a>
			</li>
			<li>Neues Haushaltsbuch</li>
		</ul>
	</div>
</nav>
<main>
	<div class="container-fluid">
		<form action="?/create" method="POST" use:enhance={submitForm}>
			<div class="container">
				<label for="title">
					Titel
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Titel"
						aria-invalid={form?.error ? true : ''}
					/>
					{#if form?.errors}
						{#each form.errors as error}
							{#if error.field === 'title'}
								<small class="danger">{error.message}</small>
							{/if}
						{/each}
					{/if}
				</label>
				<label for="description">
					Beschreibung
					<textarea name="description" id="description" cols="30" rows="5" />
				</label>
				<label for="year">
					Jahr
					<input
						type="number"
						name="year"
						id="year"
						placeholder={new Date().getFullYear()}
						aria-invalid={form?.error ? true : ''}
					/>
					{#if form?.errors}
						{#each form.errors as error}
							{#if error.field === 'year'}
								<small class="danger">{error.message}</small>
							{/if}
						{/each}
					{/if}
				</label>
				<button type="submit" aria-busy={loading}>Erstellen</button>
			</div>
		</form>
	</div>
</main>

<style lang="scss">
	header {
		text-align: center;

		h1 {
			margin-top: 2rem;
		}
	}
</style>
