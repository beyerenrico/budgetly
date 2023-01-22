<script>
	import { supabaseClient } from '$lib/supabase.js';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Menu2 } from 'tabler-icons-svelte';
	import { enhance } from '$app/forms';
	import '@picocss/pico';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	export let data;

	const submitLogout = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();

		if (error) {
			console.error(error);
		}

		cancel();
	};
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
		<li>
			{#if data.session}
				<form action="/logout" method="POST" use:enhance={submitLogout}>
					<button type="submit" class="medium danger">Abmelden</button>
				</form>
			{:else}
				<a href="/login" role="button" class="medium">Anmelden</a>
			{/if}
		</li>
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

	form {
		margin-bottom: 0;
	}
</style>
