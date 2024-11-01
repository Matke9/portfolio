<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import VerticalNav from '$lib/VerticalNav.svelte';
	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'Home'},
		{ href: '/about', label: 'About me'},
		{ href: '/projects', label: 'Projects'},
		{ href: '/education&experiences', label: 'Education & Experiences'},
		{ href: '/contact', label: 'Contact me'}
	]
</script>

<ParaglideJS {i18n}>
	<div class="flex h-screen"> 
		<VerticalNav {navItems}></VerticalNav>
		<div class="h-screen w-1 bg-gradient-to-t from-[var(--dark-green)] via-[var(--accent-dark)] to-[var(--accent-light)]"></div>
		<div class="bg-[var(--dark)] text-white w-full pl-10 pt-10">
			{@render children()}
		</div>
	</div>
</ParaglideJS>
