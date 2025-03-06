<script lang="ts">
	import { firestore } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let projects: any[] = [];

	onMount(async () => {
		const querySnapshot = await getDocs(collection(firestore, 'projects'));
		projects = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	});
</script>

<div class="flex h-full w-full flex-col flex-wrap content-center justify-center">
	<h1
		class="div absolute top-20 transform self-center text-center text-6xl duration-200 ease-in-out hover:scale-105"
	>
		PROJECTS
	</h1>
	<div class="flex flex-wrap justify-center">
		{#each projects as project}
			<a
				href="projects/{project.slug}"
				class="imgT box-glow z-[1] m-6 flex h-56 w-56 flex-col justify-end rounded-lg bg-[var(--grey)] duration-200 ease-in-out hover:scale-105 sm:h-64 sm:w-64 md:h-72 md:w-72"
			>
				<div class="relative h-56 w-56 rounded-lg sm:h-64 sm:w-64 md:h-72 md:w-72">
					<div class="absolute inset-0 h-full w-full rounded-lg">
						<div
							class="absolute top-0 h-[65%] w-full rounded-t-lg bg-cover bg-center bg-no-repeat"
							style={`background-image: url('/projects/${project.imageUrl}'); view-transition-name: image-${project.slug};`}
						></div>
						<div
							class="absolute bottom-0 h-[35%] w-full rounded-b-lg bg-gradient-to-t from-[--dark-green] to-[--accent-dark]"
						>
							<h2
								class="font-title titT m-3 text-xl sm:text-2xl md:text-3xl"
								style={`view-transition-name: title-${project.slug};`}
							>
								{project.title}
							</h2>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.div {
		text-shadow: var(--accent-light) 0px 0px 19px;
	}

	@media (max-width: 640px) {
		.imgT {
			max-width: 300px;
			height: auto;
			aspect-ratio: 1/1;
		}
	}
</style>
