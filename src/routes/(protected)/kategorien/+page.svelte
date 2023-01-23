<script>
	import { Pencil } from 'tabler-icons-svelte';

	export let data;

	$: ({ categories } = data);
</script>

<header>
	<h1>Kategorien</h1>
	<a href="/kategorien/new" role="button">Kategorie erstellen</a>
</header>
<nav aria-label="breadcrumb">
	<div class="container">
		<ul>
			<li>
				<a href="/">Startseite</a>
			</li>
			<li>Kategorien</li>
		</ul>
	</div>
</nav>
<main>
	<div class="container">
		<section>
			<form action="search">
				<label for="searchCategories">
					<input
						type="search"
						name="searchCategories"
						id="searchCategories"
						placeholder="Kategorien suchen..."
					/>
				</label>
				<button type="submit">Suchen</button>
			</form>
		</section>
		<section id="results">
			{#each categories as category}
				<h2 class="icon">
					{category.title}
					<a
						href="/kategorien/{category.id}/edit"
						data-tooltip="Kategorie bearbeiten"
						role="button"
						class="small"
					>
						<Pencil strokeWidth={1} />
					</a>
				</h2>
			{:else}
				Es wurden bisher keine Kategorien erstellt
			{/each}
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
