<script>
	import { Pencil } from 'tabler-icons-svelte';
</script>

<header>
	<hgroup>
		<h1>Haushaltsbücher</h1>
		<h2>Erstelle Kategorien für deine Posten</h2>
	</hgroup>
	<a href="/haushaltsbuecher/new" role="button">Haushaltsbücher erstellen</a>
</header>
<main>
	<div class="container">
		<section>
			<form action="search">
				<label for="searchHaushaltsbuecher">
					<input
						type="search"
						name="searchHaushaltsbuecher"
						id="searchHaushaltsbuecher"
						placeholder="Haushaltsbücher suchen..."
					/>
				</label>
				<button type="submit">Suchen</button>
			</form>
		</section>
		<section id="results">
			<h2 class="icon">
				<a href="/haushaltsbuecher/1"> Haushaltsbuch 2019 </a>
				<a
					href="/haushaltsbuecher/1/edit"
					data-tooltip="Haushaltsbuch bearbeiten"
					role="button"
					class="small"
				>
					<Pencil strokeWidth={1} />
				</a>
			</h2>
			<h2 class="icon">
				<a href="/haushaltsbuecher/2"> Haushaltsbuch 2020 </a>
				<a
					href="/haushaltsbuecher/2/edit"
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
