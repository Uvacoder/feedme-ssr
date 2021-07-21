<script>
  import '$lib/style/global.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { session } from '$app/stores';
  import { goto } from '$app/navigation';
  import { authed } from '$lib/stores/user.store.js';
  import { feeds } from '$lib/stores/feeds.store.js';
  import { getFeeds } from '$lib/services/feeds.service.js';

  import Sidebar from '$lib/components/partials/Sidebar.svelte';
  import Header from '$lib/components/partials/Header.svelte';

  // if(browser) {
  //   $session = supabase.auth.session();

  //   supabase.auth.onAuthStateChange((event, supaBaseSession) => {
  //     $session = supaBaseSession;
  //   });

  //   if($session?.user.aud === 'authenticated') {
  //     $authed = true;
  //   } else {
  //     $authed = false;
  //   }
    
  //   goto('/');
  // }

  onMount(async() => {
    const feedResponse = await getFeeds();

    feedResponse.forEach((feed) => {
      $feeds[feed.slug] = feed;
    });
  });

</script>

<Header />

<section class="app">
  <main id="main-content" class="posts" tabindex="0" aria-label="All Posts" role="main">
    <slot></slot>
  </main>
  <aside id="sidebar">
    <Sidebar />
  </aside>
</section>

<style>
  .app {
    grid-area: app;
    position: relative;
    /* display: flex;
    flex-direction: column; */
  }
  main {
    position: absolute;
    top: calc(var(--ui-header-height) * 3);
    left: 0;
    right: 0;
    bottom: 0;
    /* z-index: -1; */
  }

  #sidebar {
    position: fixed;
    top: calc((var(--ui-header-height) * 2) - 0.75rem);
    left: 0;
    /* width: 100vw; */
    order: 1;
    border-inline-end: 1px solid rgb(var(--primary-rgb), 0.5);
    display: flex;
    flex-direction: column;
    z-index: 100;
    /* pointer-events: none; */
  }

  :global(#sidebar > .sidebar-menu), :global(#sidebar > .menu-button) {
    pointer-events: all;
  }
  #main-content:focus, #main-content:focus-within {
    outline: 2px solid rgb(var(--primary-rgb), 0.5);
  }
  .posts:focus, .posts:focus-within {
    background: rgb(var(--darkdark-rgb), 0.6);
  }
  
  .posts:focus {
    /* outline: 2px solid var(--accent-primary); */
    outline-offset: -2px;
  }

  @media screen and (min-width: 768px) {
    .app {
      display: flex;
      flex-wrap: wrap;
    }
    main {
      position: unset;
      margin-left: 20rem;
      order: 2;
      flex-basis: 0;
      flex-grow: 999;
      min-width: 50%;
      max-height: 100%;
      margin-top: var(--ui-header-height);
    }
    #sidebar {
      width: calc(20rem + 1px);
      top: var(--ui-header-height);
      /* position: unset; */
      /* flex-basis: 20rem; */

      /* flex-grow: 1; */
      /* transform: unset; */
      /* margin-top: var(--ui-header-height); */
    }
  }
</style>