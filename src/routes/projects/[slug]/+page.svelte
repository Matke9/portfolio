<script lang="ts">
	export let data: {
		project: {
			slug: string;
			imageUrl: string;
			skills: string;
			title: string;
			description: string;
		};
	};

	// Convert skills into an array
	let skillsList = data.project.skills.split(',').map((skill) => skill.trim());
</script>

<div class="flex flex-col items-center gap-10 p-6 md:flex-row md:items-start md:p-10">
	<!-- Text Section -->
	<div class="flex flex-col items-center md:w-1/2 md:items-start">
		<!-- Title -->
		<h1
			class="font-title text-center text-3xl font-bold transition-transform duration-200 ease-in-out hover:scale-105 md:text-left md:text-4xl"
			style={`view-transition-name: title-${data.project.slug};`}
		>
			{data.project.title}
		</h1>

		<!-- Description -->
		<p class="mt-4 max-w-xl text-center text-lg text-white md:text-left">
			{data.project.description}
		</p>
	</div>

	<!-- Image & Skills Section -->
	<div class="flex flex-col items-center md:w-1/2">
		<!-- Project Image -->
		<div
			class="box-glow h-64 w-64 rounded-xl bg-gradient-to-t from-[var(--accent-dark)] to-[var(--accent-light)] p-1 md:h-72 md:w-72"
		>
			<div
				class="h-full w-full rounded-xl bg-[var(--grey)] bg-cover bg-no-repeat"
				style={`background-image: url('/projects/${data.project.imageUrl}'); view-transition-name: image-${data.project.slug};`}
			></div>
		</div>

		<!-- Skills List -->
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
	</div>
</div>

<style>
	.box-glow {
		box-shadow: 0px 0px 10px var(--accent-light);
	}
</style>
