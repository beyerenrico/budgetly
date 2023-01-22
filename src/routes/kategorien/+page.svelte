<script>
	import { Pencil } from 'tabler-icons-svelte';
</script>

<header>
	<hgroup>
		<h1>Kategorien</h1>
		<h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, impedit!</h2>
	</hgroup>
	<a href="/kategorien/new" role="button">Kategorie erstellen</a>
</header>
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
			<h2 class="icon">
				<a href="/kategorien/lebenshaltung/edit"> Lebenshaltung </a>
				<a
					href="/kategorien/lebenshaltung/edit"
					data-tooltip="Haushaltsbuch bearbeiten"
					role="button"
					class="small"
				>
					<Pencil strokeWidth={1} />
				</a>
			</h2>
			<h2 class="icon">
				<a href="/kategorien/sparen"> Sparen </a>
				<a
					href="/kategorien/sparen/edit"
					data-tooltip="Haushaltsbuch bearbeiten"
					role="button"
					class="small"
				>
					<Pencil strokeWidth={1} />
				</a>
			</h2>
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
