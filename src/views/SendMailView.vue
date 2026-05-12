<template>
  <section class="card">
    <h2>메일 발송</h2>
    <form @submit.prevent="onSubmit">
      <label>
        받는 사람
        <input v-model="form.to" type="email" required placeholder="recipient@example.com" />
      </label>
      <label>
        제목
        <input v-model="form.subject" type="text" required maxlength="200" />
      </label>
      <label class="checkbox">
        <input v-model="form.html" type="checkbox" />
        HTML 본문
      </label>
      <label>
        내용
        <textarea v-model="form.body" rows="10" required></textarea>
      </label>

      <button type="submit" :disabled="loading">
        {{ loading ? '발송 중...' : '발송' }}
      </button>
    </form>

    <p v-if="result" class="result success">
      ✅ 발송 완료 (id={{ result.id }}, {{ result.sentAt }})
    </p>
    <p v-if="error" class="result error">❌ {{ error }}</p>
  </section>
</template>

<script>
import { mailService } from '@/services/mailService'

export default {
  name: 'SendMailView',
  data() {
    return {
      form: { to: '', subject: '', body: '', html: false },
      loading: false,
      result: null,
      error: ''
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      this.result = null
      this.error = ''
      try {
        this.result = await mailService.send(this.form)
      } catch (e) {
        this.error = e.message || '발송 실패'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.card { background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
h2 { margin: 0 0 16px; font-size: 16px; }
form { display: flex; flex-direction: column; gap: 12px; }
label { display: flex; flex-direction: column; font-size: 13px; color: #444; gap: 4px; }
label.checkbox { flex-direction: row; align-items: center; gap: 8px; }
input[type=text], input[type=email], textarea {
  padding: 8px 10px; border: 1px solid #d0d4dc; border-radius: 6px; font-size: 14px;
  font-family: inherit;
}
textarea { resize: vertical; }
button {
  align-self: flex-start; padding: 8px 18px; background: #1a73e8; color: #fff;
  border: none; border-radius: 6px; cursor: pointer; font-size: 14px;
}
button:disabled { background: #9ab8e6; cursor: not-allowed; }
.result { margin-top: 16px; font-size: 13px; }
.result.success { color: #137333; }
.result.error { color: #c5221f; }
</style>
