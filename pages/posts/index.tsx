import AllPosts from 'components/posts/AllPosts'
import { GetStaticProps } from 'next'
import { getFeaturedPosts, PostData } from 'lib/postsUtil'

// Todo:後で修正
type Props = { posts: PostData[] }

const AllPostsPage = ({ posts }: Props) => {
  return <AllPosts posts={posts} />
}

// Todo:後で修正
export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      posts: getFeaturedPosts(),
    },
    revalidate: 1800,
  }
}

export default AllPostsPage
