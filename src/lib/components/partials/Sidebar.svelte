<script>
  import { feeds } from '$lib/stores/feeds.store.js';
  import Button from '$lib/components/Button.svelte';
</script>

  <div class="menu-button">
    <Button buttonType="button" buttonStyle="iconText" iconName="menuOpen" title="Menu" />
  </div>

  <ul class="sidebar-menu">
    <li class="sidebar-menu-item">
      <Button buttonType="link" prefetch="true" buttonStyle="iconText" iconName="listSettings" href="/settings" title="Edit Feeds" />
    </li>

    <li class="sidebar-menu-item">
      <Button buttonType="link" prefetch="true" buttonStyle="iconText" iconName="feed" href="/" title="All Posts" /> 
    </li>
    {#each Object.values($feeds) as feed}
      <li class="sidebar-menu-item">
        <Button 
          buttonType="link"
          prefetch="true" 
          buttonStyle={feed.image ? 'imageText' : 'iconText'}
          iconName="rss"
          image={feed.image ? feed.image : ''} 
          href="/feeds/{feed.slug}" title={feed.name} /> 
      </li>
    {/each}
  </ul>

<style>
  .menu-button {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: var(--ui-header-height);
    width: 100vw;
    z-index: 200;
    border-bottom: 1px solid rgb(var(--primary-light-rgb), 0.5);
    border-top: 1px solid rgb(var(--primary-light-rgb), 0.5);
  }
  :global(.menu-button > button) {
    display: block;
    width: 100%;
    font-size: var(--font-600);
    background: var(--dark);
  }

  .menu-button:hover + .sidebar-menu,
  .menu-button:focus + .sidebar-menu,
  .menu-button:focus-within + .sidebar-menu,
  .menu-button:active + .sidebar-menu {
    left: 0;
  }
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: absolute;
  top: var(--ui-header-height);
  left: -100vw;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: var(--dark);
  transition: all 300ms ease-out;
  z-index: 100;
  pointer-events: none;
}
.sidebar-menu-item {
  padding: 0.5rem;
  pointer-events: all;
}

:global(.sidebar-menu-item > *) {
  /* height: var(--ui-header-height); */
  font-size: var(--font-2);
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
}

@media screen and (min-width: 768px) {
  .sidebar-menu {
    position: unset;
    width: unset;
  }
  .menu-button {
    width: 0;
    height: 0;
    overflow: hidden;
  }
}
</style>