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
		<div>
			{@render children()}
		</div>
	</div>
</ParaglideJS>
