<script lang="ts">
	import { firestore } from '$lib/firebase';
	import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let existingProjects: any[] = [];
	let selectedId = '';

	let title = '';
	let slug = '';
	let shortDescription = '';
	let description = '';
	let imageUrl = '';
	let skills = '';
	let tags: string[] = [];
	let links: { name: string; url: string }[] = [];
	let gallery: string[] = [];

	let newTag = '';
	let showDeleteConfirm = false;
	let deleteConfirmSlug = '';

	const shortDescMax = 120;

	onMount(async () => {
		await loadProjects();
	});

	async function loadProjects() {
		const snap = await getDocs(collection(firestore, 'projects'));
		existingProjects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
	}

	function selectProject(id: string) {
		selectedId = id;
		showDeleteConfirm = false;
		deleteConfirmSlug = '';
		if (!id) {
			clearForm();
			return;
		}
		const p = existingProjects.find((p) => p.id === id);
		if (!p) return;
		title = p.title ?? '';
		slug = p.slug ?? '';
		shortDescription = p.shortDescription ?? '';
		description = p.description ?? '';
		imageUrl = p.imageUrl ?? '';
		skills = p.skills ?? '';
		tags = Array.isArray(p.tags) ? [...p.tags] : [];
		links = Array.isArray(p.links) ? p.links.map((l: any) => ({ name: l.name ?? '', url: l.url ?? '' })) : [];
		gallery = Array.isArray(p.gallery) ? [...p.gallery] : [];
	}

	function clearForm() {
		title = '';
		slug = '';
		shortDescription = '';
		description = '';
		imageUrl = '';
		skills = '';
		tags = [];
		links = [];
		gallery = [];
	}

	function addTag() {
		const t = newTag.trim();
		if (t && !tags.includes(t)) tags = [...tags, t];
		newTag = '';
	}

	function removeTag(tag: string) {
		tags = tags.filter((t) => t !== tag);
	}

	function addLink() {
		links = [...links, { name: '', url: '' }];
	}

	function removeLink(i: number) {
		links = links.filter((_, idx) => idx !== i);
	}

	function addGalleryItem() {
		gallery = [...gallery, ''];
	}

	function removeGalleryItem(i: number) {
		gallery = gallery.filter((_, idx) => idx !== i);
	}

	function validate(): boolean {
		if (!title) { alert('Title required'); return false; }
		if (!slug) { alert('Slug required'); return false; }
		if (!description) { alert('Description required'); return false; }
		if (!skills) { alert('Skills required'); return false; }
		return true;
	}

	function buildData() {
		return {
			title,
			slug,
			shortDescription,
			description,
			imageUrl,
			skills,
			tags,
			links: links.filter((l) => l.name || l.url),
			gallery: gallery.filter(Boolean)
		};
	}

	async function handleCreate() {
		if (!validate()) return;
		try {
			await addDoc(collection(firestore, 'projects'), buildData());
			alert('Project created!');
			await loadProjects();
			selectedId = '';
			clearForm();
		} catch (e) {
			console.error(e);
			alert('Error creating project');
		}
	}

	async function handleSave() {
		if (!selectedId) { alert('No project selected'); return; }
		if (!validate()) return;
		try {
			await updateDoc(doc(firestore, 'projects', selectedId), buildData());
			alert('Project updated!');
			await loadProjects();
		} catch (e) {
			console.error(e);
			alert('Error updating project');
		}
	}

	async function handleDelete() {
		if (!selectedId) return;
		const p = existingProjects.find((p) => p.id === selectedId);
		if (deleteConfirmSlug !== p?.slug) {
			alert('Slug does not match');
			return;
		}
		try {
			await deleteDoc(doc(firestore, 'projects', selectedId));
			alert('Project deleted!');
			await loadProjects();
			selectedId = '';
			clearForm();
		} catch (e) {
			console.error(e);
			alert('Error deleting project');
		}
	}

	$: selectedProject = existingProjects.find((p) => p.id === selectedId);
</script>

<div class="mx-auto w-full max-w-2xl px-4 py-10 text-white">
	<h1 class="mb-6 text-3xl font-bold text-[var(--accent-light)]">Project Admin</h1>

	<!-- Project selector -->
	<div class="mb-6">
		<label for="project-select" class="mb-1 block text-sm font-semibold text-[var(--accent-light)]">Select Project</label>
		<select
			id="project-select"
			class="w-full cursor-pointer rounded-lg border border-[var(--accent-dark)] bg-[var(--grey)] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]"
			on:change={(e) => selectProject((e.target as HTMLSelectElement).value)}
			value={selectedId}
		>
			<option value="">— New Project —</option>
			{#each existingProjects as p}
				<option value={p.id}>{p.title} ({p.slug})</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col gap-4 rounded-xl bg-[var(--grey)] p-6">
		<!-- Title -->
		<div>
			<label for="field-title" class="mb-1 block text-sm font-semibold text-[var(--accent-light)]">Title *</label>
			<input
				id="field-title"
				class="w-full rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
				type="text"
				bind:value={title}
				placeholder="Project Title"
			/>
		</div>

		<!-- Slug -->
		<div>
			<label for="field-slug" class="mb-1 block text-sm font-semibold text-[var(--accent-light)]">Slug *</label>
			<input
				id="field-slug"
				class="w-full rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
				type="text"
				bind:value={slug}
				placeholder="project-slug"
			/>
		</div>

		<!-- Short Description -->
		<div>
			<label for="field-short-desc" class="mb-1 flex justify-between text-sm font-semibold text-[var(--accent-light)]">
				<span>Short Description</span>
				<span class="{shortDescription.length > shortDescMax ? 'text-red-400' : 'text-gray-400'}"
					>{shortDescription.length}/{shortDescMax}</span
				>
			</label>
			<input
				id="field-short-desc"
				class="w-full rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
				type="text"
				bind:value={shortDescription}
				maxlength={shortDescMax}
				placeholder="Short description (max 120 chars)"
			/>
		</div>

		<!-- Description -->
		<div>
			<label for="field-desc" class="mb-1 block text-sm font-semibold text-[var(--accent-light)]"
				>Description *</label
			>
			<textarea
				id="field-desc"
				class="min-h-24 w-full rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
				bind:value={description}
				placeholder="Full description"
			></textarea>
		</div>

		<!-- Image URL -->
		<div>
			<label for="field-image" class="mb-1 block text-sm font-semibold text-[var(--accent-light)]">Image URL</label>
			<input
				id="field-image"
				class="w-full rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
				type="text"
				bind:value={imageUrl}
				placeholder="filename.jpg or https://..."
			/>
		</div>

		<!-- Skills -->
		<div>
			<label for="field-skills" class="mb-1 block text-sm font-semibold text-[var(--accent-light)]">
				Skills * <span class="font-normal text-gray-400">(comma-separated)</span>
			</label>
			<input
				id="field-skills"
				class="w-full rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
				type="text"
				bind:value={skills}
				placeholder="React, TypeScript, Firebase"
			/>
		</div>

		<!-- Tags -->
		<div>
			<p class="mb-1 text-sm font-semibold text-[var(--accent-light)]">Tags</p>
			<div class="mb-2 flex gap-2">
				<input
					id="field-new-tag"
					class="flex-1 rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
					type="text"
					bind:value={newTag}
					placeholder="Add tag..."
					on:keydown={(e) => e.key === 'Enter' && addTag()}
					aria-label="New tag"
				/>
				<button
					class="rounded-lg bg-[var(--accent-dark)] px-4 py-2 text-white hover:bg-[var(--accent-light)] hover:text-black"
					on:click={addTag}>Add</button
				>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each tags as tag}
					<span
						class="flex items-center gap-1 rounded-full bg-[var(--accent-dark)]/60 px-3 py-1 text-sm text-white"
					>
						{tag}
						<button
							class="ml-1 text-white/70 hover:text-white"
							on:click={() => removeTag(tag)}
							aria-label="Remove tag">✕</button
						>
					</span>
				{/each}
			</div>
		</div>

		<!-- Links -->
		<div>
			<p class="mb-1 text-sm font-semibold text-[var(--accent-light)]">Links</p>
			{#each links as link, i}
				<div class="mb-2 flex gap-2">
					<input
						class="flex-1 rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
						type="text"
						bind:value={links[i].name}
						placeholder="Link name"
					/>
					<input
						class="flex-1 rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
						type="text"
						bind:value={links[i].url}
						placeholder="https://..."
					/>
					<button
						class="rounded-lg bg-red-700/60 px-3 py-2 text-white hover:bg-red-600"
						on:click={() => removeLink(i)}
						aria-label="Remove link">✕</button
					>
				</div>
			{/each}
			<button
				class="rounded-lg border border-[var(--accent-dark)] px-4 py-2 text-sm text-[var(--accent-light)] hover:bg-[var(--accent-dark)]/30"
				on:click={addLink}>+ Add Link</button
			>
		</div>

		<!-- Gallery -->
		<div>
			<p class="mb-1 text-sm font-semibold text-[var(--accent-light)]">Gallery</p>
			{#each gallery as _, i}
				<div class="mb-2 flex gap-2">
					<input
						class="flex-1 rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
						type="text"
						bind:value={gallery[i]}
						placeholder="filename.jpg or https://..."
					/>
					<button
						class="rounded-lg bg-red-700/60 px-3 py-2 text-white hover:bg-red-600"
						on:click={() => removeGalleryItem(i)}
						aria-label="Remove gallery item">✕</button
					>
				</div>
			{/each}
			<button
				class="rounded-lg border border-[var(--accent-dark)] px-4 py-2 text-sm text-[var(--accent-light)] hover:bg-[var(--accent-dark)]/30"
				on:click={addGalleryItem}>+ Add Gallery Item</button
			>
		</div>
	</div>

	<!-- Action Buttons -->
	<div class="mt-6 flex flex-wrap gap-4">
		{#if selectedId}
			<button
				class="rounded-lg bg-[var(--accent-dark)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--accent-light)] hover:text-black"
				on:click={handleSave}>Save Updates</button
			>
		{/if}
		<button
			class="rounded-lg bg-[var(--dark-green)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
			on:click={handleCreate}>Create New</button
		>
	</div>

	<!-- Danger Zone -->
	{#if selectedId}
		<div class="mt-8 rounded-xl border border-red-700/60 bg-red-950/20 p-6">
			<h2 class="mb-3 text-lg font-bold text-red-400">Danger Zone</h2>
			{#if !showDeleteConfirm}
				<button
					class="rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-600"
					on:click={() => {
						showDeleteConfirm = true;
						deleteConfirmSlug = '';
					}}>Delete Project</button
				>
			{:else}
				<p class="mb-2 text-sm text-red-300">
					Type the project slug <strong>{selectedProject?.slug}</strong> to confirm deletion:
				</p>
				<div class="flex gap-3">
					<input
						class="flex-1 rounded-lg bg-[var(--dark-grey)] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
						type="text"
						bind:value={deleteConfirmSlug}
						placeholder="Enter slug to confirm"
					/>
					<button
						class="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-600 disabled:opacity-50"
						on:click={handleDelete}
						disabled={deleteConfirmSlug !== selectedProject?.slug}>Confirm Delete</button
					>
					<button
						class="rounded-lg bg-[var(--grey)] px-4 py-2 text-white hover:bg-[var(--dark-grey)]"
						on:click={() => {
							showDeleteConfirm = false;
							deleteConfirmSlug = '';
						}}>Cancel</button
					>
				</div>
			{/if}
		</div>
	{/if}
</div>
