<script>
	import { ArrowUpRight, Trash } from 'tabler-icons-svelte';
</script>

<header>
	<hgroup>
		<h1 class="icon">Posten erstellen</h1>
		<h2>Lorem ipsum dolor sit amet</h2>
	</hgroup>
</header>
<main>
	<div class="container-fluid">
		<form action="" method="POST">
			<div class="container">
				<label for="title">
					Titel
					<input type="text" id="title" name="title" placeholder="Titel" required />
				</label>
				<label for="description">
					Beschreibung
					<textarea name="description" id="description" cols="30" rows="5" />
				</label>
				<div class="grid">
					<div>
						<label for="type"> Typ </label>
						<select name="type" id="type">
							<option value="">Typ auswählen</option>
							<option value="ausgabe" selected>Ausgabe</option>
							<option value="einnahme">Einnahme</option>
						</select>
					</div>
					<div>
						<label for="category"> Kategorie </label>
						<select name="category" id="category">
							<option value="">Kategorie auswählen</option>
							<option value="sparen">Sparen</option>
							<option value="versicherung">Versicherung</option>
							<option value="lebenshaltung" selected>Lebenshaltung</option>
							<option value="variabel">Variabel</option>
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
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" checked />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>

					<div class="grid">
						<div>
							<label for="april">
								<input type="checkbox" name="months" id="april" value="APRIL" />
								April
							</label>
						</div>
						<div>
							<input type="number" placeholder="10.99" disabled />
						</div>
					</div>
				</fieldset>
				<p>
					<button type="submit">Aktualisieren</button>

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
			grid-template-columns: 75px auto;
			align-items: center;

			@media screen and (min-width: 768px) {
				grid-template-columns: 20% auto;
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
