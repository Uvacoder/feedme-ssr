import { getAllPosts, getPostsByFeed, updatePosts } from '$lib/services/posts.service.js';
import { getFeeds } from '$lib/services/feeds.service.js';
import Parser from 'rss-parser';


const parser = new Parser();

/**
 * 
 * @param {array of feed objects} feedArray 
 * @returns array of data returned from all feeds in param array 
 */
const getAllFeedsPosts = async (feedArray) => {
  const storedPosts = await getAllPosts();

  if(storedPosts.length === 0) {

    const allFeedsPromise = feedArray.map(async(feedItem) => {
      return {
        name: feedItem.name,
        feed: await parser.parseURL(feedItem.feed_link)
      };
    });

    const feedsData = await Promise.allSettled(allFeedsPromise);
    
    feedsData.map((settledFeed) => {
      settledFeed.value.feed.title = settledFeed.value.name || settledFeed.value.feed.title;
      const items = settledFeed.value.feed.items;
      const feedUrl = settledFeed.value.feed.feedUrl;
      const name = settledFeed.value.name;
      const image = settledFeed.value.feed.image?.url;
      
      updatePosts(items, name, feedUrl, image);
    });

    getAllFeedsPosts(feedArray);
  }
  return storedPosts;
}


export async function get() {
  const data = await getFeeds();

  const allPosts = await getAllFeedsPosts(data);

  return {
    body: {
      allPosts
    }
  }
}