import { createRouter, createWebHistory } from 'vue-router'
import SendMailView from '@/views/SendMailView.vue'
import MailLogsView from '@/views/MailLogsView.vue'

const routes = [
  { path: '/', name: 'send', component: SendMailView },
  { path: '/logs', name: 'logs', component: MailLogsView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
