import { ElementType, ReactNode, Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import http from 'react-syntax-highlighter/dist/cjs/languages/prism/http'

import PostHeader from 'components/posts/postdetail/PostHeader'
import classes from 'styles/components/posts/postdetail/PostContent.module.css'
import { PostData } from 'lib/postsUtil'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('http', http)

/**
 * [slug].tsxから呼び出されるときにundefined要素は取り除いてある
 * @param {PostData} post
 * @return {JSX.Element}
 * @constructor
 */
const PostContent = ({ post }: { post: PostData }) => {
  const { title, image, slug, content } = post
  const imagePath = `/images/posts/${slug}/${image}`

  // type NodeToProps<T> = {
  // 	node: T;
  // 	children: T extends { children: any } ? ReactNode : never;
  // };
  //
  // type CustomRenderers = {
  // 	[K in ReactMarkdownNames]?: (
  // 		props: NodeToProps<Extract<ReactMarkdownNames, { type: K }>>
  // 	) => ReactElement;
  // };

  //:CustomRenderers
  // Todo: 今後ここの型は修正する。
  const customComponents: { [nodeType: string]: ElementType } = {
    /**
     * p tagに準ずる内容を変換
     * @param {any} node
     * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined} children
     * @return {JSX.Element}
     */
    p({ node, children }: { node: any; children: ReactNode }) {
      if (node.children[0].tagName === 'img') {
        const { src, alt }: any = node.children[0].properties
        return (
          <div className={classes.image}>
            <Image src={`/images/posts/${slug}/${src}`} alt={`${alt}`} width={600} height={300} />
          </div>
        )
      } else {
        return <p>{children}</p>
      }
    },
    /**
     * codeに準ずる内容を変換
     * @param {any} className
     * @param {any} children
     * @return {JSX.Element}
     */
    code({ className, children }) {
      const language = className.split('-')[1].split('.')[1] // className is something like language-js => We need the "js" part
      const filename = className.split('-')[1]
      return (
        <Fragment>
          <h1>{filename}</h1>
          <SyntaxHighlighter style={atomDark} language={language}>
            {children}
          </SyntaxHighlighter>
        </Fragment>
      )
    },
  }

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </article>
  )
}

export default PostContent
