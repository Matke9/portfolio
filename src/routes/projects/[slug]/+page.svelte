<script>
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		setTimeout(() => {
			console.log(getComputedStyle(document.documentElement).getPropertyValue('--image'));
			console.log(getComputedStyle(document.documentElement).getPropertyValue('--title'));
		}, 100);
	});
</script>

<div class="flex flex-col flex-wrap">
	<div
		class="box-glow h-72 w-72 rounded-xl bg-[var()] bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent-light)] bg-cover bg-no-repeat p-1"
	>
		<div
			class="imgT h-full w-full rounded-xl bg-[var(--grey)] bg-cover bg-no-repeat"
			style="background-image: url('/projects/{data.project
				.imageUrl}'); --image: url('projects/{data.project.imageUrl}');"
		></div>
	</div>
	<h2
		class="font-title titT transform text-3xl duration-200 ease-in-out hover:scale-105"
		style:--title={data.project.title}
	>
		{data.project.title}
	</h2>
</div>

<style>
	.imgT {
		view-transition-name: var(--image);
	}
	.titT {
		view-transition-name: var(--title);
	}
</style>
