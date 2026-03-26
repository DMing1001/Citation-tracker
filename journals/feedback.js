/* CiteGlow Feedback Widget v2 */
(function(){
  // ===== CONFIG =====
  var GOOGLE_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfs_HTjB9PAi_soI9O02ID7E7IrKHOCe3tfnryNeXehx-FEvw/viewform?usp=pp_url';
  var GH_REPO = 'DMing1001/Citation-tracker';
  var GH_NEW_ISSUE = 'https://github.com/' + GH_REPO + '/issues/new';
  // ==================

  // Inject CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = document.querySelector('script[src*="feedback"]')
    ? document.querySelector('script[src*="feedback"]').src.replace('.js','.css')
    : 'feedback.css';
  document.head.appendChild(link);

  // Build DOM
  var html = [
    // Float button
    '<button class="fb-float" id="fbBtn" title="反馈与建议">💬</button>',
    // Backdrop
    '<div class="fb-backdrop" id="fbBackdrop"></div>',
    // Modal
    '<div class="fb-modal" id="fbModal">',
      '<div class="fb-head">',
        '<h3>💬 反馈与建议</h3>',
        '<button class="fb-close" id="fbClose">✕</button>',
      '</div>',
      '<div class="fb-tabs">',
        '<button class="fb-tab active" data-tab="form">📝 留言</button>',
        '<button class="fb-tab" data-tab="github">🐙 GitHub</button>',
      '</div>',
      // Form panel — Google Forms
      '<div class="fb-panel active" id="fbPanelForm">',
        '<div class="fb-gf-intro">',
          '<p>有建议、想加新期刊、发现错误？点下面的按钮填写表单，我会尽快处理。</p>',
        '</div>',
        '<div class="fb-gf-cards">',
          '<a class="fb-gf-card" href="' + GOOGLE_FORM + '" target="_blank" rel="noopener">',
            '<span class="gf-icon">📖</span>',
            '<span class="gf-text"><strong>建议收录期刊</strong><span>给我一个期刊名，我来添加</span></span>',
            '<span class="gf-arrow">→</span>',
          '</a>',
          '<a class="fb-gf-card" href="' + GOOGLE_FORM + '" target="_blank" rel="noopener">',
            '<span class="gf-icon">💡</span>',
            '<span class="gf-text"><strong>功能建议 / 错误报告</strong><span>任何改进想法都欢迎</span></span>',
            '<span class="gf-arrow">→</span>',
          '</a>',
          '<a class="fb-gf-card" href="' + GOOGLE_FORM + '" target="_blank" rel="noopener">',
            '<span class="gf-icon">💬</span>',
            '<span class="gf-text"><strong>其他反馈</strong><span>随便聊聊也行</span></span>',
            '<span class="gf-arrow">→</span>',
          '</a>',
        '</div>',
        '<div class="fb-gf-footer">',
          '<span>表单在新窗口打开，填完关闭即可</span>',
        '</div>',
      '</div>',
      // GitHub panel
      '<div class="fb-panel" id="fbPanelGithub">',
        '<p class="fb-gh-intro">如果你有 GitHub 账号，也可以直接在仓库提 Issue。Issue 会自动通知我，公开可追踪。</p>',
        '<div class="fb-gh-btns">',
          '<a class="fb-gh-btn" href="' + GH_NEW_ISSUE + '?title=%E6%9C%9F%E5%88%8A%E5%BB%BA%E8%AE%AE%EF%BC%9A&labels=journal-request" target="_blank" rel="noopener">',
            '<span class="gh-icon">📖</span>',
            '<span class="gh-text"><strong>建议收录期刊</strong><span>提交期刊名称，我来添加</span></span>',
          '</a>',
          '<a class="fb-gh-btn" href="' + GH_NEW_ISSUE + '?title=%E5%8A%9F%E8%83%BD%E5%BB%BA%E8%AE%AE%EF%BC%9A&labels=enhancement" target="_blank" rel="noopener">',
            '<span class="gh-icon">💡</span>',
            '<span class="gh-text"><strong>功能建议 / 错误报告</strong><span>改进建议或报告问题</span></span>',
          '</a>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');

  var wrapper = document.createElement('div');
  wrapper.id = 'fbWidget';
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // Elements
  var btn = document.getElementById('fbBtn');
  var backdrop = document.getElementById('fbBackdrop');
  var modal = document.getElementById('fbModal');
  var closeBtn = document.getElementById('fbClose');
  var tabs = document.querySelectorAll('.fb-tab');
  var panelForm = document.getElementById('fbPanelForm');
  var panelGithub = document.getElementById('fbPanelGithub');

  // Open / Close
  function openModal(){
    backdrop.classList.add('open');
    modal.classList.add('open');
  }
  function closeModal(){
    backdrop.classList.remove('open');
    modal.classList.remove('open');
  }
  btn.addEventListener('click', openModal);
  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeModal();
  });

  // Tabs
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      var name = tab.dataset.tab;
      panelForm.classList.toggle('active', name === 'form');
      panelGithub.classList.toggle('active', name === 'github');
    });
  });
})();
