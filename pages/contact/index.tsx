import { Fragment } from 'react'
import Head from 'next/head'
import ContactForm from 'components/contactform/ContactForm'

const Contact = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send me message!" />
      </Head>
      <ContactForm />
    </Fragment>
  )
}

export default Contact
