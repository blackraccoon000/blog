import Image from 'next/image'
import classes from 'styles/components/posts/postdetail/PostHeader.module.css'

/**
 * PostDetail Header
 * @param {string} title
 * @param {string} image Request Full Path
 * @return {JSX.Element}
 * @constructor
 */
const PostHeader = ({ title, image }: { title: string; image: string }) => {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} width={200} height={150} alt={title} />
    </header>
  )
}

export default PostHeader
