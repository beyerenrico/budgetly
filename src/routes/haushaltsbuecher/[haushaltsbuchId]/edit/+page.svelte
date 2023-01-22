<script>
	import { Trash } from 'tabler-icons-svelte';
</script>

<header>
	<hgroup>
		<h1>Sie bearbeiten: Haushaltsbuch 2019</h1>
		<h2>Lorem ipsum dolor sit amet</h2>
	</hgroup>
</header>
<main>
	<div class="container-fluid">
		<form action="" method="POST">
			<div class="container">
				<label for="title">
					Titel
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Titel"
						required
						value="Haushaltsbuch 2019"
					/>
				</label>
				<label for="description">
					Beschreibung
					<textarea name="description" id="description" cols="30" rows="5"
						>Lorem ipsum dolor sit amet</textarea
					>
				</label>
				<label for="year">
					Jahr
					<input
						type="number"
						name="year"
						id="year"
						placeholder={new Date().getFullYear()}
						value="2019"
					/>
				</label>
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
</style>
