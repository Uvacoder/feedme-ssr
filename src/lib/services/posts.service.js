import supabase from '$lib/db.js';

export const getAllPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('pubdate', {ascending: false});

  if(error) throw error;

  return data;
};

export const getPostsByFeed = async (feedName) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('feed_name', feedName)
    .order('pubdate', {ascending: false});

    if (error) throw error;

    return data;
};

export const updatePosts = async (posts, feedName, feedLink, feedImage) => {
  // console.log('posts passed to updatePosts fn: ', posts);
  posts.forEach(async(post) =>{

    const preppedPost = {
      guid: post.guid ? post.guid : post.link,
      title: post.title,
      pubdate: post.pubDate,
      creator: post.creator,
      content: post["content:encoded"] ? post["content:encoded"] : post.content,
      feed_link: feedLink,
      feed_image: feedImage,
      feed_name: feedName
    }

    const { data, error } = await supabase
      .from('posts')
      .upsert(preppedPost);

      if(error) throw error;

      return data;
  });

}