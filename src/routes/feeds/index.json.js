import Parser from 'rss-parser';
import { each } from 'svelte/internal';

import supabase from '../../lib/db.js';

const parser = new Parser();

/**
 * 
 * @param {array of feed objects} feedArray 
 * @returns array of data returned from all feeds in param array 
 */
const getAllFeedsPosts = async (feedArray) => {
  const allFeedsPromise = feedArray.map(async(feedItem) => {
    return {
      name: feedItem.name,
      feed: await parser.parseURL(feedItem.feed_link)
    };
  });
  
  const feedsData = await Promise.allSettled(allFeedsPromise);
  
  return feedsData.map((settledFeed) => {
    settledFeed.value.feed.title = settledFeed.value.name || settledFeed.value.feed.title;
    return settledFeed.value.feed;
  });
}


export async function get({params}) {
  const { error, data } = await supabase.from('feeds').select();

  const allFeeds = await getAllFeedsPosts(data);

  return {
    body: {
      allFeeds
    }
  }
}