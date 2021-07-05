import classes from 'styles/components/contactform/ContactForm.module.css'
import Notification from 'components/ui/Notification'
import { FormEventHandler, useEffect, useState } from 'react'
import { ContactType } from 'pages/api/contact'

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState<null | string>(null) // "pending","success", "error"
  const [requestError, setRequestError] = useState<null | string>(null) // "error" | null

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  const sendContactData = async (contactData: ContactType) => {
    const init: RequestInit = {
      method: 'POST',
      body: JSON.stringify(contactData),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch('/api/contact', init)
      .then((response) => response)
      .catch((reason) => Promise.reject(reason))
    const data = await response
      .json()
      .then((data) => data)
      .catch((reason) => Promise.reject(reason))
    if (response.ok) {
      console.log('success', data)
      setRequestStatus('success')
      setEnteredEmail('')
      setEnteredName('')
      setEnteredMessage('')
    } else {
      // throw new Error(data)
      console.log('error', data)
      setRequestError(data)
      return Promise.reject(data)
    }
  }

  // Todo: 型は後で直す / うまくできない。
  // const statusData: {
  //   pending: { status: string; title: string; message: string }
  //   success: { status: string; title: string; message: string }
  //   error: { status: string; title: string; message: string }
  // } = {
  //   pending: {
  //     status: 'pending',
  //     title: 'Pending...',
  //     message: 'Now Sending...',
  //   },
  //   success: {
  //     status: 'Success',
  //     title: 'Success',
  //     message: 'Successfully created',
  //   },
  //   error: {
  //     status: 'Error',
  //     title: 'Error',
  //     message: 'Invalid',
  //   },
  // }
  // console.log(statusData[requestStatus])

  // 暫定対応
  const nowStatus = (status: null | string) => {
    switch (status) {
      case 'pending':
        return {
          status: 'pending',
          title: 'Pending...',
          message: 'Now Sending...',
        }
      case 'success':
        return {
          status: 'Success',
          title: 'Success',
          message: 'Successfully created',
        }
      case 'error':
        return {
          status: 'Error',
          title: 'Error',
          message: requestError ? requestError : '',
        }
      default:
        break
    }
  }

  const sendMessageHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setRequestStatus('pending')

    // Todo: optional -> add client-side validation
    await sendContactData({
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    }).catch((reason) => {
      setRequestStatus('error')
      const message = reason.message || 'Something went wrong'
      console.log(message)
      setRequestError(message)
      return Promise.reject(reason)
    })
  }

  const notification = nowStatus(requestStatus)

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id={'email'}
              required
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id={'name'}
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  )
}

export default ContactForm
