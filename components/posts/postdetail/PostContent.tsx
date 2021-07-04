import PostHeader from 'components/posts/postdetail/PostHeader'
import ReactMarkdown from 'react-markdown'
import classes from 'styles/components/posts/postdetail/PostContent.module.css'
import { PostData } from 'lib/postsUtil'

/**
 * [slug].tsxから呼び出されるときにundefined要素は取り除いてある
 * @param {PostData} post
 * @return {JSX.Element}
 * @constructor
 */
const PostContent = ({ post }: { post: PostData }) => {
  const { title, image, slug, content } = post
  const imagePath = `/images/posts/${slug}/${image}`

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  )
}

export default PostContent
