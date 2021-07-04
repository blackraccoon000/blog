import PostHeader from 'components/posts/postdetail/PostHeader'
import ReactMarkdown from 'react-markdown'
import classes from 'styles/components/posts/postdetail/PostContent.module.css'
import DUMMY_POST from 'dummy/dummyContentData' // Todo: 後で修正

const PostContent = () => {
  const { title, image, slug, content } = DUMMY_POST
  const imagePath = `/images/posts/${slug}/${image}`

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  )
}

export default PostContent
