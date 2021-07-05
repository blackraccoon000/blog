import { Fragment } from 'react'
import Hero from '../components/homepage/Hero'
import FeaturedPosts from 'components/homepage/FeaturedPosts'
import { getFeaturedPosts, PostData } from 'lib/postsUtil'
import { GetStaticProps } from 'next'
import Head from 'next/head'

type Props = { posts: PostData[] }

const HomePage = ({ posts }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>PlayWell Blog</title>
        <meta name="description" content="I post about programming and web development." />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      posts: getFeaturedPosts(),
    },
    revalidate: 1800,
  }
}

export default HomePage
