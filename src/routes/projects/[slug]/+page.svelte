<script lang="ts">
	export let data: {
		project: {
			slug: string;
			imageUrl: string;
			skills: string;
			title: string;
			description: string;
			tags?: string[];
			links?: { name: string; url: string }[];
			gallery?: string[];
		};
	};

	const { project } = data;

	let skillsList = project.skills
		?.split(',')
		.map((s) => s.trim())
		.filter(Boolean) ?? [];

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

	function resolveUrl(url: string): string {
		return url?.startsWith('http') ? url : `/projects/${url}`;
	}

	function goBack() {
		window.history.back();
	}
</script>

<button on:click={goBack} class="fixed left-6 top-8 z-50 block md:hidden" aria-label="Go back">
	<svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M10.707 5.293a1 1 0 010 1.414L6.414 11H20a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
		/>
	</svg>
</button>

<div class="flex flex-col items-center gap-10 p-6 md:flex-row md:items-start md:p-10">
	<!-- Text Section -->
	<div class="flex flex-col items-center md:w-1/2 md:items-start">
		<!-- Title -->
		<h1
			class="font-title text-center text-3xl font-bold transition-transform duration-200 ease-in-out hover:scale-105 md:text-left md:text-4xl"
			style={`view-transition-name: title-${project.slug};`}
		>
			{project.title}
		</h1>

		<!-- Tags -->
		{#if project.tags && project.tags.length > 0}
			<div class="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
				{#each project.tags as tag}
					<span class="rounded-full px-3 py-1 text-sm font-medium {tagColor(tag)}">{tag}</span>
				{/each}
			</div>
		{/if}

		<!-- Description -->
		<p class="mt-4 max-w-xl text-center text-lg text-white md:text-left">
			{project.description}
		</p>

		<!-- Links -->
		{#if project.links && project.links.length > 0}
			<div class="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
				{#each project.links as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-lg bg-[var(--accent-dark)] px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 hover:scale-105 hover:bg-[var(--accent-light)] hover:text-black"
					>
						{link.name}
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Image & Skills Section -->
	<div class="flex flex-col items-center md:w-1/2">
		<!-- Project Image -->
		<div
			class="box-glow h-64 w-64 rounded-xl bg-gradient-to-t from-[var(--accent-dark)] to-[var(--accent-light)] p-1 md:h-72 md:w-72"
		>
			<div
				class="h-full w-full rounded-xl bg-[var(--grey)] bg-cover bg-center bg-no-repeat"
				style={`background-image: url('${resolveUrl(project.imageUrl)}'); view-transition-name: image-${project.slug};`}
			></div>
		</div>

		<!-- Skills List -->
		{#if skillsList.length > 0}
			<div class="mt-6 w-full">
				<h3 class="text-center text-lg font-semibold text-[var(--accent-light)] md:text-left">
					Skills Used:
				</h3>
				<ul class="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
					{#each skillsList as skill}
						<li class="rounded-lg bg-[var(--accent-dark)] px-3 py-1 text-white">{skill}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>

<!-- Gallery -->
{#if project.gallery && project.gallery.length > 0}
	<div class="px-6 pb-10 md:px-10">
		<h3 class="mb-3 text-lg font-semibold text-[var(--accent-light)]">Gallery</h3>
		<div class="flex gap-4 overflow-x-auto pb-2">
			{#each project.gallery as item}
				<img
					src={resolveUrl(item)}
					alt="Gallery"
					class="box-glow h-48 min-w-[12rem] max-w-xs rounded-xl object-cover"
				/>
			{/each}
		</div>
	</div>
{/if}

<style>
	.box-glow {
		box-shadow: 0px 0px 10px var(--accent-light);
	}
</style>
