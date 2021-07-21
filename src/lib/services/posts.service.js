import supabase from '$lib/db.js';

export const getAllPosts = async () => {
  const { data, error } = await supabase()
    .from('posts')
    .select();

  if(error) {
    return {
      ok: false,
      error: new Error(error.message)
    }
  }
  return data;
};

export const getPostsByFeed = async (feedId) => {
  const { data, error } = await supabase
    .from('posts')
    .select('feed_id')
    .eq(feedId);
};

export const updatePosts = async (posts) => {
  posts.forEach((post) =>{
    const { data, error } = await supabase
      .from('posts')
      .upsert(post);

      if(error) {
        return {
          ok: false,
          error: new Error(error.message)
        }
      }

      return data;
  });

}