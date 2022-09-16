import MetaHead from '@/components/shared/meta-head';
import PostList from '@/components/post/post-list';
import Pagination from '@/components/shared/pagination';

function HomePageNum(props) {
  const { post, pageCount, page } = props;

  return (
    <>
      <MetaHead
        title={`Next Blog${' | Page ' + page}`}
        description="Next blog layout"
        index="noindex"
      />
      <PostList allPost={post} />
      <Pagination pageCount={pageCount} page={page} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const page = params.page_num;

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/all_post/${page}`
  );
  const data = await result.json();

  const post = data.post;

  if (post.length === 0) {
    return {
      notFound: true,
    };
  }

  const pageCount = Math.ceil(data.countAllPost / data.limit);

  return {
    props: { post: post, pageCount: pageCount, page: page },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default HomePageNum;
