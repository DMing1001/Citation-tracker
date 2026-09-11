/* CiteGlow 投稿清单：可勾选 + localStorage 记忆 */
(function () {
  var path = location.pathname.replace(/\/+$/, '');
  var slug = path.split('/').pop() || 'journal';
  if (slug === 'journals' || slug === 'index.html') return;

  var KEY = 'citeglow-checklist:' + slug;
  var style = document.createElement('style');
  style.textContent = [
    '.cl-wrap{margin-top:8px}',
    '.cl-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 10px;font-size:.8rem;color:var(--dim)}',
    '.cl-progress{font-weight:600;color:var(--pri2)}',
    '.cl-reset{background:transparent;border:1px solid var(--border);color:var(--dim);border-radius:8px;padding:4px 10px;font-size:.75rem;cursor:pointer;font-family:inherit}',
    '.cl-reset:hover{color:var(--txt);border-color:var(--pri)}',
    '.checklist{list-style:none;margin:0;padding:0}',
    '.checklist li{display:flex;align-items:flex-start;gap:10px;padding:9px 4px;border-bottom:1px solid rgba(255,255,255,.04);font-size:.9rem;line-height:1.55;cursor:pointer;user-select:none}',
    '.checklist li::before{display:none !important}',
    '.checklist li input{margin-top:3px;accent-color:#6366f1;flex-shrink:0;cursor:pointer}',
    '.checklist li.done{color:var(--dim);text-decoration:line-through;opacity:.75}',
    ':root[data-theme="light"] .checklist li{border-bottom-color:rgba(0,0,0,.05)}',
    '@media print{.cl-toolbar{display:none}.checklist li.done{text-decoration:none;color:inherit;opacity:1}}'
  ].join('\n');
  document.head.appendChild(style);

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch (e) { return []; }
  }
  function save(arr) {
    try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {}
  }

  function enhance(ul) {
    var items = Array.prototype.slice.call(ul.children).filter(function (n) {
      return n.tagName === 'LI';
    });
    if (!items.length) return;

    var state = load();
    var wrap = document.createElement('div');
    wrap.className = 'cl-wrap';
    var toolbar = document.createElement('div');
    toolbar.className = 'cl-toolbar';
    var progress = document.createElement('span');
    progress.className = 'cl-progress';
    var reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'cl-reset';
    reset.textContent = '重置清单';
    var exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'cl-reset';
    exportBtn.textContent = '导出 Markdown';
    var actions = document.createElement('span');
    actions.style.cssText = 'display:inline-flex;gap:8px';
    actions.appendChild(exportBtn);
    actions.appendChild(reset);
    toolbar.appendChild(progress);
    toolbar.appendChild(actions);
    ul.parentNode.insertBefore(wrap, ul);
    wrap.appendChild(toolbar);
    wrap.appendChild(ul);

    function itemText(li) {
      var clone = li.cloneNode(true);
      var inp = clone.querySelector('input');
      if (inp && inp.parentNode) inp.parentNode.removeChild(inp);
      return (clone.textContent || '').replace(/\s+/g, ' ').trim();
    }

    function updateProgress() {
      var done = state.filter(Boolean).length;
      progress.textContent = '进度 ' + done + ' / ' + items.length;
    }

    items.forEach(function (li, i) {
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = !!state[i];
      li.insertBefore(input, li.firstChild);
      li.classList.toggle('done', input.checked);
      li.addEventListener('click', function (e) {
        if (e.target === input) return;
        input.checked = !input.checked;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      input.addEventListener('change', function () {
        state[i] = input.checked;
        li.classList.toggle('done', input.checked);
        save(state);
        updateProgress();
      });
    });

    reset.addEventListener('click', function () {
      state = items.map(function () { return false; });
      save(state);
      items.forEach(function (li) {
        var input = li.querySelector('input');
        if (input) input.checked = false;
        li.classList.remove('done');
      });
      updateProgress();
    });

    exportBtn.addEventListener('click', function () {
      var title = (document.querySelector('h1') || document.querySelector('.j-hero h1') || {}).textContent || slug;
      title = title.replace(/\s+/g, ' ').trim();
      var done = state.filter(Boolean).length;
      var lines = [
        '# ' + title + ' — 投稿清单',
        '',
        '进度：' + done + ' / ' + items.length,
        '导出时间：' + new Date().toLocaleString('zh-CN'),
        ''
      ];
      items.forEach(function (li, i) {
        lines.push('- [' + (state[i] ? 'x' : ' ') + '] ' + itemText(li));
      });
      lines.push('');
      lines.push('> 由 CiteGlow 投稿指南导出');
      var blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = title.replace(/[\\/:*?"<>|]/g, '') + '-投稿清单.md';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 0);
    });

    updateProgress();
  }

  document.querySelectorAll('ul.checklist, ol.checklist').forEach(enhance);
})();
