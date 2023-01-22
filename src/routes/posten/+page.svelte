<script>
	import { Pencil, Plus } from 'tabler-icons-svelte';
</script>

<header>
	<hgroup>
		<h1>Posten</h1>
		<h2>Erstelle Kategorien für deine Posten</h2>
	</hgroup>
	<a href="/posten/new" role="button">Posten erstellen</a>
</header>
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
							<option value="1">Haushaltsbuch 2019</option>
							<option value="2">Haushaltsbuch 2020</option>
						</select>
					</div>

					<div>
						<button type="submit">Suchen</button>
					</div>
				</div>
			</form>
		</section>
		<section id="results">
			<section id="results1">
				<h2 class="icon">
					Haushaltsbuch 2019
					<a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
						<Plus strokeWidth={1} />
					</a>
				</h2>

				<details>
					<summary>Miete</summary>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero culpa excepturi,
						explicabo commodi autem cupiditate consequuntur perferendis placeat officia quod libero
						enim velit earum laborum, nulla saepe dolor dicta odit.
					</p>
					<ul>
						<li>Typ: Ausgabe</li>
						<li>Kategorie: Lebenshaltung</li>
						<li>
							Monate: Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober,
							November, Dezember
						</li>
						<li>Summe: 820,00 €</li>
					</ul>
					<a
						href="/posten/1/edit"
						role="button"
						class="outline small"
						data-tooltip="Posten bearbeiten"
					>
						<Pencil strokeWidth={1} />
					</a>
				</details>
				<details>
					<summary>Strom</summary>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, dolorum.</p>
					<ul>
						<li>Typ: Ausgabe</li>
						<li>Kategorie: Lebenshaltung</li>
						<li>
							Monate: Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober,
							November, Dezember
						</li>
						<li>Summe: 150,00 €</li>
					</ul>
					<a
						href="/posten/1/edit"
						role="button"
						class="outline small"
						data-tooltip="Posten bearbeiten"
					>
						<Pencil strokeWidth={1} />
					</a>
				</details>
			</section>
			<section id="results2">
				<h2 class="icon">
					Haushaltsbuch 2020
					<a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
						<Plus strokeWidth={1} />
					</a>
				</h2>

				<details>
					<summary>Miete</summary>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero culpa excepturi,
						explicabo commodi autem cupiditate consequuntur perferendis placeat officia quod libero
						enim velit earum laborum, nulla saepe dolor dicta odit.
					</p>
					<ul>
						<li>Typ: Ausgabe</li>
						<li>Kategorie: Lebenshaltung</li>
						<li>
							Monate: Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober,
							November, Dezember
						</li>
						<li>Summe: 820,00 €</li>
					</ul>
					<a
						href="/posten/1/edit"
						role="button"
						class="outline small"
						data-tooltip="Posten bearbeiten"
					>
						<Pencil strokeWidth={1} />
					</a>
				</details>
				<details>
					<summary>Strom</summary>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, dolorum.</p>
					<ul>
						<li>Typ: Ausgabe</li>
						<li>Kategorie: Lebenshaltung</li>
						<li>
							Monate: Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober,
							November, Dezember
						</li>
						<li>Summe: 150,00 €</li>
					</ul>
					<a
						href="/posten/1/edit"
						role="button"
						class="outline small"
						data-tooltip="Posten bearbeiten"
					>
						<Pencil strokeWidth={1} />
					</a>
				</details>
			</section>
		</section>
	</div>
</main>

<style>
	header {
		text-align: center;
	}
</style>
