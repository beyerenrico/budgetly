<script>
	import { Pencil, Plus, Trash } from 'tabler-icons-svelte';

	export let data;

	$: ({ budgetBook, months, categories, itemsInMonths } = data);
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
<main>
	<div class="container-fluid">
		<section>
			<figure>
				<table>
					<thead>
						<tr>
							<th />
							{#each months as month}
								<th id={month.id} scope="col" style="text-align: right;"> {month.title} </th>
							{/each}
							<th id="actions" scope="col" />
						</tr>
					</thead>
					<tbody>
						{#each categories as category}
							<tr>
								<th id={category.id} class="span" colspan="13" scope="colgroup">
									{category.title}
								</th>

								<th
									><a
										href="/posten/new"
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
										<td headers="{category.id} {item.id} {month.id}" style="text-align: right;"
											>{month.value} €</td
										>
									{/each}
									<th headers="{category.id} {item.id} actions">
										<a
											href="/posten/{item.id}/edit"
											data-tooltip="Posten bearbeiten"
											role="button"
											class="small"
										>
											<Pencil strokeWidth={1} />
										</a>
										<a
											href="/posten/1/delete"
											data-tooltip="Posten löschen"
											role="button"
											class="small danger"
										>
											<Trash strokeWidth={1} />
										</a>
									</th>
								</tr>
							{/each}
						{/each}
					</tbody>

					<tfoot>
						<tr>
							<th id="gesamt-ausgaben" class="span" colspan="14" scope="colgroup">
								Zusammenfassung
							</th>
						</tr>
						<tr>
							<th headers="gesamt-ausgaben" id="saldo"> Saldo </th>
							{#each itemsInMonths as item}
								<td headers="gesamt-ausgaben saldo {item.monthId}" style="text-align: right;">
									{item._sum.value} €
								</td>
							{/each}
							<td />
						</tr>
					</tfoot>
				</table>
			</figure>
		</section>
	</div>
</main>

<style lang="scss">
	article {
		padding-top: 1rem;
		padding-bottom: 0;
		padding-left: 0;
		padding-right: 0;

		&.new {
			height: 100px;

			@media (min-width: 768px) {
				height: 200px;
			}
		}
	}

	th {
		width: 400px;
	}

	section {
		h2 {
			margin-bottom: 1rem;
		}

		article {
			margin-top: 0;
		}
	}

	hr {
		margin-bottom: 1rem;

		@media screen and (min-width: 768px) {
			margin-bottom: 2rem;
		}

		@media screen and (min-width: 1024px) {
			margin-bottom: 3rem;
		}
	}

	th {
		background-color: #121212;
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
