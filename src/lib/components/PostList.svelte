<script>
  import Post from './Post.svelte';
  export let posts = [];
</script>
<div class="post-list">
  {#each posts as post}
  <Post {post} />
  {/each}
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