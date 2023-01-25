import { writable } from 'svelte/store';

function createFactorStore() {
	if (typeof localStorage === 'undefined') {
		return;
	}

	const stored = localStorage.getItem('budgetly_enrolled_factor');

	const factorStore = writable(stored ? JSON.parse(stored) : null);

	factorStore.subscribe((value) => {
		localStorage.setItem('budgetly_enrolled_factor', JSON.stringify(value));
	});

	return factorStore;
}

export const factorStore = createFactorStore();
