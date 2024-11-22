<!-- <script lang="ts">
	import { firestore } from '$lib/firebase'; // Import the initialized firestore
	import { collection, getDocs } from 'firebase/firestore';
	import { onMount, tick } from 'svelte';

	let projects: any[] = []; // Variable to store the fetched project data

	// Fetch projects from Firestore
	onMount(async () => {
		const querySnapshot = await getDocs(collection(firestore, 'projects'));
		projects = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		await tick();

		const projectElements = document.querySelectorAll('.imgT') as NodeListOf<HTMLElement>;
		const titleElements = document.querySelectorAll('.titT') as NodeListOf<HTMLElement>;
		console.log(projectElements.length);
		projectElements.forEach((element, index) => {
			const project = projects[index];
			if (project) {
				element.style.setProperty('view-transition-name', `image-${project.imageUrl}`);
				console.log(project.imageUrl);
			}
		});

		titleElements.forEach((element, index) => {
			const project = projects[index];
			if (project) {
				element.style.setProperty('view-transition-name', `title-${project.title}`);
			}
		});
	});
</script>

<div class="flex flex-wrap">
	{#each projects as project}
		<a
			href="projects/{project.slug}"
			class="imgT z-[1] m-6 flex
     h-56 w-56 flex-col flex-wrap justify-end rounded-xl bg-[var(--grey)] bg-cover bg-no-repeat"
			style="background-image: url('projects/{project.imageUrl}');"
		>
			<div
				class="l-0 t-0 absolute h-56 w-56 bg-gradient-to-t from-[#000000ff] via-[#00000000]
       via-80% to-[#00000000]"
			></div>
			<div class="flex flex-col flex-wrap justify-end p-2">
				<h2 class="font-title titT z-[1] text-lg">
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
</div> -->
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

<div class="flex flex-wrap">
	{#each projects as project}
		<!-- <a
			href="/projects/{project.slug}"
			class="m-6 flex h-56 w-56 flex-col justify-end rounded-xl bg-cover bg-no-repeat"
			style={`background-image: url('/projects/${project.imageUrl}'); view-transition-name: image-${project.slug};`}
		>
			<div
				class="l-0 t-0 absolute h-56 w-56 bg-gradient-to-t from-[#000000ff] via-[#00000000]
       via-80% to-[#00000000]"
			></div>
			<h2 class="font-title z-[1] text-lg" style={`view-transition-name: title-${project.slug};`}>
				{project.title}
			</h2>
		</a> -->

		<a
			href="projects/{project.slug}"
			class="imgT z-[1] m-6 flex
     h-56 w-56 flex-col flex-wrap justify-end rounded-xl bg-[var(--grey)] bg-cover bg-no-repeat"
			style={`background-image: url('/projects/${project.imageUrl}'); view-transition-name: image-${project.slug};`}
		>
			<div
				class="l-0 t-0 absolute h-56 w-56 bg-gradient-to-t from-[#000000ff] via-[#00000000]
       via-80% to-[#00000000]"
			></div>
			<div class="flex flex-col flex-wrap justify-end p-2">
				<h2
					class="font-title titT z-[1] text-lg"
					style={`view-transition-name: title-${project.slug};`}
				>
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
