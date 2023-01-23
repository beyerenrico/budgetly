<script>
	import { page } from '$app/stores';
</script>

<main>
	<div class="container">
		<h1>{$page.status}: {$page.error.message}</h1>
		<a href="/" role="button">Zurück zur Startseite</a>
	</div>
</main>
