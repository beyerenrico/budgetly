<script>
</script>

<header>
	<h1>Kategorie erstellen</h1>
</header>
<nav aria-label="breadcrumb">
	<div class="container">
		<ul>
			<li>
				<a href="/">Startseite</a>
			</li>
			<li>
				<a href="/kategorien">Kategorien</a>
			</li>
			<li>Neue Kategorie</li>
		</ul>
	</div>
</nav>
<main>
	<div class="container-fluid">
		<form action="?/create" method="POST">
			<div class="container">
				<label for="title">
					Titel
					<input type="text" id="title" name="title" placeholder="Titel" required />
				</label>
				<label for="description">
					Beschreibung
					<textarea name="description" id="description" cols="30" rows="5" />
				</label>
				<button type="submit">Erstellen</button>
			</div>
		</form>
	</div>
</main>

<style lang="scss">
	header {
		text-align: center;

		h1 {
			margin-top: 2rem;
		}
	}
</style>
