<template>
  <section class="card">
    <div class="head">
      <h2>발송 이력</h2>
      <button @click="load" :disabled="loading">새로 고침</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <table v-if="rows.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>받는 사람</th>
          <th>제목</th>
          <th>상태</th>
          <th>시각</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.toAddress }}</td>
          <td>{{ row.subject }}</td>
          <td :class="['status', row.status.toLowerCase()]">{{ row.status }}</td>
          <td>{{ formatTime(row.createdAt) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else-if="!loading" class="muted">발송 이력이 없습니다.</p>
  </section>
</template>

<script>
import { mailService } from '@/services/mailService'

export default {
  name: 'MailLogsView',
  data() {
    return { rows: [], loading: false, error: '' }
  },
  mounted() { this.load() },
  methods: {
    async load() {
      this.loading = true
      this.error = ''
      try {
        const res = await mailService.logs({ page: 0, size: 50 })
        this.rows = res.content || []
      } catch (e) {
        this.error = e.message || '조회 실패'
      } finally {
        this.loading = false
      }
    },
    formatTime(iso) {
      if (!iso) return ''
      const d = new Date(iso)
      return d.toLocaleString('ko-KR')
    }
  }
}
</script>

<style scoped>
.card { background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
.head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
h2 { margin: 0; font-size: 16px; }
button {
  padding: 6px 14px; background: #1a73e8; color: #fff; border: none;
  border-radius: 6px; cursor: pointer; font-size: 13px;
}
button:disabled { background: #9ab8e6; cursor: not-allowed; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th, td { padding: 8px 10px; border-bottom: 1px solid #eee; text-align: left; }
th { background: #fafbfc; font-weight: 600; color: #555; }
.status.sent { color: #137333; font-weight: 600; }
.status.failed { color: #c5221f; font-weight: 600; }
.status.pending { color: #b06c00; font-weight: 600; }
.error { color: #c5221f; }
.muted { color: #888; font-size: 13px; }
</style>
