<script>
  import { getStores, navigating, page, session } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { feeds } from '$lib/stores/feeds.store.js';
  import { authed } from '$lib/stores/user.store.js';
  import { getSingleFeed } from '$lib/services/feeds.service.js';
  import Logo from '$lib/components/Logo.svelte';
  import Button from '$lib/components/Button.svelte';
  
  let name;
  
  const getFeedName = () => {
    const pathArray = $page.path.split('/');
    const slug = pathArray[pathArray.length - 1];

    return $feeds[slug]?.name;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      console.error(error);
    } else {
      $authed = false;
    }
    goto('/');
  }

  onMount(() => {
    if($page.path !== '/') {
      name = getFeedName();
    }

    window.addEventListener('sveltekit:navigation-end', (event) => {
      if($page.path !== '/') {
        name = getFeedName();
      }
    });
  });

</script>

<header>
  <div class="main-section">
    <div class="skip-section">
      <a href="#main-content" class="button focused-only" id="skip-link">Skip to Content</a>
      <h1 class="sr-only" id="page-label">FeedMe - The Easy Feed Reader</h1>
    </div>

    <div class="title">
      {#if $page.path === '/'}
      <h2>All Posts</h2>
      {:else if $page.path === '/settings'}
      <h2>Settings</h2>
      {:else if $page.path === '/login'}
      <h2>Log In</h2>
      {:else}
      <h2>{name || 'Error'}</h2>
      {/if}
    </div>

    <div class="control">
      {#if $authed}
      <div class="header-button" on:click={signOut}>
        <Button title="Log Out" buttonType="button" buttonStyle="iconText" iconName="logOut" />
      </div>
      <div class="header-button">
        <Button title="Settings" buttonType="link" href="/settings" buttonStyle="iconText" iconName="settings" />
      </div>
      {:else}
      <div class="header-button" on:click={signOut}>
        <Button title="Log In" buttonType="link" href="/login" buttonStyle="iconText" iconName="logIn" />
      </div>
      {/if}
    </div>

  </div>

  <div class="sidebar-section">
    <a href="/" sveltekit:prefetch aria-labelledby="page-label" id="brand">
      <Logo />
    </a>
  </div>

</header>

<style>
  header {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
    overflow: hidden;
    background-color: var(--dark);
  }

  header > * {
    align-items: center;
    height: var(--ui-header-height);
  }
  .main-section {
    display: flex;
    order: 2;
    padding: 1rem 2rem;
    justify-content: space-between;
    flex-basis: 0;
    flex-grow: 999;
    min-width: 50%;
  }
  .sidebar-section {
    display: flex;
    align-items: flex-start;
    order: 1;
    border-bottom: 1px solid rgb(var(--primary-rgb), 0.5);
    padding: 1rem;
  }
  .title {
    order: 1;
  }
  .title h2 {
    font-size: var(--font-2);
  }
  .skip-section {
    order: 2;
  }
  .control {
    order: 3;
    display: flex;
    gap: 1rem;
  }
  @media screen and (min-width: 768px) {
    header {
      /* position: relative; */
      height: var(--ui-header-height);
      grid-area: header;
      flex-direction: row;
      justify-content: space-between;
    }
    .sidebar-section {
      --width: calc(20rem - 1px);
      flex-basis: var(--width);
      width: var(--width);
      flex-grow: 1;
      border-bottom: none;
      /* border-right: 1px solid rgb(var(--primary-rgb), 0.5); */
    }
  }
</style>