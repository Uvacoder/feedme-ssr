import { writable } from 'svelte/store';

export const loadedPosts = writable([]);

export let allPosts = writable({});