import Parser from 'rss-parser';
import { getSingleFeed } from '$lib/services/feeds.service.js';

const parser = new Parser();

export const get = async({params}) => {
  const {slug} = params;

  const singleFeed = await(getSingleFeed(slug));

  
  const feed = await parser.parseURL(singleFeed.feed_link);

  return {
    body: {
      feed
    }
  }
}