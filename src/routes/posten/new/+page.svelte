<script>
	import { ArrowUpRight, Trash } from 'tabler-icons-svelte';

	export let data;

	$: ({ months, categories, budgetBooks } = data);
</script>

<header>
	<hgroup>
		<h1 class="icon">Posten erstellen</h1>
		<h2>Lorem ipsum dolor sit amet</h2>
	</hgroup>
</header>
<main>
	<div class="container-fluid">
		<form action="?/create" method="POST">
			<div class="container">
				<label for="title">
					Titel
					<input type="text" id="title" name="title" placeholder="Titel" required />
				</label>
				<label for="description">
					Beschreibung
					<textarea name="description" id="description" cols="30" rows="5" />
				</label>

				<label for="budgetBook"> Haushaltsbuch </label>
				<select name="budgetBook" id="budgetBook">
					<option value="">Haushaltsbuch auswählen</option>
					{#each budgetBooks as budgetBook}
						<option value={budgetBook.id}>{budgetBook.title}</option>
					{/each}
				</select>
				<div class="grid">
					<div>
						<label for="type"> Typ </label>
						<select name="type" id="type">
							<option value="">Typ auswählen</option>
							<option value="EXPENSE" selected>Ausgabe</option>
							<option value="INCOME">Einnahme</option>
						</select>
					</div>
					<div>
						<label for="category"> Kategorie </label>
						<select name="category" id="category">
							<option value="">Kategorie auswählen</option>
							{#each categories as category}
								<option value={category.id}>{category.title}</option>
							{/each}
						</select>
						<small>
							<a href="/kategorien/new" target="_blank">
								Neue Kategorie erstellen
								<ArrowUpRight strokeWidth={1} />
							</a>
						</small>
					</div>
				</div>
				<fieldset>
					<legend>Monate</legend>

					<div class="grid">
						{#each months as month}
							<div>
								<label for={month.id}>
									{month.title}
									<input
										type="number"
										name={`months:${month.id}`}
										id={month.id}
										placeholder="10,99"
										value=""
									/>
								</label>
							</div>
						{/each}
					</div>
				</fieldset>
				<p>
					<button type="submit">Erstellen</button>

					<button class="outline danger" data-tooltip="Löschen">
						<Trash strokeWidth={1} />
					</button>
				</p>
			</div>
		</form>
	</div>
</main>

<style lang="scss">
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
