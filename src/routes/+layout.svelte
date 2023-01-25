<script>
	import { supabaseClient } from '$lib/supabase.js';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Menu2 } from 'tabler-icons-svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import url from '$lib/utils/url';
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
	export let mobileMenuVisible = false;

	const submitLogout = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();

		if (error) {
			toast.success('Es ist ein Fehler aufgetreten');
		}

		toast.success('Erfolgreich abgemeldet');
		cancel();
	};

	const toggleMobileMenu = () => {
		mobileMenuVisible = !mobileMenuVisible;
	};

	const hideMobileMenu = () => {
		mobileMenuVisible = false;
	};

	if ($url?.hash) {
		const hashParams = $url?.hash.split('&').reduce(function (res, item) {
			let parts = item.split('=');
			res[parts[0].replace('#', '')] = parts[1].replaceAll('+', ' ');
			return res;
		}, {});

		if (hashParams?.message) {
			const message = decodeURIComponent(hashParams.message);
			toast.success(message, {
				duration: 10000
			});
		}

		if (hashParams?.error_description) {
			const error = decodeURIComponent(hashParams.error_description);
			toast.error(error, {
				duration: 10000
			});
		}
	}
</script>

<nav role="menu" class="nav-desktop">
	<ul>
		<li style="padding-top: 0.5rem; padding-bottom: 0.5rem;">
			<a href="/" class="logo">
				<strong>Budget.ly</strong>
			</a>
		</li>
	</ul>
	<ul class="items-desktop">
		{#if data.session}
			<li>
				<a href="/" class={$page.url.pathname === '/' && 'active'}>Startseite</a>
			</li>
			<li>
				<a
					href="/haushaltsbuecher"
					class={$page.url.pathname.startsWith('/haushaltsbuecher') && 'active'}>Haushaltsbücher</a
				>
			</li>
			<li>
				<a href="/kategorien" class={$page.url.pathname.startsWith('/kategorien') && 'active'}
					>Kategorien</a
				>
			</li>
			<li>
				<a href="/posten" class={$page.url.pathname.startsWith('/posten') && 'active'}>Posten</a>
			</li>
		{/if}
		{#if data.session}
			<li>
				<details role="list" dir="rtl">
					<!-- svelte-ignore a11y-no-redundant-roles -->
					<summary aria-haspopup="listbox" role="button" class="medium">
						{data.session.user.email}
					</summary>
					<ul role="listbox">
						<li>
							<a href="/profil">Profil</a>
						</li>
						<li>
							<form action="/logout" method="POST" use:enhance={submitLogout}>
								<button type="submit" class="medium danger">Abmelden</button>
							</form>
						</li>
					</ul>
				</details>
			</li>
			{#if data.session.user.user_metadata.avatar_url}
				<li>
					<img
						height="40px"
						width="40px"
						src={data.session.user.user_metadata.avatar_url}
						alt={data.session.user.user_metadata.name}
						class="round"
					/>
				</li>
			{/if}
		{:else}
			<li>
				<a href="/login" role="button" class="medium secondary">Anmelden</a>
				<a href="/register" role="button" class="medium">Registrieren</a>
			</li>
		{/if}
	</ul>
	<ul class="hamburger">
		<li>
			<button class="small" on:click={toggleMobileMenu}>
				<Menu2 strokeWidth={1} size={32} />
			</button>
		</li>
	</ul>
</nav>
<aside class="items-mobile {mobileMenuVisible ? 'show' : 'hide'}">
	<nav role="menu">
		<ul>
			{#if data.session}
				<li>
					<a href="/" class={$page.url.pathname === '/' && 'active'} on:click={hideMobileMenu}
						>Startseite</a
					>
				</li>
				<li>
					<a
						href="/haushaltsbuecher"
						class={$page.url.pathname.startsWith('/haushaltsbuecher') && 'active'}
						on:click={hideMobileMenu}>Haushaltsbücher</a
					>
				</li>
				<li>
					<a
						href="/kategorien"
						class={$page.url.pathname.startsWith('/kategorien') && 'active'}
						on:click={hideMobileMenu}>Kategorien</a
					>
				</li>
				<li>
					<a
						href="/posten"
						class={$page.url.pathname.startsWith('/posten') && 'active'}
						on:click={hideMobileMenu}>Posten</a
					>
				</li>
			{/if}
			{#if data.session}
				<li>
					<a href="/profil" role="button" class="medium w-100">Profil</a>
				</li>
				<li>
					<form action="/logout" method="POST" use:enhance={submitLogout}>
						<button type="submit" class="medium danger" on:click={hideMobileMenu}>Abmelden</button>
					</form>
				</li>
			{:else}
				<li>
					<a href="/login" role="button" class="medium secondary">Anmelden</a>
					<a href="/register" role="button" class="medium">Registrieren</a>
				</li>
			{/if}
		</ul>
	</nav>
</aside>
<slot />
<footer>
	<div class="container">
		<small>Copyright &copy; {new Date().getFullYear()} budget.ly</small>
	</div>
</footer>
<Toaster />

<style lang="scss" global>
	@import '../app';

	.logo {
		font-size: 1.5rem;
	}

	form {
		margin-bottom: 0;
	}

	.items-desktop {
		li {
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
		}

		a:not([role='button']) {
			color: #fff;

			&:hover,
			&:focus {
				color: var(--primary);
			}

			&.active {
				color: var(--primary);
			}
		}
	}
	nav {
		display: flex;
		align-items: center;
	}

	.items-mobile {
		position: fixed;
		background-color: var(--background-color);
		right: 0;
		left: 0;
		transform: translateY(calc(-100% - 80px));
		transition: transform 0.2s ease-out;
		z-index: 1;

		&.show {
			transform: translateY(0);
			transition: transform 0.3s ease-in-out;
		}

		a:not([role='button']) {
			color: #fff;

			&:hover,
			&:focus {
				color: var(--primary);
			}

			&.active {
				color: var(--primary);
			}
		}
	}

	.nav-desktop {
		position: relative;
		z-index: 10;
		background-color: var(--background-color);
	}

	summary[role='button'] {
		align-items: center;
	}
</style>
