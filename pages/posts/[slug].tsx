import { Fragment } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getPostData, getPostsFiles, PostData } from 'lib/postsUtil'
import PostContent from 'components/posts/postdetail/PostContent'

export type PostProps = { post: PostData | undefined }
type Params = { slug: string }

const PostDetailPage = ({ post }: PostProps) => {
  return (
    <Fragment>
      {post && (
        <Fragment>
          <Head>
            <title>{post.title}</title>
            <meta name="description" content={post.excerpt} />
          </Head>
          <PostContent post={post} />
        </Fragment>
      )}
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<PostProps> = ({ params }) => {
  const slug = params ? params.slug : ''
  const post = typeof slug === 'string' ? getPostData(slug) : undefined

  return {
    props: {
      post,
    },
    revalidate: 1800,
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const postFileNames = getPostsFiles()
  const slugs = postFileNames.map((postFileName) => postFileName.replace(/\.md/, ''))
  const paths: { params: Params }[] = slugs.map((slug) => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}

export default PostDetailPage
