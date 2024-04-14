import { toast } from 'react-toastify'

export const successHandler = (message) => {
  toast.success(message)
  return
}
export const errorHandler = (error) => {
  toast.error(error)
  return
}
