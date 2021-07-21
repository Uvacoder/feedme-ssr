<script>
  import Icon from './Icon.svelte';
  // buttonType:
  // 'button': will be an actual button element,
  // 'link': an anchor tag, styled like a button
  export let buttonType = 'button';

  //buttonStyle:
  // 'icon': just the icon, no text,
  // 'iconText': icon and text
  // 'imageText': image and text
  // 'text': just the text
  export let buttonStyle = 'text';

  export let title = '';
  export let iconName;
  export let href;
  export let order = 'reversed';
  export let image;

</script>

{#if buttonType === 'button'}
  <button aria-label="{title}">
    <span class="button-inner">
      {#if buttonStyle === 'icon'}
        <Icon name={iconName} />
      {:else if buttonStyle === 'iconText'}
      <span class="text" style="{order === 'reversed' ? 2 : 1}">
        {title}
      </span>
      <div class="icon" style="order:{order === 'reversed' ? 1 : 2}">
        <Icon name={iconName} />
      </div>
      {:else if buttonStyle === 'imageText'}
        <span class="text" style="{order === 'reversed' ? 2 : 1}">
          {title}
        </span>
        <div class="icon" style="order:{order === 'reversed' ? 1 : 2}">
          <img src={image} alt={title}>
        </div>
      {:else}
        {title}
      {/if}
    </span>
  </button>
{:else}
  <a href="{href}" class="button">
    <span class="button-inner">
      {#if buttonStyle === 'icon'}
        <Icon name={iconName} />
      {:else if buttonStyle === 'iconText'}
      <span class="text" style="{order === 'reversed' ? 2 : 1}">
        {title}
      </span>
      <div class="icon" style="order:{order === 'reversed' ? 1 : 2}">
        <Icon name={iconName} />
      </div>
      {:else if buttonStyle === 'imageText'}
        <span class="text" style="{order === 'reversed' ? 2 : 1}">
          {title}
        </span>
        <div class="icon" style="order:{order === 'reversed' ? 1 : 2}">
          <img src={image} alt={title}>
        </div>
      {:else}
        {title}
      {/if}
    </span>
  </a>
{/if}

<style>
  .button-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    color: currentColor;
  }
  .button:visited {
    color: var(--light);
  }
  img {
    width: 1em;
    height: 1em;
  }
</style>