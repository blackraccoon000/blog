import classes from 'styles/components/posts/PostsGrid.module.css'
import { PostData } from 'lib/postsUtil'
import PostItem from 'components/posts/PostItem'

const PostsGrid = ({ posts }: { posts: PostData[] }): JSX.Element => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </ul>
  )
}

export default PostsGrid
