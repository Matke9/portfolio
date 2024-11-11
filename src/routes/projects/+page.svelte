<script lang="ts">
  import { getFirestore, collection, getDocs } from 'firebase/firestore';
  const firestore = getFirestore();

  let projects: any[] = [];  // Variable to store the fetched project data

  // Fetch projects from Firestore
  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'projects'));
    projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  // Run fetchProjects when the component loads
  fetchProjects();
</script>

<div class="flex flex-wrap">
    {#each projects as project}
    <div class="project-card">
      <h2>{project.title}</h2>
      <img src="{project.imageUrl}" alt="{project.title} image">
      <p>{project.description}</p>
      <p>Slug: {project.slug}</p>
    </div>
    {/each}
</div>
