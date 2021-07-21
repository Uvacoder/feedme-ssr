<script context="module">
  export const load = async ({page, fetch, session, context}) => {
    const response = await fetch('/feeds.json');

    const data = await response.json();
        return {
        props: {
          feeds: data?.allFeeds
        }
      }
  }
</script>

<script>
  import { sortByPubDate } from '$lib/utils/sortByPubDate.js';
  import PostList from '$lib/components/PostList.svelte';
  export let feeds;

  
  const combineFeedArrays = (feedArray) => {
    let combined = [];
    feedArray.forEach((feed) => {
      feed.items.forEach((item) => {
        combined.push(
          {
            ...item,
            feedTitle: feed.title,
            feedImage: feed.image?.url || '',
            feedLink: feed?.link,
          }
          );
      });
    });
    return combined;
  };

  const posts = sortByPubDate(combineFeedArrays(feeds));

</script>

<PostList {posts} />
