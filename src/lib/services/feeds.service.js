import supabase from '$lib/db.js';

export const addFeed = async (feedInfo) => {

  const { link, name, image, description, categories, slug, feed_link } = feedInfo;

  const newFeed = {
    feed_link,
    name,
    link,
    image: image || null,
    description: description || null,
    slug,
    categories: categories || null,
  };

  const { data, error } = await supabase
    .from('feeds')
    .upsert(newFeed);
  
  if(error) throw error;
  
  return data;
};

export const getFeeds = async () => {
  const { data, error } = await supabase.from('feeds').select();

  if(error) {
    return { 
      ok: false,
      error
    }
  }

  return data;
};

export const getSingleFeed = async(slug) => {
  const { data, error } = await supabase
    .from('feeds')
    .select('*')
    .eq('slug', slug);

  if(error) throw error;

  return data[0];
}