import { getAllPosts, getPostsByFeed, updatePosts } from '$lib/services/posts.service.js';
import { getFeeds } from '$lib/services/feeds.service.js';
import Parser from 'rss-parser';


const parser = new Parser();

/**
 * The idea here is to first check the db for saved posts. 
 * If the db is empty, then fetch all posts from the RSS source
 * and then update the db with those posts.
 * 
 * @param {array of feed objects} feedArray 
 * @returns array of data returned from all feeds in param array 
 */
const getAllFeedsPosts = async (feedArray) => {

  const storedPosts = await getAllPosts();

  if(storedPosts.length === 0) {
    const feedsData = await getPostsFromRSS(feedArray);
    
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

/**
 * Fetches all posts of a given array of feed objects
 * using each object's feed_link property.
 * @param {array:Object} feedArray 
 * @returns allSettled object of: 
 * {status: 'fulfilled', value: {name, feed}}
 * or
 * {status: 'rejected', reason: Error: error}
 */
const getPostsFromRSS = async (feedArray) => {
  return await Promise.allSettled (feedArray.map(async(feedItem) => {
    return {
      name: feedItem.name,
      feed: await parser.parseURL(feedItem.feed_link)
    };
  }));
}


export const get = async () => {
  const data = await getFeeds();

  const allPosts = await getAllFeedsPosts(data);

  return {
    body: {
      allPosts
    }
  }
}