import { Fragment } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { getAllPosts, PostData } from 'lib/postsUtil'
import AllPosts from 'components/posts/AllPosts'

type Props = { posts: PostData[] }

const AllPostsPage = ({ posts }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>All My Posts</title>
        <meta name="description" content={'A list of programming-related tutorials and posts!'} />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  )
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
