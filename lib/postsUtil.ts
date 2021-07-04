// Todo:fs/promiseで解決できなかった点が解せない https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api
import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

export type PostData = {
  title: string
  date: Date
  author: string
  image: string
  excerpt: string
  isFeatured: boolean
  content: string
  slug: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

/**
 * 個々のファイルからdata及びcontent情報を返す関数
 * @param {string} fileName
 * @return {PostData}
 */
export const getPostData = (fileName: string): PostData => {
  const filePath = path.join(postsDirectory, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  /**
   * Post Meta Data Analyse
   */
  const postSlug = fileName.replace(/\.md/, '')
  return {
    slug: postSlug,
    title: data.title,
    date: data.date,
    author: data.author,
    image: data.image,
    excerpt: data.excerpt,
    isFeatured: data.isFeatured,
    content: content,
  }
}

/**
 * postsフォルダ内の情報をソートして返す関数
 * @return {PostData[]}
 * @desc use getPostData(postFile)
 */
export const getAllPosts = (): PostData[] => {
  const postFiles = fs.readdirSync(postsDirectory, 'utf-8')
  const allPosts = postFiles.map((postFile) => getPostData(postFile))

  /**
   * Sort
   * @type {PostData[]}
   */
  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

/**
 * @desc isFeaturedがTrueの表示のみ返す
 * @return {PostData[]}
 */
export const getFeaturedPosts = (): PostData[] => {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.isFeatured)
}
