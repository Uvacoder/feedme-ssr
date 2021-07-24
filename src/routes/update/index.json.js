import { getFeeds } from '$lib/services/feeds.service';
import { updatePosts } from '$lib/services/posts.service';
import Parser from 'rss-parser';

const parser = new Parser();

const updateAllFeedPosts = async (feedArray) => {
  try {
    
    const feedsData = await getPostsFromRSS(feedArray);
    
    feedsData.map((settledFeed) => {
      settledFeed.value.feed.title = settledFeed.value.name || settledFeed.value.feed.title;
      const items = settledFeed.value.feed.items;
      const feedUrl = settledFeed.value.feed.feedUrl;
      const name = settledFeed.value.name;
      const image = settledFeed.value.feed.image?.url;
      
      updatePosts(items, name, feedUrl, image);
    });

  } catch (error) {
    return {
      ok: false,
      error: error
    }
  }

  return {
    ok: true,
    data: 'Success!'
  }
}

const getPostsFromRSS = async (feedArray) => {
  return await Promise.allSettled (feedArray.map(async(feedItem) => {
    return {
      name: feedItem.name,
      feed: await parser.parseURL(feedItem.feed_link)
    };
  }));
}

export const get = async() => {
  try {

    const data = await getFeeds();
    
    const allPosts = await updateAllFeedPosts(data);

    console.log('allPosts in /update', allPosts);

    return {
      body: {
        data: 'Success updating db with latest posts',
      }
    }
  } catch(e) {
    return {
      ok: false,
      error: e
    }
  }

}