export function sortByPubDate(feed) {
  return feed.sort((a, b) => new Date(a.pubDate) > new Date(b.pubDate) ? -1 : 1);
}