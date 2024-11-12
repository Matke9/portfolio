import { error } from '@sveltejs/kit';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '$lib/firebase'; 

export async function load({ params }) {
  	let projects: any[] = []; 
	const querySnapshot = await getDocs(collection(firestore, 'projects'));
    projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
	const project = projects.find((project) => project.slug === params.slug);

	if (!project) throw error(404, 'Not found'); // Correct usage of `error`

	return {
		project
	};
}
