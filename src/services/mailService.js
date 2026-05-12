import api from '@/axios'

export const mailService = {
  send({ to, subject, body, html = false }) {
    return api.post('/api/mail/send', { to, subject, body, html }).then(r => r.data)
  },
  logs({ page = 0, size = 20 } = {}) {
    return api.get('/api/mail/logs', { params: { page, size } }).then(r => r.data)
  }
}
