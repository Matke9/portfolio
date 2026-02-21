import { error } from '@sveltejs/kit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '$lib/firebase';

export async function load({ params }) {
	const q = query(collection(firestore, 'projects'), where('slug', '==', params.slug));
	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) throw error(404, 'Not found');

	const docSnap = querySnapshot.docs[0];
	const project = { id: docSnap.id, ...docSnap.data() };

	return { project };
}
