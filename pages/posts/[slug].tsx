import { Fragment } from 'react'
import PostContent from 'components/posts/postdetail/PostContent'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getPostData, getPostsFiles, PostData } from 'lib/postsUtil'

export type PostProps = { post: PostData | undefined }
type Params = { slug: string }

const PostDetailPage = ({ post }: PostProps) => {
  return <Fragment>{post && <PostContent post={post} />}</Fragment>
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
