<script>
	import { Trash } from 'tabler-icons-svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;

	let loading = false;

	const submitForm = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Haushaltsbuch wurde aktualisiert');
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

	$: ({ budgetBook } = data);
</script>

<header>
	<div class="container">
		<hgroup>
			<h1>Sie bearbeiten: {budgetBook.title}</h1>
			<h2>{budgetBook.description}</h2>
		</hgroup>
	</div>
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
			<li>
				<a href="/haushaltsbuecher/{budgetBook.id}">{budgetBook.title}</a>
			</li>
			<li>Bearbeiten</li>
		</ul>
	</div>
</nav>
<main>
	<div class="container-fluid">
		<form action="?/update" method="POST" use:enhance={submitForm}>
			<div class="container">
				<label for="title">
					Titel
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Titel"
						value={budgetBook.title}
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
					<textarea name="description" id="description" cols="30" rows="5"
						>{budgetBook.description}</textarea
					>
				</label>
				<label for="year">
					Jahr
					<input
						type="number"
						name="year"
						id="year"
						placeholder={new Date().getFullYear()}
						value={budgetBook.year}
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
				<button type="submit" aria-busy={loading}>Aktualisieren</button>
			</div>
		</form>
		<form action="?/delete" method="POST">
			<div class="container">
				<button type="submit" class="outline danger" data-tooltip="Löschen">
					<Trash strokeWidth={1} />
				</button>
			</div>
		</form>
	</div>
</main>

<style lang="scss">
</style>
