<script>
	import { Pencil, Plus } from 'tabler-icons-svelte';

	export let data;

	$: ({ budgetBooks } = data);
</script>

<header>
	<hgroup>
		<h1>Posten</h1>
		<h2>Erstelle Kategorien für deine Posten</h2>
	</hgroup>
	<a href="/posten/new" role="button">Posten erstellen</a>
</header>
<nav aria-label="breadcrumb">
	<div class="container">
		<ul>
			<li>
				<a href="/">Startseite</a>
			</li>
			<li>Posten</li>
		</ul>
	</div>
</nav>
<main>
	<div class="container">
		<section>
			<form action="search">
				<label for="searchPosten">
					<input
						type="search"
						name="searchPosten"
						id="searchPosten"
						placeholder="Posten suchen..."
					/>
				</label>
				<div class="grid">
					<div>
						<select name="budgetBook" id="budgetBook">
							<option value="">Alle Haushaltsbücher anzeigen</option>
							{#each budgetBooks as budgetBook}
								<option value={budgetBook.id}>{budgetBook.title}</option>
							{/each}
						</select>
					</div>

					<div>
						<button type="submit">Suchen</button>
					</div>
				</div>
			</form>
		</section>
		<section id="results">
			{#each budgetBooks as budgetBook}
				<section id={budgetBook.id}>
					<h2 class="icon">
						{budgetBook.title}
						<a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
							<Plus strokeWidth={1} />
						</a>
					</h2>

					{#each budgetBook.items as item}
						<details>
							<summary>{item.title}</summary>
							<p>{item.description}</p>
							<ul>
								<li>Typ: {item.type}</li>
								<li>Kategorie: {item.category.title}</li>
								<ul>
									{#each item.months as joinElement}
										<li>
											{joinElement.month.title}: {joinElement.value}
										</li>
									{/each}
								</ul>
							</ul>
							<a
								href="/posten/{item.id}/edit"
								role="button"
								class="outline small"
								data-tooltip="Posten bearbeiten"
							>
								<Pencil strokeWidth={1} />
							</a>
						</details>
					{/each}
				</section>
			{:else}
				Es wurden bisher keine Posten erstellt
			{/each}
		</section>
	</div>
</main>

<style>
	header {
		text-align: center;
	}
</style>
