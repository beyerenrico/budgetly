<script>
	import { onMount } from 'svelte';
	import { ArrowUpRight, Trash } from 'tabler-icons-svelte';

	export let data;

	$: ({ months, categories, budgetBooks, item } = data);

	onMount(() => {
		item.months.forEach(({ monthId, value }) => {
			document.getElementById(monthId).value = value;
		});
	});
</script>

<header>
	<hgroup>
		<h1 class="icon">Sie bearbeiten den Posten: {item.title}</h1>
		<h2>{item.description}</h2>
	</hgroup>
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
			<li>
				{item.title}
			</li>
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
						value={item.title}
					/>
				</label>
				<label for="description">
					Beschreibung
					<textarea name="description" id="description" cols="30" rows="5"
						>{item.description}</textarea
					>
				</label>
				<label for="budgetBook"> Haushaltsbuch </label>
				<select name="budgetBook" id="budgetBook">
					<option value="">Haushaltsbuch auswählen</option>
					{#each budgetBooks as budgetBook}
						<option value={budgetBook.id} selected={item.budgetBook.id === budgetBook.id}
							>{budgetBook.title}</option
						>
					{/each}
				</select>

				<div class="grid">
					<div>
						<label for="type"> Typ </label>
						<select name="type" id="type">
							<option value="">Typ auswählen</option>
							<option value="EXPENSE" selected={item.type === 'EXPENSE'}>Ausgabe</option>
							<option value="INCOME" selected={item.type === 'INCOME'}>Einnahme</option>
						</select>
					</div>
					<div>
						<label for="category"> Kategorie </label>
						<select name="category" id="category">
							<option value="">Kategorie auswählen</option>
							{#each categories as category}
								<option value={category.id} selected={item.category.id === category.id}
									>{category.title}</option
								>
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
								<input type="hidden" name="rank:{month.id}" value={month.rank} />
								<label for={month.id}>
									{month.title}
									<input
										type="number"
										name="months:{month.id}"
										id={month.id}
										placeholder="10"
										value="0"
									/>
								</label>
							</div>
						{/each}
					</div>
				</fieldset>
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
