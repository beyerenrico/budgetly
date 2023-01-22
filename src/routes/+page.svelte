<script>
	import { Plus } from 'tabler-icons-svelte';

	export let data;
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
			<h3>Deine Haushaltsbücher</h3>
			<div class="grid">
				<article>
					<div>
						Haushaltsbuch 2019

						<p>
							<a href="/haushaltsbuecher/1" role="button" class="primary small" aria-label="Ansehen"
								>Ansehen</a
							>
						</p>
					</div>
				</article>
				<article class="new">
					<a href="/haushaltsbuecher/new" data-tooltip="Haushaltsbuch erstellen">
						<Plus strokeWidth={2} size={50} />
					</a>
				</article>
			</div>
		</section>
		<section>
			<h3>Deine Posten</h3>
			<div class="grid">
				<article>
					<div>
						<small> Miete 820,00 € monatlich </small>
						<p>
							<a href="/posten/1/edit" role="button" class="primary small" aria-label="Posten"
								>Ansehen</a
							>
						</p>
					</div>
				</article>
				<article class="new">
					<a href="/posten/new" data-tooltip="Ausgabe erstellen">
						<Plus strokeWidth={2} size={50} />
					</a>
				</article>
			</div>
		</section>
		<section>
			<h3>Kategorien</h3>
			<div class="grid">
				<article>
					<div>
						Sparen

						<p>
							<a
								href="/kategorien/sparen/edit"
								role="button"
								class="primary small"
								aria-label="Documentation">Bearbeiten</a
							>
						</p>
					</div>
				</article>
				<article>
					<div>
						Versicherung

						<p>
							<a
								href="/kategorien/versicherung/edit"
								role="button"
								class="primary small"
								aria-label="Documentation">Bearbeiten</a
							>
						</p>
					</div>
				</article>
				<article>
					<div>
						Lebenshaltung

						<p>
							<a
								href="/kategorien/lebenshaltung/edit"
								role="button"
								class="primary small"
								aria-label="Documentation">Bearbeiten</a
							>
						</p>
					</div>
				</article>
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

	.auth-buttons {
		text-align: center;
	}
</style>
