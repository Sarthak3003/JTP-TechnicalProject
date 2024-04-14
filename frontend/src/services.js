import httpcommon from './httpcommon'
import axios from 'axios'



export const login = (data) => {
    return httpcommon.post(`/api/token/`, data)
  }

export const register = (data) => {
    return httpcommon.post(`/user/`, data)
  }

export const getRec = (data) => {
    return httpcommon.post(`/recommendation/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jtpToken')}`,
      },
    })
  }

export const getIdealVal = (data) => {
  return httpcommon.post(`/ideal-val/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jtpToken')}`,
    },
  })
}