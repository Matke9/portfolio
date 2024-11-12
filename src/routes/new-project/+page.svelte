<script lang="ts">
import { firestore } from '$lib/firebase';  // Import the initialized firestore
import { collection, addDoc } from 'firebase/firestore';

  let title = '';
  let description = '';
  let slug = '';
  let imageUrl = '';


  // Handle form submissions
  const handleSubmit = async () => {
    if (imageUrl === '') return alert('Please select an image');
    if (title === '') return alert('Title required');
    if (description === '') return alert('Description required');
    if (slug === '') return alert('Slug required');

    try {
      await addDoc(collection(firestore,'projects'), {
        description,
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

<div class="text-black flex flex-col justify-between h-80 w-[25em] p-10 bg-[var(--grey)] rounded-xl">
  <input class="rounded" type="text" bind:value={title} placeholder="Project Title" />
  <textarea class="rounded" bind:value={description} placeholder="Project Description"></textarea>
  <input class="rounded" type="text" bind:value={slug} placeholder="Project Slug" />
  <input class="rounded" type="text" bind:value={imageUrl} placeholder="Image Url" />
  <button class="h-10 w-32 bg-[var(--accent-dark)] rounded" on:click={handleSubmit}>Submit Project</button>
</div>
<style>
</style>