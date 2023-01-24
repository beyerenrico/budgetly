<script>
	import { Eye, Pencil } from 'tabler-icons-svelte';

	export let data;
	export let form;

	$: ({ budgetBooks } = data);
</script>

<header>
	<h1>Haushaltsbücher</h1>
	<a href="/haushaltsbuecher/new" role="button">Haushaltsbücher erstellen</a>
</header>
<nav aria-label="breadcrumb">
	<div class="container">
		<ul>
			<li>
				<a href="/">Startseite</a>
			</li>
			<li>Haushaltsbücher</li>
		</ul>
	</div>
</nav>
<main>
	<div class="container">
		<section>
			<form action="?/search" method="POST">
				<label for="searchHaushaltsbuecher">
					<input
						type="search"
						name="searchHaushaltsbuecher"
						id="searchHaushaltsbuecher"
						placeholder="Haushaltsbücher suchen..."
						value={form?.body.searchHaushaltsbuecher ?? ''}
					/>
				</label>
				<button type="submit">Suchen</button>
				{#if form?.body.searchHaushaltsbuecher}
					<small>Sie suchten nach: "{form?.body.searchHaushaltsbuecher}"</small>
				{/if}
			</form>
		</section>
		<section id="results">
			{#if form?.filteredHaushaltsbuecher}
				{#each form?.filteredHaushaltsbuecher as budgetBook}
					<h2 class="icon">
						{budgetBook.title}
						<a
							href="/haushaltsbuecher/{budgetBook.id}"
							data-tooltip="Haushaltsbuch aufrufen"
							role="button"
							class="small"
						>
							<Eye strokeWidth={1} />
						</a>
						<a
							href="/haushaltsbuecher/{budgetBook.id}/edit"
							data-tooltip="Haushaltsbuch bearbeiten"
							role="button"
							class="small secondary"
						>
							<Pencil strokeWidth={1} />
						</a>
					</h2>
				{:else}
					Es wurden bisher keine Haushaltsbücher erstellt
				{/each}
			{:else}
				{#each budgetBooks as budgetBook}
					<h2 class="icon">
						{budgetBook.title}
						<a
							href="/haushaltsbuecher/{budgetBook.id}"
							data-tooltip="Haushaltsbuch aufrufen"
							role="button"
							class="small"
						>
							<Eye strokeWidth={1} />
						</a>
						<a
							href="/haushaltsbuecher/{budgetBook.id}/edit"
							data-tooltip="Haushaltsbuch bearbeiten"
							role="button"
							class="small secondary"
						>
							<Pencil strokeWidth={1} />
						</a>
					</h2>
				{:else}
					Es wurden bisher keine Haushaltsbücher erstellt
				{/each}
			{/if}
		</section>
	</div>
</main>

<style lang="scss">
	header {
		text-align: center;
	}

	section {
		h2 {
			display: flex;
			margin-bottom: 1rem;
		}
	}
</style>
