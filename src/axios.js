import axios from 'axios'

const getBaseURL = () => {
  const hostname = window.location.hostname
  const port = 3221

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://localhost:${port}`
  }

  if (hostname === '125.141.20.218') {
    return `http://125.141.20.218:${port}`
  }

  if (hostname.includes('synology.me')) {
    return `http://${hostname}:${port}`
  }

  return `http://125.141.20.218:${port}`
}

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30_000,
})

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err.response?.status
    const serverMsg = err.response?.data?.error
    if (serverMsg) {
      err.message = serverMsg
    } else if (status >= 500) {
      err.message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    }
    return Promise.reject(err)
  }
)

export default api
