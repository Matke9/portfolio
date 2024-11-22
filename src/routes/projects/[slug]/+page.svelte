<!-- <script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(() => {
		// Get the DOM elements
		const imgElement = document.querySelector('.imgT') as HTMLElement;
		const titleElement = document.querySelector('.titT') as HTMLElement;

		if (imgElement && titleElement) {
			// Set the view-transition-name properties directly
			imgElement.style.setProperty('view-transition-name', `image-${data.project.imageUrl}`);
			titleElement.style.setProperty('view-transition-name', `title-${data.project.title}`);
			console.log(data.project.imageUrl);
		}
	});
</script>

<div class="flex flex-col flex-wrap">
	<div
		class="box-glow h-72 w-72 rounded-xl bg-[var()] bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent-light)] bg-cover bg-no-repeat p-1"
	>
		<div
			class="imgT h-full w-full rounded-xl bg-[var(--grey)] bg-cover bg-no-repeat"
			style="background-image: url('/projects/{data.project.imageUrl}');;"
		></div>
	</div>
	<h2 class="font-title titT transform text-3xl duration-200 ease-in-out hover:scale-105">
		{data.project.title}
	</h2>
</div> -->
<script lang="ts">
	export let data: {
		project: { slug: string; imageUrl: string; title: string; description: string };
	};
</script>

<div class="flex flex-col flex-wrap items-center">
	<div
		class="box-glow h-72 w-72 rounded-xl bg-[var()] bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent-light)] bg-cover bg-no-repeat p-1"
	>
		<div
			class="imgT h-full w-full rounded-xl bg-[var(--grey)] bg-cover bg-no-repeat"
			style={`background-image: url('/projects/${data.project.imageUrl}'); view-transition-name: image-${data.project.slug};`}
		></div>
	</div>
	<h2
		class="font-title titT transform text-3xl duration-200 ease-in-out hover:scale-105"
		style={`view-transition-name: title-${data.project.slug};`}
	>
		{data.project.title}
	</h2>

	<!-- Description -->
	<p class="mt-4 flex w-72 text-wrap text-base">{data.project.description}</p>
</div>
