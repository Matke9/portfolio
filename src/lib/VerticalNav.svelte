<script lang="ts">
	type NavItem = {
		href: string;
		label: string;
	};

	export let navItems: NavItem[] = [];

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<!-- Burger Button -->
<button
	on:click={toggleMenu}
	class="fixed right-6 top-8 z-50 block md:hidden"
	aria-label="Toggle menu"
>
	<!-- Burger Icon -->
	<svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
		/>
	</svg>
</button>

<!-- Navigation Menu -->
<nav
	class="stripe-border fixed z-40 flex min-h-screen w-56 min-w-56 max-w-[300px] max-w-[70%] flex-col bg-gradient-to-b from-[#848484] to-[#1E1E1E] text-white transition-transform duration-200 ease-in-out"
	class:translate-x-0={isMenuOpen}
	class:-translate-x-full={!isMenuOpen}
>
	<div class="flex h-screen w-56 min-w-56 flex-col justify-center space-y-4 pl-4 pr-4">
		<img src="/MMLogoBeli.png" alt="mm" class="absolute left-6 top-8 h-16 bg-cover bg-no-repeat" />

		<!-- Navigation Items -->
		<ul class="space-y-2">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						on:click={toggleMenu}
						class="block rounded p-2 transition duration-200 ease-in-out hover:bg-[var(--grey)]"
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	/* Default styles for the nav */
	nav {
		position: fixed; /* Fixed position for smaller screens */
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: translateX(-100%); /* Hide the nav by default on smaller screens */
		transition: transform 0.3s ease-in-out; /* Smooth transition */
		z-index: 40; /* Ensure it's above other content */
	}

	/* Show the nav when isMenuOpen is true */
	nav.translate-x-0 {
		transform: translateX(0);
	}

	/* Hide the nav when isMenuOpen is false */
	nav.-translate-x-full {
		transform: translateX(-100%);
	}

	/* Reset styles for larger screens */
	@media (min-width: 768px) {
		nav {
			position: static; /* Reset position to default */
			transform: none; /* Reset transform */
			width: auto; /* Reset width */
			height: auto; /* Reset height */
		}

		/* Ensure the nav is always visible on larger screens */
		nav.translate-x-0,
		nav.-translate-x-full {
			transform: none;
		}

		/* Hide the burger button on larger screens */
		button {
			display: none;
		}
	}
	.stripe-border {
		border-right: 4px solid transparent; /* Adjust the thickness of the border */
		border-image: linear-gradient(
				to top,
				var(--dark-green),
				var(--accent-dark),
				var(--accent-light)
			)
			1; /* Apply the gradient as a border */
	}
</style>
