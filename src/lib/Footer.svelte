<script lang="ts">
	type FooterItem = {
		href: string;
		img: string;
	};

	export let footerItems: FooterItem[] = [];
</script>

<nav
	class="z-0 flex h-56 min-h-56 w-screen flex-col content-center justify-center space-y-4 bg-[var(--dark-green)] pl-4 pr-4 text-white"
>
	<div class="text-center text-2xl font-medium">My socials</div>
	<ul class="align-center flex flex-row justify-center">
		{#each footerItems as item}
			<li class="content-center">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<a
					href={item.href}
					class="nig block rounded p-3 transition duration-200 ease-in-out hover:bg-[#ffffff]"
				>
					{@html item.img}
				</a>
			</li>
		{/each}
	</ul>
	<div class="text-center text-xl font-medium">
		Copyright © 2025 | <div class="inline font-semibold text-[var(--accent-light)]">
			Mihailo Matovic®
		</div>
		| All rights reserved
	</div>
</nav>

<style>
	:global(.nig:hover svg) {
		color: var(--dark-green);
	}
</style>
