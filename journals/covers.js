/* CiteGlow 详情页封面图：用 covers/<slug>.xxx 替换 emoji 图标 */
(function () {
  var path = location.pathname.replace(/\/+$/, '');
  var slug = path.split('/').pop() || '';
  if (!slug || slug === 'index.html' || slug === 'journals' || slug === 'template.html') return;

  var real = {
    'water-resources-management': 'jpg',
    'journal-of-hydrodynamics': 'jpg',
    'land-degradation-development': 'jpg',
    'hydrological-processes': 'png',
    'journal-of-flood-risk-management': 'png'
  };
  var ext = real[slug] || 'svg';
  var src = 'covers/' + slug + '.' + ext;

  function apply() {
    var icon = document.querySelector('.j-hero .icon');
    if (!icon) return;
    var wrap = document.createElement('div');
    wrap.className = 'cover-wrap';
    var img = document.createElement('img');
    img.src = src;
    img.alt = document.title || slug;
    img.onerror = function () { wrap.remove(); icon.style.display = ''; };
    wrap.appendChild(img);
    icon.style.display = 'none';
    icon.parentNode.insertBefore(wrap, icon);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
