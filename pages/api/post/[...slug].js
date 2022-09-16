import DB from '@/config/db';
import PostModel from '@/models/post-model';

export default async function Post(req, res) {
  const limit = 6;
  const skip = (req.query.slug[1] - 1) * limit || 0;

  try {
    // Database connection
    await DB();

    let post = '';
    let countAllPost = 1;
    if (req.query.slug[0] == 'all_post') {
      // Get all post
      post = await PostModel.find().skip(skip).limit(limit);

      countAllPost = await PostModel.count();

      // Return post data
      return res.json({ limit, countAllPost, post });
    } else {
      // Find post with slug
      post = await PostModel.find({ slug: req.query.slug });

      const recentPost = await PostModel.find()
        .select('title slug')
        .limit(limit);

      // Return post data
      return res.json({ post, recentPost });
    }
  } catch (error) {
    // Return error
    // console.log(error);
    res.json({ error });
  }
}
