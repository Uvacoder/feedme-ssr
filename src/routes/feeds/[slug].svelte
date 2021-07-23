<script context="module">
  export const load = async ({page, fetch, session, context}) => {
    const { slug } = page.params;
    const response = await fetch(`/feeds/${slug}.json`);

    if(!response.error) {
      return {
        props: {
          data: await response.json(),
          error: null
        }
      }
    } else {
      return {
        props: {
          data: {},
          error: new Error(error),
        }
      }
    }
  };
</script>

<script>
  import { onMount, afterUpdate } from 'svelte';
  import { sortByPubDate } from '$lib/utils/sortByPubDate.js';
  import PostList from '$lib/components/PostList.svelte';
  export let data;
  export let error;

  let posts;

  function updatePosts() {
    posts = [...data.data];
  }

  afterUpdate(() => {
    updatePosts();
  })

  onMount(() => {
    updatePosts();
  });
</script>

{#if error}
<h2>{error}</h2>
{:else}
<PostList { posts } />
{/if}