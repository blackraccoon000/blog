import Link from 'next/Link'
import classes from 'styles/components/layout/MainNavigation.module.css'
import Logo from 'components/layout/Logo'

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link href={'/'}>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href={'/posts'}>Posts</Link>
          </li>
          <li>
            <Link href={'/contact'}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default MainNavigation
