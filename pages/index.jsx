import MetaHead from '@/components/shared/meta-head';
import PostList from '@/components/post/post-list';
import Pagination from '@/components/shared/pagination';

function Home(props) {
  const { post, pageCount, page } = props;

  return (
    <>
      <MetaHead title="Next Blog" description="Next blog layout" />
      <PostList allPost={post} />
      <Pagination pageCount={pageCount} page={page} />
    </>
  );
}

export async function getStaticProps() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/all_post`
  );
  const data = await result.json();

  const post = data.post;

  if (!post) {
    return {
      notFound: true,
    };
  }

  const pageCount = Math.ceil(data.countAllPost / data.limit);
  const page = 1;

  return {
    props: { post: post, pageCount: pageCount, page: page },
  };
}

export default Home;
