<script>
	import { Pencil, Plus, Trash } from 'tabler-icons-svelte';
</script>

<header>
	<hgroup>
		<h1 class="icon">
			Haushaltsbuch 2019
			<a
				href="/haushaltsbuecher/1/edit"
				role="button"
				class="small"
				data-tooltip="Haushaltsbuch bearbeiten"
			>
				<Pencil strokeWidth={1} />
			</a>
		</h1>
		<h2>Lorem ipsum dolor sit amet</h2>
	</hgroup>
</header>
<main>
	<div class="container-fluid">
		<section>
			<h2 class="icon">
				Einkommen
				<a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
					<Plus strokeWidth={1} />
				</a>
			</h2>
			<article>
				<figure>
					<table role="grid">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Jan.</th>
								<th scope="col">Feb.</th>
								<th scope="col">Mär.</th>
								<th scope="col">Apr.</th>
								<th scope="col">Mai</th>
								<th scope="col">Jun.</th>
								<th scope="col">Jul.</th>
								<th scope="col">Aug.</th>
								<th scope="col">Sep.</th>
								<th scope="col">Okt.</th>
								<th scope="col">Nov.</th>
								<th scope="col">Dez.</th>
								<th scope="col">Aktionen</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">Gehalt</th>
								<td>3120,23 €</td>
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td>
									<p>
										<a
											href="/posten/1/edit"
											role="button"
											class="secondary outline small"
											data-tooltip="Bearbeiten"
										>
											<Pencil strokeWidth={1} />
										</a>
										<a
											href="#delete"
											role="button"
											class="danger outline small"
											data-tooltip="Löschen"
										>
											<Trash strokeWidth={1} />
										</a>
									</p>
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<th scope="col">Zwischensumme</th>
								<td>3120,23 €</td>
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
								<td />
							</tr>
						</tfoot>
					</table>
				</figure>
			</article>
		</section>
		<hr />
		<section>
			<h2 class="icon">
				Lebenshaltung
				<a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
					<Plus strokeWidth={1} />
				</a>
			</h2>
			<figure>
				<table role="grid">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Jan.</th>
							<th scope="col">Feb.</th>
							<th scope="col">Mär.</th>
							<th scope="col">Apr.</th>
							<th scope="col">Mai</th>
							<th scope="col">Jun.</th>
							<th scope="col">Jul.</th>
							<th scope="col">Aug.</th>
							<th scope="col">Sep.</th>
							<th scope="col">Okt.</th>
							<th scope="col">Nov.</th>
							<th scope="col">Dez.</th>
							<th scope="col">Aktionen</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Miete</th>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>820,00 €</td>
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
						<tr>
							<th scope="row">Strom</th>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
						<tr>
							<th scope="row">Gas</th>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th scope="col">Zwischensumme</th>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td>1120,00 €</td>
							<td />
						</tr>
					</tfoot>
				</table>
			</figure>
		</section>
		<section>
			<h2 class="icon">
				Sparen
				<a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
					<Plus strokeWidth={1} />
				</a>
			</h2>
			<figure>
				<table role="grid">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Jan.</th>
							<th scope="col">Feb.</th>
							<th scope="col">Mär.</th>
							<th scope="col">Apr.</th>
							<th scope="col">Mai</th>
							<th scope="col">Jun.</th>
							<th scope="col">Jul.</th>
							<th scope="col">Aug.</th>
							<th scope="col">Sep.</th>
							<th scope="col">Okt.</th>
							<th scope="col">Nov.</th>
							<th scope="col">Dez.</th>
							<th scope="col">Aktionen</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Bausparvertrag</th>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>230,00 €</td>
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
						<tr>
							<th scope="row">Urlaubsauslage</th>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>150,00 €</td>
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th scope="col">Zwischensumme</th>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td>380,00 €</td>
							<td />
						</tr>
					</tfoot>
				</table>
			</figure>
		</section>
		<section>
			<h2 class="icon">
				Variabel
				<a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
					<Plus strokeWidth={1} />
				</a>
			</h2>
			<figure>
				<table role="grid">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Jan.</th>
							<th scope="col">Feb.</th>
							<th scope="col">Mär.</th>
							<th scope="col">Apr.</th>
							<th scope="col">Mai</th>
							<th scope="col">Jun.</th>
							<th scope="col">Jul.</th>
							<th scope="col">Aug.</th>
							<th scope="col">Sep.</th>
							<th scope="col">Okt.</th>
							<th scope="col">Nov.</th>
							<th scope="col">Dez.</th>
							<th scope="col">Aktionen</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Lebensmittel</th>
							<td>227,30 €</td>
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
						<tr>
							<th scope="row">Essen gehen</th>
							<td>54,20 €</td>
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
						<tr>
							<th scope="row">Tanken</th>
							<td>70,06 €</td>
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
						<tr>
							<th scope="row">Kleidung</th>
							<td>101,13 €</td>
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td>
								<p>
									<a
										href="#edit"
										role="button"
										class="secondary outline small"
										data-tooltip="Bearbeiten"
									>
										<Pencil strokeWidth={1} />
									</a>
									<a
										href="#delete"
										role="button"
										class="danger outline small"
										data-tooltip="Löschen"
									>
										<Trash strokeWidth={1} />
									</a>
								</p>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th scope="col">Zwischensumme</th>
							<td>452,69 €</td>
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
						</tr>
					</tfoot>
				</table>
			</figure>
		</section>
		<section>
			<h2 class="icon">
				Test
				<a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
					<Plus strokeWidth={1} />
				</a>
			</h2>
			<figure>Für diese Ausgabenkategorie konnten keine Posten gefunden werden.</figure>
		</section>
		<section>
			<article class="new">
				<a href="/kategorien" data-tooltip="Kategorie hinzufügen">
					<Plus strokeWidth={1} size={50} />
				</a>
			</article>
		</section>
		<section>
			<h2>Saldo</h2>

			<article>
				<figure>
					<table role="grid">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Jan.</th>
								<th scope="col">Feb.</th>
								<th scope="col">Mär.</th>
								<th scope="col">Apr.</th>
								<th scope="col">Mai</th>
								<th scope="col">Jun.</th>
								<th scope="col">Jul.</th>
								<th scope="col">Aug.</th>
								<th scope="col">Sep.</th>
								<th scope="col">Okt.</th>
								<th scope="col">Nov.</th>
								<th scope="col">Dez.</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="col">Einnahmen</th>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
							</tr>
							<tr>
								<th scope="col">Posten</th>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<th scope="col">Saldo</th>
								<td class="danger">-1120,00 €</td>
								<td class="success">1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
								<td>1120,00 €</td>
							</tr>
						</tfoot>
					</table>
				</figure>
			</article>
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
</style>
