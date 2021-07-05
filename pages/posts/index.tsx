import AllPosts from 'components/posts/AllPosts'
import { GetStaticProps } from 'next'
import { getAllPosts, PostData } from 'lib/postsUtil'

type Props = { posts: PostData[] }

const AllPostsPage = ({ posts }: Props) => {
  return <AllPosts posts={posts} />
}

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      posts: getAllPosts(),
    },
    revalidate: 1800,
  }
}

export default AllPostsPage
