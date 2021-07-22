import Parser from 'rss-parser';
import { getSingleFeed } from '$lib/services/feeds.service.js';

const parser = new Parser();

export const get = async({params}) => {
  const {slug} = params;

  const singleFeed = await(getSingleFeed(slug));

  
  const data = {
    name: singleFeed.name,
    feed: await parser.parseURL(singleFeed.feed_link)
  };

  data.feed.title = data.name || data.feed.title;

  feed = {...data.feed};

  return {
    body: {
      feed
    }
  }
}