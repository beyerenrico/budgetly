<script>
</script>

<header>
	<h1>Haushaltsbuch erstellen</h1>
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
			<li>Neues Haushaltsbuch</li>
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
				<label for="year">
					Jahr
					<input type="number" name="year" id="year" placeholder={new Date().getFullYear()} />
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
