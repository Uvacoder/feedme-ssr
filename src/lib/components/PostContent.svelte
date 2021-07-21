<script>
  import '$lib/style/prism-feedme-dark.css';
  import { onMount } from 'svelte';
  import { headDown } from '$lib/utils/headDown.js';
  import { strToHTML } from '$lib/utils/strToHTML.js';
  export let content;
  let stringContent;

  function prepareContent() {  
    const cleanedContent = headDown(content);
    const DOMContent = strToHTML(cleanedContent);
    stringContent = DOMContent.innerHTML;
  }
  onMount(() => {
    prepareContent();
  });
</script>
<svelte:head>
  <script src="/js/prism.js" defer></script>
</svelte:head>
<section class="content flow" tabindex="0">
  {@html stringContent}
</section>

<style>
  .content {
    order: 2;
    padding: 1rem;
    border-top: 1px solid rgb(var(--primary-rgb), 0.5);
    max-width: 98vw;
    overflow: auto;
  }
</style>