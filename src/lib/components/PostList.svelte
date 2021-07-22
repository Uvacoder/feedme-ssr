<script>
  import Post from '$lib/components/Post.svelte';
  export let posts = null;
</script>
<div class="post-list">
  {#if posts === null}
    <h2>Loading...</h2>
  {:else}
    {#each posts as post}
    <Post {post} />
    {/each}
  {/if}
</div>

<style>
  :global(.post-list details:nth-child(2n)) {
    background-color: var(--darkdark);
  }
  :global(.post-list details:nth-child(2n):hover) {
    background-color: rgb(var(--primary-rgb), 0.1);
  }
  :global(.post-list details:nth-child(2n+1):hover) {
    background-color: rgb(var(--primary-rgb), 0.1);
  }
</style>