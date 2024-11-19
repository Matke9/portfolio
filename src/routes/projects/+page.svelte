<script lang="ts">
	import { firestore } from '$lib/firebase'; // Import the initialized firestore
	import { collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let projects: any[] = []; // Variable to store the fetched project data

	// Fetch projects from Firestore
	onMount(async () => {
		const querySnapshot = await getDocs(collection(firestore, 'projects'));
		projects = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		setTimeout(() => {
			console.log(getComputedStyle(document.documentElement).getPropertyValue('--image'));
			console.log(getComputedStyle(document.documentElement).getPropertyValue('--title'));
		}, 100);
	});
</script>

<div class="flex flex-wrap">
	{#each projects as project}
		<a
			href="projects/{project.slug}"
			class="imgT z-[1] m-6 flex
     h-56 w-56 flex-col flex-wrap justify-end rounded-xl bg-[var(--grey)] bg-cover bg-no-repeat"
			style="--image: url('projects/{project.imageUrl}'); background-image: var(--image);"
		>
			<div
				class="l-0 t-0 absolute h-56 w-56 bg-gradient-to-t from-[#000000ff] via-[#00000000]
       via-80% to-[#00000000]"
			></div>
			<div class="flex flex-col flex-wrap justify-end p-2">
				<h2 class="font-title titT z-[1] text-lg" style:--title={project.title}>
					{project.title}
				</h2>
				<p class="z-[1]">
					{project.description.length > 50
						? `${project.description.slice(0, 50)}...`
						: project.description}
				</p>
			</div>
		</a>
	{/each}
</div>

<style>
	.imgT {
		view-transition-name: var(--image);
	}
	.titT {
		view-transition-name: var(--title);
	}
</style>
