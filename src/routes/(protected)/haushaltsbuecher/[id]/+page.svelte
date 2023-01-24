<script>
	import { Pencil, Plus, Trash } from 'tabler-icons-svelte';

	export let data;
	export let yearlyTotal = 0;

	$: ({ budgetBook, months, categories, itemsInMonths, incomeItems } = data);
	$: yearlyTotal = itemsInMonths.reduce((acc, item) => acc + item._sum.value, 0);
</script>

<header>
	<hgroup>
		<h1 class="icon">
			{budgetBook.title}
			<a
				href="/haushaltsbuecher/{budgetBook.id}/edit"
				role="button"
				class="small"
				data-tooltip="Haushaltsbuch bearbeiten"
			>
				<Pencil strokeWidth={1} />
			</a>
		</h1>
		<h2>{budgetBook.description}</h2>
	</hgroup>
</header>
<nav aria-label="breadcrumb">
	<div class="container">
		<ul>
			<li>
				<a href="/">Startseite</a>
			</li>
			<li>
				<a href="/haushaltsbuecher">Haushaltsbücher</a>
			</li>
			<li>{budgetBook.title}</li>
		</ul>
	</div>
</nav>
<main>
	<div class="container-fluid">
		<section>
			<figure>
				<table>
					<thead>
						<tr>
							<th />
							{#each months as month}
								<th id={month.id} scope="col"> {month.title} </th>
							{/each}
							<th id="actions" scope="col" />
						</tr>
					</thead>
					<tbody>
						<tr>
							<th id="INCOME" class="span" colspan="13" scope="colgroup">
								<h3>Einkommen</h3>
							</th>

							<th
								><a
									href="/posten/new?type=INCOME&budgetBook={budgetBook.id}"
									data-tooltip="Einkommen hinzufügen"
									role="button"
									class="small"
								>
									<Plus strokeWidth={1} />
								</a></th
							>
						</tr>

						{#each incomeItems as item}
							<tr>
								<th headers="INCOME" id={item.id}>{item.title}</th>
								{#each item.months as month}
									<td headers="INCOME {item.id} {month.id}"
										>{month.value.toFixed(2).toString().replace('.', ',')} €</td
									>
								{/each}
								<th headers="INCOME {item.id} actions">
									<a
										href="/posten/{item.id}/edit"
										data-tooltip="Posten bearbeiten"
										role="button"
										class="small secondary"
									>
										<Pencil strokeWidth={1} />
									</a>
								</th>
							</tr>
						{/each}
						{#each categories as category}
							<tr>
								<th id={category.id} class="span" colspan="13" scope="colgroup">
									<h3>{category.title}</h3>
								</th>

								<th
									><a
										href="/posten/new?category={category.id}&budgetBook={budgetBook.id}"
										data-tooltip="Posten hinzufügen"
										role="button"
										class="small"
									>
										<Plus strokeWidth={1} />
									</a></th
								>
							</tr>
							{#each category.items as item}
								<tr>
									<th headers={category.id} id={item.id}>{item.title}</th>
									{#each item.months as month}
										<td headers="{category.id} {item.id} {month.id}"
											>{month.value.toFixed(2).toString().replace('.', ',')} €</td
										>
									{/each}
									<th headers="{category.id} {item.id} actions">
										<a
											href="/posten/{item.id}/edit"
											data-tooltip="Posten bearbeiten"
											role="button"
											class="small secondary"
										>
											<Pencil strokeWidth={1} />
										</a>
									</th>
								</tr>
							{/each}
						{/each}
					</tbody>

					<tfoot>
						<tr>
							<th id="gesamt-ausgaben" class="span" colspan="14" scope="colgroup">
								<h3>Zusammenfassung</h3>
							</th>
						</tr>
						<tr>
							<th headers="gesamt-ausgaben" id="saldo"> Saldo </th>
							{#each itemsInMonths as item}
								<td
									headers="gesamt-ausgaben saldo {item.monthId}"
									class={item._sum.value < 0 ? 'danger' : 'success'}
								>
									{item._sum.value.toFixed(2).toString().replace('.', ',')} €
								</td>
							{/each}
							<th>
								{yearlyTotal.toFixed(2).toString().replace('.', ',')} €
							</th>
						</tr>
					</tfoot>
				</table>
			</figure>
		</section>
	</div>
</main>

<style lang="scss">
	th {
		width: 400px;
	}

	th {
		background-color: #121212;

		h3 {
			margin-bottom: 0;
		}
	}

	table {
		overflow: hidden;
		margin-bottom: 0;
	}

	td,
	th {
		position: relative;
	}

	//Row
	td:hover::before {
		background-color: #0a0a0a;
		content: '';
		height: 100%;
		left: -5000px;
		position: absolute;
		top: 0;
		width: 10000px;
		z-index: -2;
	}

	//Column
	td:hover::after {
		background-color: #0a0a0a;
		content: '';
		height: 10000px;
		left: 0;
		position: absolute;
		top: -5000px;
		width: 100%;
		z-index: -1;
	}
</style>
