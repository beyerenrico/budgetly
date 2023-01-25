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
					toast.success('Kategorie wurde aktualisiert');
					await update();
					break;
				case 'failure':
					toast.error(result.data.message, {
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

	$: ({ category } = data);
</script>

<header>
	<hgroup>
		<h1 class="icon">Sie bearbeiten die Kategorie: {category.title}</h1>
		<h2>{category.description}</h2>
	</hgroup>
</header>
<nav aria-label="breadcrumb">
	<div class="container">
		<ul>
			<li>
				<a href="/">Startseite</a>
			</li>
			<li>
				<a href="/kategorien">Kategorien</a>
			</li>
			<li>{category.title}</li>
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
						required
						value={category.title}
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
						>{category.description}</textarea
					>
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
	header {
		text-align: center;
	}
</style>
