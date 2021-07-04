import classes from 'styles/components/homepage/FeaturedPosts.module.css'
import PostsGrid from 'components/posts/PostsGrid'
import { PostData } from 'lib/postsUtil'

const FeaturedPosts = ({ posts }: { posts: PostData[] }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      {<PostsGrid posts={posts} />}
    </section>
  )
}

export default FeaturedPosts
