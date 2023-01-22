<script>
	import '@picocss/pico';
	import { Menu2 } from 'tabler-icons-svelte';
</script>

<nav role="menu">
	<ul>
		<li>
			<a href="/">
				<strong>Budget.ly</strong>
			</a>
		</li>
	</ul>
	<ul class="items-desktop">
		<li><a href="/haushaltsbuecher">Haushaltsbücher</a></li>
		<li><a href="/kategorien">Kategorien</a></li>
		<li><a href="/posten">Posten</a></li>
		<li><a href="/haushaltsbuecher" role="button" class="medium">Haushaltsbuch erstellen</a></li>
	</ul>
	<ul class="hamburger">
		<li>
			<button class="small">
				<Menu2 strokeWidth={1} size={32} />
			</button>
		</li>
	</ul>
</nav>
<slot />

<style lang="scss" global>
	@import '../app';
</style>
