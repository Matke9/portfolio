<script lang="ts">
	import { firestore } from '$lib/firebase'; // Import the initialized firestore
	import { collection, addDoc } from 'firebase/firestore';

	let title = '';
	let description = '';
	let skills = '';
	let slug = '';
	let imageUrl = '';

	// Handle form submissions
	const handleSubmit = async () => {
		if (imageUrl === '') return alert('Please select an image');
		if (title === '') return alert('Title required');
		if (description === '') return alert('Description required');
		if (skills === '') return alert('Skills required');
		if (slug === '') return alert('Slug required');

		try {
			await addDoc(collection(firestore, 'projects'), {
				description,
				skills,
				imageUrl,
				slug,
				title
			});

			alert('Project added successfully!');
		} catch (error) {
			console.error('Error uploading project:', error);
			alert('Error uploading project');
		}
	};
</script>

<div
	class="flex h-80 w-[25em] flex-col justify-between rounded-xl bg-[var(--grey)] p-10 text-black"
>
	<input class="rounded" type="text" bind:value={title} placeholder="Project Title" />
	<textarea class="rounded" bind:value={description} placeholder="Project Description"></textarea>
	<textarea class="rounded" bind:value={skills} placeholder="Skills learned"></textarea>
	<input class="rounded" type="text" bind:value={slug} placeholder="Project Slug" />
	<input class="rounded" type="text" bind:value={imageUrl} placeholder="Image Url" />
	<button class="h-10 w-32 rounded bg-[var(--accent-dark)]" on:click={handleSubmit}
		>Submit Project</button
	>
</div>

<style>
</style>
