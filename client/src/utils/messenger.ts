import { Dialog, Notify } from 'quasar'

export const showError = (message: any) => {
  if (message.toString) message = message.toString()
  if (typeof message !== 'string') message = JSON.stringify(message)
  Dialog.create({
    title: 'An error has occurred',
    message: dialogHtml(message, 'error'),
    html: true,
    ok: button('Close')
  })
}

export const confirm = async (message: string) => {
  return new Promise((resolve) => {
    Dialog.create({
      title: 'Confirm',
      message: dialogHtml(message, 'warning'),
      html: true,
      ok: button('OK'),
      cancel: cancelButton
    }).onOk(() => resolve(true)).onCancel(() => resolve(false))
  })
}

export const confirmWithCallback = (
  message: string, onOkCallback: () => void
) => {
  Dialog.create({
    title: 'Confirm',
    message: dialogHtml(message, 'warning'),
    html: true,
    ok: button('OK'),
    cancel: cancelButton,
  }).onOk(onOkCallback)
}

export const yesNoChoice = async (title: string, message: string) => {
  return new Promise((resolve: (value: boolean) => void) => {
    Dialog.create({
      title: title,
      message: dialogHtml(message, 'question'),
      html: true,
      ok: button('Yes'),
      cancel: button('No'),
    }).onOk(() => resolve(true)).onCancel(() => resolve(false))
  })
}

export const showNewVersionPrompt = () => {
  Dialog.create({
    title: 'New version available',
    message: dialogHtml(
      'There is a new version of the app available. Reload the page to get it!',
      'info'
    ),
    html: true,
    ok: button('Reload'),
    cancel: cancelButton
  }).onOk(() => location.reload())
}

export const showNotification = (message: string) => {
  Notify.create({
    message,
    actions: [closeNotifyButton]
  })
}

export const showNotificationWithUndo = (
  message: string, undoCallback: () => void
) => {
  Notify.create({
    message,
    actions: [
      {
        label: 'Undo',
        color: 'white',
        noCaps: true,
        handler: undoCallback
      },
      closeNotifyButton
    ]
  })
}

export const textAnswer = async (title: string) => {
  return new Promise((resolve: (value: string) => void) => {
    Dialog.create({
      title,
      prompt: {
        model: ''
      },
      ok: button('OK'),
      cancel: cancelButton
    }).onOk(resolve)
  })
}

const button = (label: string, color = 'primary') => {
  return {
    label,
    color,
    noCaps: true,
    unelevated: true
  }
}

const cancelButton = { label: 'Cancel', flat: '', noCaps: '' }
const closeNotifyButton = { icon: 'fas fa-times', color: 'white' }

const dialogHtml = (message: string, type: string) => {
  const { icon, color } = dialogIcon(type)
  return `
    <div class="row no-wrap q-gutter-md items-center">
      <div class="col-auto text-h1 text-${color}">
        <i class="${icon}"></i>
      </div>
      <div class="col-shrink">
        ${ message }
      </div>
    </div>
  `
}


const dialogIcon = (type: string) => {
  if (type === 'error') {
    return { icon: 'fas fa-exclamation-circle', color: 'negative' }
  }
  if (type === 'warning') {
    return { icon: 'fas fa-question-circle', color: 'warning' }
  }
  if (type === 'question') {
    return { icon: 'fas fa-question-circle', color: 'primary' }
  }
  if (type === 'info') {
    return { icon: 'fas fa-info-circle', color: 'primary' }
  }
  return { icon: 'fas fa-exclamation-circle', color: 'negative' }
}