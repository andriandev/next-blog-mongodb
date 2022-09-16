import Image from 'next/image';
import MetaHead from '@/components/shared/meta-head';
import Sidebar from '@/layout/sidebar';

function Post(props) {
  const { post, recentPost } = props;

  return (
    <>
      <MetaHead
        title={post.title}
        description={post.description}
        canonical={post.slug}
      />
      <div className="row">
        <div className="col-12 col-md-8 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="text-center">
                <Image
                  width={600}
                  height={350}
                  src={`/assets/img/${post.image}`}
                  alt={post.title}
                  className="rounded"
                />
              </div>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
        <Sidebar allPost={recentPost} />
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${params.post_slug}`
  );
  const data = await result.json();

  const postData = data.post[0];

  if (!postData) {
    return {
      notFound: true,
    };
  }

  const recentPost = data.recentPost;

  return {
    props: { post: postData, recentPost: recentPost },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default Post;
