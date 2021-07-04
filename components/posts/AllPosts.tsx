import classes from 'styles/components/posts/AllPosts.module.css'
import PostsGrid from 'components/posts/PostsGrid'
import { PostData } from 'lib/postsUtil'

/**
 * This is Component Parts : Use pages/index.tsx
 * @param {Post[]} posts
 * @return {JSX.Element}
 * @constructor
 */
const AllPosts = ({ posts }: { posts: PostData[] }) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default AllPosts
