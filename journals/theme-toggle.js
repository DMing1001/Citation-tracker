/* ═══════════════════════════════════════════
   CiteGlow Theme Toggle — 深色/浅色切换
   引用：<script src="/journals/theme-toggle.js"></script>
   ═══════════════════════════════════════════ */
(function(){
  const STORAGE_KEY = 'citeglow-theme';

  // 获取保存的主题或系统偏好
  function getTheme(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved) return saved;
    return window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark';
  }

  // 应用主题
  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    // 更新 toggle 按钮 emoji
    const thumb = document.querySelector('.theme-toggle .thumb');
    if(thumb) thumb.textContent = theme === 'light' ? '☀️' : '🌙';
    // 更新 meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if(meta) meta.content = theme === 'light' ? '#f5f7fa' : '#080e1a';
  }

  // 切换
  function toggleTheme(){
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // 在 DOM 中插入 toggle 按钮
  function injectToggle(){
    // 找到导航栏的 links 区域
    const navLinks = document.querySelector('.topnav-links');
    if(!navLinks) return;

    const wrap = document.createElement('div');
    wrap.className = 'theme-toggle-wrap';
    wrap.innerHTML = `
      <button class="theme-toggle" onclick="window.__toggleTheme()" title="切换深色/浅色模式" aria-label="切换主题">
        <span class="thumb">🌙</span>
      </button>
    `;
    navLinks.parentElement.style.display = 'flex';
    navLinks.parentElement.style.alignItems = 'center';
    navLinks.parentElement.style.width = '100%';
    navLinks.after(wrap);
  }

  // 暴露全局方法
  window.__toggleTheme = toggleTheme;

  // 初始化
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      applyTheme(getTheme());
      injectToggle();
    });
  } else {
    applyTheme(getTheme());
    injectToggle();
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme:light)').addEventListener('change', function(e){
    if(!localStorage.getItem(STORAGE_KEY)){
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
})();
