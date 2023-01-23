<script>
	import { Trash } from 'tabler-icons-svelte';

	export let data;

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
						value={budgetBook.title}
					/>
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
					/>
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
</style>
