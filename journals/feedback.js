/* CiteGlow Feedback Widget v1 */
(function(){
  // ===== CONFIG =====
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/PLACEHOLDER'; // ← 替换为你的 endpoint
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
      // Form panel
      '<div class="fb-panel active" id="fbPanelForm">',
        '<form id="fbForm">',
          '<div class="fb-field">',
            '<label>反馈类型</label>',
            '<select name="type" required>',
              '<option value="">请选择...</option>',
              '<option value="journal">📖 建议收录期刊</option>',
              '<option value="feature">💡 功能建议</option>',
              '<option value="error">🐛 错误报告</option>',
              '<option value="other">💬 其他</option>',
            '</select>',
          '</div>',
          '<div class="fb-field">',
            '<label>内容 <span style="color:#f87171">*</span></label>',
            '<textarea name="message" placeholder="比如：建议收录 Water Resources Research，或者某页面显示异常..." required></textarea>',
          '</div>',
          '<div class="fb-row">',
            '<div class="fb-field">',
              '<label>称呼（选填）</label>',
              '<input name="name" placeholder="怎么称呼你">',
            '</div>',
            '<div class="fb-field">',
              '<label>邮箱（选填）</label>',
              '<input name="email" type="email" placeholder="需要回复时填写">',
            '</div>',
          '</div>',
          '<input type="hidden" name="page" value="' + location.pathname + '">',
          '<button type="submit" class="fb-submit" id="fbSubmit">提交反馈</button>',
        '</form>',
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
      // Success panel
      '<div class="fb-panel" id="fbPanelSuccess">',
        '<div class="fb-success">',
          '<div class="check">✅</div>',
          '<h4>感谢反馈！</h4>',
          '<p>我已经收到你的建议，会尽快处理。<br>如果是期刊收录请求，通常 1–2 天内完成。</p>',
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
  var form = document.getElementById('fbForm');
  var submitBtn = document.getElementById('fbSubmit');
  var tabs = document.querySelectorAll('.fb-tab');
  var panels = {
    form: document.getElementById('fbPanelForm'),
    github: document.getElementById('fbPanelGithub'),
    success: document.getElementById('fbPanelSuccess')
  };

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
      Object.keys(panels).forEach(function(k){
        panels[k].classList.toggle('active', k === name);
      });
      if(name === 'github'){
        panels.form.classList.remove('active');
        panels.github.classList.add('active');
        panels.success.classList.remove('active');
      }
    });
  });

  // Submit
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(FORMSPREE_ENDPOINT.includes('PLACEHOLDER')){
      alert('⚠️ Formspree endpoint 尚未配置，请联系站长。');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';

    var data = new FormData(form);
    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res){
      if(res.ok){
        // Show success
        panels.form.classList.remove('active');
        panels.github.classList.remove('active');
        panels.success.classList.add('active');
        form.reset();
      } else {
        throw new Error('Server error');
      }
    })
    .catch(function(){
      alert('提交失败，请稍后重试或通过 GitHub Issues 反馈。');
    })
    .finally(function(){
      submitBtn.disabled = false;
      submitBtn.textContent = '提交反馈';
    });
  });
})();
