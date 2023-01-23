<script>
	import { Trash } from 'tabler-icons-svelte';

	export let data;

	$: ({ category } = data);
</script>

<header>
	<hgroup>
		<h1 class="icon">Sie bearbeiten die Kategorie: {category.title}</h1>
		<h2>Lorem ipsum dolor sit amet</h2>
	</hgroup>
</header>
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
				<p>
					<button type="submit">Aktualisieren</button>
					<button class="outline danger" data-tooltip="Löschen">
						<Trash strokeWidth={1} />
					</button>
				</p>
			</div>
		</form>
	</div>
</main>

<style lang="scss">
	header {
		text-align: center;
	}

	form {
		p {
			display: grid;
			grid-template-columns: auto 70px;
			align-items: center;
			gap: 1rem;
		}

		button {
			margin-bottom: 0;
		}
	}
</style>
