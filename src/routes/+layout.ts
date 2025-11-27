// src/routes/+layout.ts
import { loadStateFromUrl } from '$lib/urlState';
import { browser } from '$app/environment';

export const load = () => {
	if (!browser) return {};
	return { urlState: loadStateFromUrl() };
};
