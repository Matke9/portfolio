<script lang="ts">
	import { firestore } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let projects: any[] = [];
	let selectedTag = 'All';

	const tagColorClasses = [
		'bg-emerald-700/70 text-emerald-200',
		'bg-blue-700/70 text-blue-200',
		'bg-purple-700/70 text-purple-200',
		'bg-yellow-700/70 text-yellow-200',
		'bg-pink-700/70 text-pink-200'
	];

	function tagColor(tag: string): string {
		let hash = 0;
		for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
		return tagColorClasses[Math.abs(hash) % tagColorClasses.length];
	}

	function resolveImageUrl(url: string): string {
		return url?.startsWith('http') ? url : `/projects/${url}`;
	}

	$: allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags ?? [])))];
	$: filtered =
		selectedTag === 'All'
			? projects
			: projects.filter((p) => (p.tags ?? []).includes(selectedTag));

	onMount(async () => {
		const querySnapshot = await getDocs(collection(firestore, 'projects'));
		projects = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	});
</script>

<div class="flex h-full w-full flex-col content-center">
	<h1
		class="page-title relative top-16 mb-20 transform self-center text-center text-6xl duration-200 ease-in-out hover:scale-105"
	>
		PROJECTS
	</h1>

	<!-- Tag filter -->
	<div class="flex justify-center px-4 pb-2 pt-4">
		<select
			bind:value={selectedTag}
			class="cursor-pointer rounded-lg border border-[var(--accent-dark)] bg-[var(--grey)] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]"
		>
			{#each allTags as tag}
				<option value={tag}>{tag}</option>
			{/each}
		</select>
	</div>

	<!-- Cards grid -->
	<div
		class="grid grid-cols-1 justify-items-center gap-8 px-8 pb-12 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		{#each filtered as project}
			<a
				href="projects/{project.slug}"
				class="box-glow flex w-full max-w-sm flex-col overflow-hidden rounded-xl bg-[var(--grey)] duration-200 ease-in-out hover:scale-105"
			>
				<!-- Image -->
				<div
					class="h-48 w-full bg-cover bg-center bg-no-repeat"
					style={`background-image: url('${resolveImageUrl(project.imageUrl)}'); view-transition-name: image-${project.slug};`}
				></div>

				<!-- Content -->
				<div class="flex flex-1 flex-col gap-2 p-4">
					<!-- Title -->
					<h2
						class="font-title text-xl font-bold text-white"
						style={`view-transition-name: title-${project.slug};`}
					>
						{project.title}
					</h2>

					<!-- Short description -->
					{#if project.shortDescription}
						<p class="line-clamp-3 text-sm text-gray-300">{project.shortDescription}</p>
					{/if}

					<!-- Tags -->
					{#if project.tags && project.tags.length > 0}
						<div class="mt-1 flex flex-wrap gap-1">
							{#each project.tags as tag}
								<span class="rounded-full px-2 py-0.5 text-xs font-medium {tagColor(tag)}">{tag}</span>
							{/each}
						</div>
					{/if}

					<!-- Skills pills -->
					{#if project.skills}
						<div class="mt-auto flex flex-wrap gap-1 pt-2">
							{#each project.skills
								.split(',')
								.map((s: string) => s.trim())
								.filter(Boolean) as skill}
								<span class="rounded-md bg-[var(--accent-dark)]/50 px-2 py-0.5 text-xs text-white"
									>{skill}</span
								>
							{/each}
						</div>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.page-title {
		text-shadow: var(--accent-light) 0px 0px 19px;
	}
</style>
