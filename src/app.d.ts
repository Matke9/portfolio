// src/app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		'view-transition-name'?: string; // Custom attribute for View Transitions API
	}
}

export {};
