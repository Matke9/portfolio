<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		setTimeout(() => {
			console.log(getComputedStyle(document.documentElement).getPropertyValue('--image'));
			console.log(getComputedStyle(document.documentElement).getPropertyValue('--title'));
		}, 100);
	});
</script>

<div class="flex flex-wrap">
	<a href="dupe/a" class="flex flex-wrap">
		<div
			class="imgT z-10 h-56 w-56 bg-cover bg-no-repeat"
			style="--image: url('/example.jpg'); background-image: url('/example.jpg');"
		></div>
		<h2 class="titT" style="--title: 'Example'; ">Example</h2>
	</a>
</div>

<style>
	.imgT {
		view-transition-name: var(--image);
	}
	.titT {
		view-transition-name: var(--title);
	}
</style>
