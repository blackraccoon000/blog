import { Fragment, ReactNode } from 'react'
import MainNavigation from "components/layout/MainNavigation";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <Fragment>
			<MainNavigation/>
      <main>{children}</main>
    </Fragment>
  )
}

export default Layout
