/* CiteGlow 相似期刊推荐：根据当前 slug 注入到详情页页脚前 */
(function () {
  var path = location.pathname.replace(/\/+$/, '');
  var slug = path.split('/').pop() || '';
  if (!slug || slug === 'index.html' || slug === 'journals') return;

  var META = {
    'journal-of-hydrology': { name: 'Journal of Hydrology', icon: '🌊', if: '6.4', partition: 'Q1' },
    'catena': { name: 'CATENA', icon: '🏔️', if: '5.4', partition: 'Q1' },
    'water-research': { name: 'Water Research', icon: '💧', if: '12.8', partition: 'Q1' },
    'environmental-modelling-software': { name: 'Environmental Modelling & Software', icon: '🌿', if: '5.5', partition: 'Q1' },
    'agricultural-water-management': { name: 'Agricultural Water Management', icon: '🌾', if: '6.6', partition: 'Q1' },
    'international-soil-and-water-conservation-research': { name: 'ISWCR', icon: '🌱', if: '7.3', partition: 'Q1' },
    'international-journal-of-sediment-research': { name: 'Int. J. Sediment Research', icon: '🏔️', if: '3.8', partition: 'Q2' },
    'journal-of-environmental-management': { name: 'J. Environmental Management', icon: '🌿', if: '8.0', partition: 'Q1' },
    'water-resources-management': { name: 'Water Resources Management', icon: '💧', if: '5.7', partition: 'Q1' },
    'journal-of-cleaner-production': { name: 'J. Cleaner Production', icon: '♻️', if: '9.8', partition: 'Q1' },
    'land-degradation-development': { name: 'Land Degradation & Dev.', icon: '🏜️', if: '4.0', partition: 'Q2' },
    'hydrology-and-earth-system-sciences': { name: 'HESS', icon: '🌊', if: '5.8', partition: 'Q1' },
    'journal-of-hydrodynamics': { name: 'J. Hydrodynamics', icon: '💧', if: '4.0', partition: 'Q1' },
    'hydrological-processes': { name: 'Hydrological Processes', icon: '💧', if: '3.1', partition: 'Q1' },
    'journal-of-flood-risk-management': { name: 'J. Flood Risk Management', icon: '🌊', if: '3.7', partition: 'Q2' },
    'journal-of-hydraulic-engineering': { name: 'J. Hydraulic Engineering', icon: '⚙️', if: '2.5', partition: 'Q2' },
    'geomorphology': { name: 'Geomorphology', icon: '🏔️', if: '3.8', partition: 'Q1' }
  };

  var RELATED = {
    'journal-of-hydrology': [
      ['hydrology-and-earth-system-sciences', '同属水文核心，地球系统视角'],
      ['hydrological-processes', '过程水文与实验观测'],
      ['water-resources-management', '偏管理与配置，可作方法互补'],
      ['catena', '坡面/土壤水文过程交叉']
    ],
    'water-research': [
      ['journal-of-environmental-management', '环境管理与风险落点'],
      ['journal-of-cleaner-production', '清洁生产与可持续评估'],
      ['journal-of-hydrology', '纯水文过程与模拟'],
      ['hydrology-and-earth-system-sciences', '大尺度水循环与讨论型研究']
    ],
    'catena': [
      ['geomorphology', '地貌过程与形态演化'],
      ['land-degradation-development', '土地退化与恢复'],
      ['international-soil-and-water-conservation-research', '水土保持措施与效益'],
      ['international-journal-of-sediment-research', '泥沙输移与侵蚀']
    ],
    'environmental-modelling-software': [
      ['journal-of-hydrology', '水文模型与率定应用'],
      ['hydrology-and-earth-system-sciences', '可复现建模与地球系统'],
      ['water-resources-management', '决策支持与优化调度'],
      ['journal-of-environmental-management', '管理导向的模型应用']
    ],
    'agricultural-water-management': [
      ['international-soil-and-water-conservation-research', '农地水土保持'],
      ['water-resources-management', '区域配置与需水管理'],
      ['catena', '农田土壤水文过程'],
      ['journal-of-cleaner-production', '资源效率与可持续农业']
    ],
    'international-soil-and-water-conservation-research': [
      ['catena', '侵蚀机理与景观过程'],
      ['land-degradation-development', '退化诊断与修复'],
      ['international-journal-of-sediment-research', '泥沙与水库淤积'],
      ['agricultural-water-management', '农艺节水与保护性耕作']
    ],
    'international-journal-of-sediment-research': [
      ['geomorphology', '河流/海岸地貌演化'],
      ['catena', '坡面侵蚀产沙'],
      ['international-soil-and-water-conservation-research', '流域保持措施'],
      ['journal-of-hydraulic-engineering', '泥沙水力学']
    ],
    'journal-of-environmental-management': [
      ['journal-of-cleaner-production', '清洁生产与循环经济'],
      ['water-research', '水环境风险与处理'],
      ['land-degradation-development', '土地系统管理'],
      ['water-resources-management', '水资源制度与决策']
    ],
    'water-resources-management': [
      ['journal-of-hydrology', '过程水文与预报输入'],
      ['journal-of-flood-risk-management', '洪水风险与管理'],
      ['agricultural-water-management', '农业用水效率'],
      ['hydrology-and-earth-system-sciences', '变化归因与可预测性']
    ],
    'journal-of-cleaner-production': [
      ['journal-of-environmental-management', '环境治理与政策'],
      ['land-degradation-development', '土地可持续管理'],
      ['agricultural-water-management', '农业资源效率'],
      ['water-research', '水系统污染与回用']
    ],
    'land-degradation-development': [
      ['catena', '土壤—地貌过程'],
      ['international-soil-and-water-conservation-research', '保持措施与效益'],
      ['journal-of-environmental-management', '生态系统管理'],
      ['journal-of-cleaner-production', '可持续生产转型']
    ],
    'hydrology-and-earth-system-sciences': [
      ['journal-of-hydrology', '经典水文研究'],
      ['hydrological-processes', '过程水文与观测'],
      ['water-resources-management', '管理与适应性'],
      ['environmental-modelling-software', '建模方法与软件']
    ],
    'journal-of-hydrodynamics': [
      ['journal-of-hydraulic-engineering', 'ASCE 工程水力学'],
      ['international-journal-of-sediment-research', '泥沙起动与输移'],
      ['environmental-modelling-software', 'CFD/数值方法交叉'],
      ['journal-of-flood-risk-management', '防洪工程应用']
    ],
    'hydrological-processes': [
      ['journal-of-hydrology', '更广覆盖的水文综合刊'],
      ['hydrology-and-earth-system-sciences', '地球系统与可讨论研究'],
      ['catena', '坡面与土壤水文过程'],
      ['journal-of-flood-risk-management', '洪水过程与风险应用']
    ],
    'journal-of-flood-risk-management': [
      ['water-resources-management', '水资源与风险管理'],
      ['journal-of-hydrology', '洪水过程与预报输入'],
      ['journal-of-hydraulic-engineering', '防洪工程水力学'],
      ['hydrological-processes', '洪水相关水文过程']
    ],
    'journal-of-hydraulic-engineering': [
      ['journal-of-hydrodynamics', '更偏水动力学机理与 CFD'],
      ['international-journal-of-sediment-research', '泥沙起动与输移'],
      ['journal-of-flood-risk-management', '防洪与洪水工程应用'],
      ['hydrological-processes', '明渠与流域过程背景']
    ],
    'geomorphology': [
      ['catena', '土壤—坡面过程，偏土壤'],
      ['international-journal-of-sediment-research', '河流/海岸泥沙地貌'],
      ['land-degradation-development', '退化与修复的管理向'],
      ['journal-of-hydrology', '水文驱动的地貌过程']
    ]
  };

  var list = RELATED[slug];
  if (!list || !list.length) return;

  var style = document.createElement('style');
  style.textContent = [
    '.rel-section{margin:8px 0 36px}',
    '.rel-head{display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border)}',
    '.rel-head .icon{font-size:1.3rem}',
    '.rel-head h2{font-size:1.3rem;font-weight:700;color:var(--bright);margin:0}',
    '.rel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}',
    '.rel-card{display:block;padding:14px 16px;border-radius:12px;border:1px solid var(--border);background:var(--card);text-decoration:none;color:inherit;transition:.2s}',
    '.rel-card:hover{border-color:rgba(var(--pri-rgb),.4);box-shadow:0 4px 16px rgba(0,0,0,.12)}',
    '.rel-card .title{font-size:.95rem;font-weight:700;color:var(--bright);margin-bottom:4px;line-height:1.35}',
    '.rel-card .meta{font-size:.75rem;color:var(--dim);margin-bottom:8px}',
    '.rel-card .why{font-size:.8rem;color:var(--txt);line-height:1.5;opacity:.9}',
    '.rel-card .tags{margin-top:8px;display:flex;gap:6px;flex-wrap:wrap}',
    '.rel-tag{font-size:.7rem;padding:2px 8px;border-radius:999px;background:rgba(var(--pri-rgb),.12);color:var(--pri2);font-weight:600}',
    '.rel-more{margin-top:12px;font-size:.82rem}',
    '.rel-more a{color:var(--pri2);text-decoration:none}',
    '.rel-more a:hover{text-decoration:underline}'
  ].join('\n');
  document.head.appendChild(style);

  var cards = list.map(function (row) {
    var key = row[0];
    var why = row[1];
    var m = META[key];
    if (!m) return '';
    return (
      '<a class="rel-card" href="' + key + '.html">' +
        '<div class="title">' + m.icon + ' ' + m.name + '</div>' +
        '<div class="meta">IF ' + m.if + ' · ' + m.partition + '</div>' +
        '<div class="why">' + why + '</div>' +
        '<div class="tags"><span class="rel-tag">' + m.partition + '</span></div>' +
      '</a>'
    );
  }).join('');

  var html =
    '<section class="rel-section" id="related">' +
      '<div class="rel-head"><span class="icon">🔗</span><h2>相似期刊</h2></div>' +
      '<div class="rel-grid">' + cards + '</div>' +
      '<p class="rel-more">想并排比较？到 <a href="./">期刊列表</a> 开启「对比」模式，勾选 2–4 本后查看 APC / 审稿周期等。</p>' +
    '</section>';

  var main = document.querySelector('.j-main');
  if (main) {
    main.insertAdjacentHTML('beforeend', html);
  } else {
    var footer = document.querySelector('.j-footer, footer');
    if (footer) footer.insertAdjacentHTML('beforebegin', html);
  }

  var scopeNav = document.querySelector('.nav-link[href="#scope"], .nav-link[data-section="scope"]');
  if (scopeNav && scopeNav.parentNode) {
    var link = document.createElement('a');
    link.className = 'nav-link';
    link.setAttribute('data-section', 'related');
    link.textContent = '🔗 相似期刊';
    if (scopeNav.hasAttribute('href')) {
      link.href = '#related';
    } else {
      link.href = 'javascript:void(0)';
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var el = document.getElementById('related');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }
    scopeNav.parentNode.appendChild(link);
  }
})();
