import Parser from 'rss-parser';
import { getSingleFeed } from '$lib/services/feeds.service.js';

const parser = new Parser();

export const get = async({params}) => {
  const {slug} = params;

  const singleFeed = await(getSingleFeed(slug));

  
  const data = await parser.parseURL(singleFeed.feed_link);

  const feed = {
    ...data,
    title: singleFeed.name
  }

  return {
    body: {
      feed
    }
  }
}