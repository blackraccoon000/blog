import { ReactPortal, useContext } from 'react'
import ReactDOM from 'react-dom'

import classes from 'styles/components/ui/Notification.module.css'
import NotificationContext from 'store/NotificationContext'

type Props = {
  title: string
  message: string
  status: string
}

const Notification = ({ title, message, status }: Props): ReactPortal | JSX.Element => {
  const notificationCtx = useContext(NotificationContext)

  let statusClasses = ''

  if (status === 'success') {
    statusClasses = classes.success
  }

  if (status === 'error') {
    statusClasses = classes.error
  }

  if (status === 'pending') {
    statusClasses = classes.pending
  }

  const activeClasses = `${classes.notification} ${statusClasses}`
  const NotificationSpace = (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )

  const container = document.getElementById('notifications')
  if (container) {
    return ReactDOM.createPortal(NotificationSpace, container)
  } else {
    return NotificationSpace
  }
}

export default Notification
