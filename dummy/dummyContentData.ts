type ContentPost = {
  title: string
  image: string
  excerpt: string
  date: string
  slug: string
  content: string
}

const DUMMY_POST: ContentPost = {
  title: 'Getting Started width NextJS',
  image: 'getting-started-nextjs.png',
  excerpt:
    'NextJS is a the React framework for production - it makes building fullstack React apps and sites a breez and ships with built in SSR.',
  date: '2022-02-10',
  slug: 'getting-started-width-nextjs1',
  content: '# This is first Post',
}

export default DUMMY_POST
