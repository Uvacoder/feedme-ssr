<script>
  import { fade } from 'svelte/transition';
  import {format} from 'timeago.js';
  import PostContent from './PostContent.svelte';
  import Icon from './Icon.svelte';
  export let post;
  let open = false;
  let isRead = false;

  function handleToggle(event) {
    open = event.target.open;
    readTimer();
  }

  function readTimer() {
    setTimeout(() => {
      isRead = true;
    }, 2000);
  }
</script>


<details class="post" on:toggle={handleToggle}>
  <summary 
    class="post-header" 
    aria-label="{post.title || ''}. Press space or click to open content."
  >
  <div class="post-header-summary">
    <div class="post-image">
      {#if post.feed_image}
      <a href={post.feed_link || ''} tabindex="-1">
        <img src="{post.feed_image || ''}" alt="{post.feed_name || ''}" class="feed-image" tabindex="-1">
      </a>
      {/if}
    </div>
    <div class="post-header-content">
      <div class="post-header-control">
        <!-- <a href="#post-{post.guid}" class="button focused-only post-skip-content">Skip to Post Content</a> -->
        <h2 class="post-title">
          {post.title || ''}
        </h2>
      </div>
      <div class="post-info">
        <div class="post-meta"><a href="{post.feed_link || ''}" tabindex="-1">{post.feed_name || ''}</a>: <time>{format(new Date(post.pubdate))}</time></div>
      </div>
    </div>
  </div>
</summary>
{#if open}
<PostContent content={post["content:encoded"] || post.content} />

<div class="post-control-icons" transition:fade>
  <div class="post-control-icon">
    <Icon name="star" size="1.5"/>
  </div>
  <div class="post-control-icon">
    <Icon name="tag" size="1.5"/>
  </div>
  <div class="post-control-icon">
    <Icon name="share" size="1.5"/>
  </div>
  <div class="post-control-icon">
    {#if isRead}
    <Icon name="read" size="1.5"/>
    {:else}
    <Icon name="unread" size="1.5"/>
    {/if}
  </div>
</div>
{/if}
  
</details>

<style>
   .post {
    --flow-space: var(--size-700);
    display: flex;
    flex-direction: column;
    /* padding: var(--space-500); */
  }
  .post:focus-within, .post:focus {
    outline-color: transparent;
  }
  .post *:focus {
    outline: 2px solid var(--accent-primary);
    outline-offset: -2px;
  }

  .post  * {
    background: transparent;
  }

  .post-header {
    font-family: var(--sans);
    display: flex;
    flex-direction: column;
    order: 1;
    padding: 1rem;
    gap: 1rem;
  }
  .post-header-summary {
    display: flex;
    gap: var(--space-500);
  }
  .post-header-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .post-header-control {
    display: flex;
    flex-direction: column;
    order: 2;
    justify-content: space-between;
  }

  .post-info {
    order: 1;
    display: flex;
    gap: 1rem;
    font-size: var(--font-1);
    /* width: 0;
    height: 0;
    overflow: hidden; */
  }
  .feed-image {
    display: flex;
    justify-content: center;
    align-items: start;
    width: var(--space-700);
    height: var(--space-700);
  }
  .post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
    letter-spacing: 0.125rem;
  }
  .post-title {
    order: 1;
    font-size: var(--font-2);
    margin-top: 0;
    line-height: 1.5;
  }
  .post-control-icons {
    order: 2;
    display: flex;
    justify-content: space-around;
    /* max-width: 40rem; */
  }
  .post-control-icon:hover {
    color: var(--primary-light);
  }
  time {
    font-family: var(--sans);
    color: rgb(var(--light-rgb), 0.8);
    font-weight: 500;
  }
  details > summary {
    list-style: none;
  }

  details > summary::-webkit-details-marker {
    display: none;
  }
  summary a {
    color: var(--primary-light);
    text-decoration: none;
    }
    summary a:hover {
    text-decoration: underline;
    color: var(--primary-light-hover);
  }

  :global(.post ul li), :global(.post ol li) {
    margin-inline-start: 1rem;
  }
  :global(.post ul li li), :global(.post ol li li) {
    margin-inline-start: 2rem;
  }

  @media screen and (min-width: 768px) {
    .post {
      padding: 0.5rem 0 0.5rem 1rem;
    }
    .post-info {
      width: unset;
      height: unset;
      overflow: auto;
    }
  }
</style>