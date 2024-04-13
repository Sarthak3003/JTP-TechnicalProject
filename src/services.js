import httpcommon from './httpcommon'



export const login = (data) => {
    return httpcommon.post(`/api/token/`, data)
  }

export const getRec = (data) => {
    return httpcommon.post(`/recommendation/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jtpToken')}`,
      },
    })
  }