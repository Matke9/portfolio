<script lang="ts">
	import { onMount } from 'svelte';

	let a = 'nigga';

	onMount(() => {
		// Get the DOM elements
		const imgElement = document.querySelector('.imgT') as HTMLElement;
		const titleElement = document.querySelector('.titT') as HTMLElement;

		if (imgElement && titleElement) {
			// Set the view-transition-name properties directly
			imgElement.style.setProperty('view-transition-name', a);
			titleElement.style.setProperty('view-transition-name', 'title-view');
		}
	});
</script>

<div class="flex flex-wrap">
	<a href="dupe/a" class="flex flex-wrap">
		<div
			class="imgT z-10 h-56 w-56 bg-cover bg-no-repeat"
			style="--image: url('/example.jpg'); background-image: url('/example.jpg'); view-transition-name: var(--nigga);"
		></div>
		<h2 class="titT" style="--title: 'Example'; view-transition-name: var(--nigga2);">Example</h2>
	</a>
</div>
<!-- 
<style>
	.imgT {
		view-transition-name: var(--image);
		view-transition-name: mojcale;
	}
	.titT {
		view-transition-name: var(--title);
		view-transition-name: mojcale;
	}
</style> -->
