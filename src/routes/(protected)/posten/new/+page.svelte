<script>
	import { ArrowUpRight } from 'tabler-icons-svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';

	export let data;
	export let form;

	let loading = false;
	let currentType = 'EXPENSE';

	const submitForm = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Posten wurde erstellt');
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

	const changeType = (event) => {
		const type = event.target.value;

		currentType = type;
	};

	$: ({ months, categories, budgetBooks } = data);
</script>

<header>
	<h1>Posten erstellen</h1>
</header>
<nav aria-label="breadcrumb">
	<div class="container">
		<ul>
			<li>
				<a href="/">Startseite</a>
			</li>
			<li>
				<a href="/posten">Posten</a>
			</li>
			<li>Neuer Posten</li>
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
						aria-busy={loading}
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
					<textarea name="description" id="description" cols="30" rows="5" aria-busy={loading} />
				</label>

				<label for="budgetBook"> Haushaltsbuch </label>
				<select
					name="budgetBook"
					id="budgetBook"
					aria-busy={loading}
					aria-invalid={form?.error ? true : ''}
				>
					<option value="">Haushaltsbuch auswählen</option>
					{#each budgetBooks as budgetBook}
						<option value={budgetBook.id} selected={$page.url.searchParams.get('budgetBook')}
							>{budgetBook.title}</option
						>
					{/each}
				</select>
				{#if form?.errors}
					{#each form.errors as error}
						{#if error.field === 'budgetBook'}
							<small class="danger">{error.message}</small>
						{/if}
					{/each}
				{/if}
				<div class="grid">
					<div>
						<label for="type"> Typ </label>
						<select
							name="type"
							id="type"
							aria-busy={loading}
							aria-invalid={form?.error ? true : ''}
							on:change={changeType}
						>
							<option value="">Typ auswählen</option>
							<option value="EXPENSE" selected>Ausgabe</option>
							<option value="INCOME">Einnahme</option>
						</select>
						{#if form?.errors}
							{#each form.errors as error}
								{#if error.field === 'type'}
									<small class="danger">{error.message}</small>
								{/if}
							{/each}
						{/if}
					</div>
					{#if currentType === 'EXPENSE'}
						<div>
							<label for="category"> Kategorie </label>
							<select
								name="category"
								id="category"
								aria-busy={loading}
								aria-invalid={form?.error ? true : ''}
							>
								<option value="">Kategorie auswählen</option>
								{#each categories as category}
									<option
										value={category.id}
										selected={$page.url.searchParams.get('category') === category.id}
										>{category.title}</option
									>
								{/each}
							</select>
							{#if form?.errors}
								{#each form.errors as error}
									{#if error.field === 'category'}
										<small class="danger">{error.message}</small>
									{/if}
								{/each}
							{/if}
							<small>
								<a href="/kategorien/new" target="_blank">
									Neue Kategorie erstellen
									<ArrowUpRight strokeWidth={1} />
								</a>
							</small>
						</div>
					{/if}
				</div>
				<fieldset>
					<legend>Monate</legend>

					<div class="grid">
						{#each months as month}
							<div>
								<input type="hidden" name="rank:{month.id}" value={month.rank} />
								<label for={month.id}>
									{month.title}
									<input
										type="number"
										step="0.01"
										name="months:{month.id}"
										id={month.id}
										placeholder="10"
										value="0"
										aria-busy={loading}
									/>
								</label>
							</div>
						{/each}
					</div>
				</fieldset>
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

	fieldset {
		.grid {
			grid-template-columns: 1fr;
			align-items: center;

			@media screen and (min-width: 768px) {
				grid-template-columns: repeat(3, 1fr);
			}

			div {
				margin-bottom: 1rem;
			}

			input[type='number'] {
				margin-bottom: 0;
			}
		}
	}
</style>
