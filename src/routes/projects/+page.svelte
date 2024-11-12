<script lang="ts">
import { firestore } from '$lib/firebase';  // Import the initialized firestore
import { collection, getDocs } from 'firebase/firestore';
import { onMount } from 'svelte';

  let projects: any[] = [];  // Variable to store the fetched project data

  // Fetch projects from Firestore
  onMount(async () => {
    const querySnapshot = await getDocs(collection(firestore, 'projects'));
    projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
</script>

<div class="flex flex-wrap">
    {#each projects as project}
    <div class="z-[1] project-card rounded-xl bg-[var(--grey)] bg-cover
     bg-no-repeat w-56 h-56 flex flex-wrap flex-col justify-end m-6"
      style="background-image: url(projects/{project.imageUrl})">
      <div class="absolute l-0 t-0 bg-gradient-to-t from-[#000000ff] via-[#00000000] via-80% to-[#00000000]
       w-56 h-56"></div>
      <div class="flex flex-wrap flex-col justify-end p-2">
        <h2 class="z-[1] font-title text-lg">{project.title}</h2>
        <p class="z-[1]">
          {project.description.length > 50 
            ? `${project.description.slice(0, 50)}...` 
            : project.description}
        </p>
      </div>
    </div>
    {/each}
</div>
<style>
</style>
