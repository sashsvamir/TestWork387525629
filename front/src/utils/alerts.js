// todo: move loading follow style to sass styles after fix loading with Vite
import '../../node_modules/styled-notifications/dist/notifications.css'


/**
 * We'll load "styled-notifications" package which provides
 * js notifications by follow command:
 *    window.createNotification({...})
 * see: https://github.com/JamieLivingstone/styled-notifications#custom-options
 *
 * note: see also app.sass where we import styles for styled-notifications
 */
import 'styled-notifications/dist/notifications.js'


/**
 * Add global notify method to show popup messages
 */
window.notify = ({ type, message }) => {
  const notify = window.createNotification({
    closeOnClick: false,
    theme: type,
    displayCloseButton: true,
    showDuration: 9000,
  })

  notify({ message })
}

