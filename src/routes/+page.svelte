<script>
	import { Plus } from 'tabler-icons-svelte';

	export let data;

	$: ({ items, categories, budgetBooks } = data);
</script>

<header>
	<div class="container">
		<hgroup>
			<h1>Willkommen zurück, {data.session.user.email}!</h1>
			<h2>Behalte deine Finanzen im Blick!</h2>
		</hgroup>
		<p>
			<a href="/haushaltsbuecher" role="button" class="primary" aria-label="Documentation"
				>Haushaltsbuch erstellen</a
			>
		</p>
	</div>
</header>
<main>
	<div class="container">
		<section>
			<h3><a href="/haushaltsbuecher">Haushaltsbücher</a></h3>
			<div class="grid">
				{#each budgetBooks as budgetBook}
					<article>
						<div>
							<p class="title">{budgetBook.title}</p>

							<p>
								<a
									href="/haushaltsbuecher/{budgetBook.id}"
									role="button"
									class="primary small"
									aria-label="Ansehen">Ansehen</a
								>
							</p>
						</div>
					</article>
				{/each}
				<article class="new">
					<a href="/haushaltsbuecher/new" data-tooltip="Haushaltsbuch erstellen">
						<Plus strokeWidth={2} size={50} />
					</a>
				</article>
			</div>
		</section>
		<section>
			<h3><a href="/posten">Posten</a></h3>
			<div class="grid">
				{#each items as item}
					<article>
						<div>
							<div class="item-title-group">
								<small>{item.budgetBook.title}</small>
								<p class="title">{item.title}</p>
							</div>

							<p>
								<a
									href="/posten/{item.id}/edit"
									role="button"
									class="primary small"
									aria-label="Posten">Bearbeiten</a
								>
							</p>
						</div>
					</article>
				{/each}
				<article class="new">
					<a href="/posten/new" data-tooltip="Posten erstellen">
						<Plus strokeWidth={2} size={50} />
					</a>
				</article>
			</div>
		</section>
		<section>
			<h3><a href="/kategorien">Kategorien</a></h3>
			<div class="grid">
				{#each categories as category}
					<article>
						<div>
							<p class="title">{category.title}</p>

							<p>
								<a
									href="/kategorien/{category.id}/edit"
									role="button"
									class="primary small"
									aria-label="Documentation">Bearbeiten</a
								>
							</p>
						</div>
					</article>
				{/each}
				<article class="new">
					<a href="/kategorien/new" data-tooltip="Kategorie erstellen">
						<Plus strokeWidth={2} size={50} />
					</a>
				</article>
			</div>
		</section>
	</div>
</main>

<style lang="scss">
	h3 {
		a {
			&:hover,
			&:focus {
				text-decoration: none;
			}
		}
	}

	.item-title-group {
		flex-grow: 1;

		small {
			color: var(--secondary);
			margin-bottom: 0;
		}

		p {
			margin-top: 0;
		}
	}

	p.title {
		margin-top: 0;
		hyphens: auto;
	}

	.grid {
		@media (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 992px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (min-width: 1200px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	article {
		> div {
			width: 100%;
		}
	}
</style>
