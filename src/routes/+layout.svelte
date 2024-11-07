<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import VerticalNav from '$lib/VerticalNav.svelte';
	import Background from '$lib/Background.svelte';
	import ViewTransition from '../lib/Navigation.svelte';
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
	<div class="bg-[var(--dark)] w-screen h-screen z-[-1] absolute"></div>
	<ViewTransition/>
		<div class="flex h-screen w-screen"> 
		<VerticalNav {navItems}></VerticalNav>
		<div class="stripe h-screen w-1 bg-gradient-to-t from-[var(--dark-green)] via-[var(--accent-dark)] to-[var(--accent-light)] "></div>
		<div class="block text-white w-full bg-[var(--dark)] wrapper">
			<Background></Background>
			{@render children()}
		</div>
		
	</div>
</ParaglideJS>

<style>
@keyframes rotate-out {
  to { transform: rotateY(90deg) rotateX(-15deg) rotateZ(-15deg) scale(0.5); }
}
@keyframes rotate-in {
  0% { transform: rotateY(-90deg) rotateX(15deg) rotateZ(15deg) scale(0.5); }
  50% {transform: rotateY(-90deg) rotateX(15deg) rotateZ(15deg) scale(0.5);}
  100% { transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1); }
}

.wrapper {
	view-transition-name: wrapper;
}

::view-transition-old(wrapper){
  animation: rotate-out 0.5s forwards;
  animation-timing-function: ease-out;
}
::view-transition-new(wrapper){
  animation: rotate-in 1s forwards;
  animation-timing-function: ease-in;
  }
</style>
