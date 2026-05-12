<template>
  <div class="app">
    <header class="header">
      <h1>Gmail 발송 테스트</h1>
      <nav>
        <router-link to="/">발송</router-link>
        <router-link to="/logs">이력</router-link>
      </nav>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default { name: 'App' }
</script>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f6f7f9; color: #222; }
.app { min-height: 100vh; }
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 24px; background: #fff; border-bottom: 1px solid #e5e7eb;
}
.header h1 { font-size: 18px; margin: 0; }
.header nav a {
  margin-left: 16px; text-decoration: none; color: #555; font-size: 14px;
}
.header nav a.router-link-active { color: #1a73e8; font-weight: 600; }
.main { padding: 24px; max-width: 800px; margin: 0 auto; }
</style>
