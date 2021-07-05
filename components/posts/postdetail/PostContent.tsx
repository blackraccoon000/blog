import PostHeader from 'components/posts/postdetail/PostHeader'
import { ReactChildren, ReactElement, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { NormalComponents, SpecialComponents } from 'react-markdown/src/ast-to-react'
import classes from 'styles/components/posts/postdetail/PostContent.module.css'
import { PostData } from 'lib/postsUtil'
import Image from 'next/image'

/**
 * [slug].tsxから呼び出されるときにundefined要素は取り除いてある
 * @param {PostData} post
 * @return {JSX.Element}
 * @constructor
 */
const PostContent = ({ post }: { post: PostData }) => {
  const { title, image, slug, content } = post
  const imagePath = `/images/posts/${slug}/${image}`

  const customComponents: Partial<NormalComponents & SpecialComponents> = {
    p(paragraph) {
      const { node } = paragraph
      console.log('node:', node)

      if (node.children[0].tagName === 'img') {
        const { properties } = node.children[0]
        if (
          typeof properties === 'object' &&
          typeof properties.src === 'string' &&
          typeof properties.alt === 'string'
        ) {
          return (
            <div className={classes.image}>
              <Image
                src={`/images/posts/${slug}/${properties.src}`}
                alt={properties.alt}
                width={600}
                height={300}
              />
            </div>
          )
        }
      }
      return <p>{paragraph.children}</p>
    },
  }

  // Type '{ children: string; renderers: { image({ src, alt }: RenderImage): Element; }; }

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </article>
  )
}

export default PostContent
