<script context="module">
  export const load = async ({page, fetch, session, context}) => {
    const response = await fetch('/feeds.json');

    const data = await response.json();
      return {
        props: {
          posts: data?.allPosts
        }
      }
  }
</script>

<script>
  import { allPosts } from '$lib/stores/posts.store.js';
  import PostList from '$lib/components/PostList.svelte';
  export let posts;
</script>

<PostList posts={Object.values($allPosts)} />