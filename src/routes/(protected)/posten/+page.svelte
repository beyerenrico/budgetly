<script>
	import { Eye, Pencil, Plus } from 'tabler-icons-svelte';

	export let data;
	export let form;

	$: ({ months, budgetBooks } = data);
</script>

<header>
	<h1>Posten</h1>
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
			<form action="?/search" method="POST">
				<label for="searchPosten">
					<input
						type="search"
						name="searchPosten"
						id="searchPosten"
						placeholder="Posten suchen..."
						value={form?.body.searchPosten ?? ''}
					/>
				</label>
				<div class="grid">
					<div>
						<select name="budgetBook" id="budgetBook">
							<option value="">Alle Haushaltsbücher anzeigen</option>
							{#each budgetBooks as budgetBook}
								<option value={budgetBook.id} selected={form?.body.budgetBook === budgetBook.id}
									>{budgetBook.title}</option
								>
							{/each}
						</select>
					</div>

					<button type="submit">Suchen</button>
				</div>
				{#if form?.body.searchPosten}
					<small>Sie suchten nach: "{form?.body.searchPosten}"</small>
				{/if}
			</form>
		</section>
		<section id="results">
			{#if form?.filteredBudgetBooks}
				{#each form?.filteredBudgetBooks as budgetBook}
					<section id={budgetBook.id}>
						<h2 class="icon">
							{budgetBook.title}
							<a
								href="/haushaltsbuecher/{budgetBook.id}"
								data-tooltip="Haushaltsbuch anzeigen"
								role="button"
								class="small"
							>
								<Eye strokeWidth={1} />
							</a>
							<a
								href="/posten/new?budgetBook={budgetBook.id}"
								data-tooltip="Posten hinzufügen"
								role="button"
								class="small"
							>
								<Plus strokeWidth={1} />
							</a>
						</h2>

						{#each budgetBook.items as item}
							<details>
								<summary>{item.title}</summary>
								<p>{item.description}</p>
								<ul>
									<li>Typ: {item.type === 'EXPENSE' ? 'Ausgabe' : 'Einkommen'}</li>
									<li>Kategorie: {item.category.title}</li>
								</ul>
								<figure>
									<table>
										<tbody>
											<tr>
												{#each months.slice(0, 6) as month}
													<th id={month.id} scope="col">
														{month.title}
													</th>
												{/each}
											</tr>
											<tr>
												{#each item.months.slice(0, 6) as item}
													<td>{item.value.toFixed(2).toString().replace('.', ',')} €</td>
												{/each}
											</tr>
											<tr>
												<th colspan="12" />
											</tr>
											<tr>
												{#each months.slice(6, 12) as month}
													<th id={month.id} scope="col">
														{month.title}
													</th>
												{/each}
											</tr>
											<tr>
												{#each item.months.slice(6, 12) as item}
													<td>{item.value.toFixed(2).toString().replace('.', ',')} €</td>
												{/each}
											</tr>
										</tbody>
									</table>
								</figure>
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
			{:else}
				{#each budgetBooks as budgetBook}
					<section id={budgetBook.id}>
						<h2 class="icon">
							{budgetBook.title}
							<a
								href="/haushaltsbuecher/{budgetBook.id}"
								data-tooltip="Haushaltsbuch anzeigen"
								role="button"
								class="small"
							>
								<Eye strokeWidth={1} />
							</a>
							<a
								href="/posten/new?budgetBook={budgetBook.id}"
								data-tooltip="Posten hinzufügen"
								role="button"
								class="small"
							>
								<Plus strokeWidth={1} />
							</a>
						</h2>

						{#each budgetBook.items as item}
							<details>
								<summary>{item.title}</summary>
								<p>{item.description}</p>
								<ul>
									<li>Typ: {item.type === 'EXPENSE' ? 'Ausgabe' : 'Einkommen'}</li>
									{#if item.category}
										<li>Kategorie: {item.category.title}</li>
									{/if}
								</ul>
								<figure>
									<table>
										<tbody>
											<tr>
												{#each months.slice(0, 6) as month}
													<th id={month.id} scope="col">
														{month.title}
													</th>
												{/each}
											</tr>
											<tr>
												{#each item.months.slice(0, 6) as item}
													<td>{item.value.toFixed(2).toString().replace('.', ',')} €</td>
												{/each}
											</tr>
											<tr>
												<th colspan="12" />
											</tr>
											<tr>
												{#each months.slice(6, 12) as month}
													<th id={month.id} scope="col">
														{month.title}
													</th>
												{/each}
											</tr>
											<tr>
												{#each item.months.slice(6, 12) as item}
													<td>{item.value.toFixed(2).toString().replace('.', ',')} €</td>
												{/each}
											</tr>
										</tbody>
									</table>
								</figure>
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
			{/if}
		</section>
	</div>
</main>

<style>
	header {
		text-align: center;
	}

	button[type='submit'] {
		margin-bottom: 0;
	}

	select {
		margin-bottom: 0;
	}
</style>
