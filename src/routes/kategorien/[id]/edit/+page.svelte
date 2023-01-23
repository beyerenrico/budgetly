<script>
	import { Trash } from 'tabler-icons-svelte';

	export let data;

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
		<form action="?/update" method="POST">
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
					/>
				</label>
				<label for="description">
					Beschreibung
					<textarea name="description" id="description" cols="30" rows="5"
						>{category.description}</textarea
					>
				</label>
				<button type="submit">Aktualisieren</button>
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
