<script lang="ts">
	type NavItem = {
		href: string;
		label: string;
	};

	export let navItems: NavItem[] = [];
</script>

<nav
	class="z-0 flex h-screen w-56 min-w-56 flex-col justify-center space-y-4 bg-gradient-to-b from-[#848484] to-[#1E1E1E] pl-4 pr-4 text-white"
>
	<img src="/MMLogoBeli.png" alt="mm" class="absolute left-6 top-8 h-16 bg-cover bg-no-repeat" />
	<ul class="space-y-2">
		{#each navItems as item}
			<li class="">
				<a
					href={item.href}
					class="block rounded p-2 transition duration-200 ease-in-out hover:bg-[var(--grey)]"
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		view-transition-name: nav;
	}
</style>
