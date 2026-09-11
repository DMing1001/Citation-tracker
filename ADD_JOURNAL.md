# ADD_JOURNAL.md — 添加新期刊操作指南

> 本文件记录了在 CiteGlow 期刊投稿板块中添加新期刊的完整流程。
> 下次用户要求添加新期刊时，严格按此流程执行。

## 前置条件
- 用户提供新期刊的 PDF（Guide for Authors）或仅告诉期刊名
- GitHub 凭据见本地 `CREDENTIALS.local.md`（勿提交、勿分享）

## 当前已收录期刊（13 个，2026-09-10）

| 期刊 | slug | 配色 | IF | 分区 | APC | OA |
|------|------|------|-----|------|-----|-----|
| Journal of Hydrology | journal-of-hydrology | 蓝 #3b82f6 | 6.4 | Q1 | $3,390 | Hybrid |
| CATENA | catena | 琥珀 #d97706 | 5.4 | Q1 | $3,150 | 订阅 |
| Water Research | water-research | 蓝 #3b82f6 | 12.8 | Q1 | $3,500 | Hybrid |
| Env. Modelling & Software | environmental-modelling-software | 绿 #059669 | 5.5 | Q1 | $2,650 | 订阅 |
| Agric. Water Management | agricultural-water-management | 琥珀 #d97706 | 6.6 | Q1 | $3,200 | 订阅 |
| ISWCR | international-soil-and-water-conservation-research | 绿 #16a34a | 7.3 | Q1 | $2,000 | Gold OA |
| Int. J. Sediment Research | international-journal-of-sediment-research | 青 #0891b2 | 3.8 | Q2 | $1,400 | Gold OA |
| J. Environmental Management | journal-of-environmental-management | 绿 #059669 | 8.0 | Q1 | $3,500 | Hybrid |
| Water Resources Management | water-resources-management | 蓝 #2563eb | 4.7 | Q1 | $2,990 | Hybrid |
| J. Cleaner Production | journal-of-cleaner-production | 紫 #7c3aed | 9.8 | Q1 | $3,490 | Hybrid |
| Land Degradation & Dev. | land-degradation-development | 琥珀 #d97706 | 3.7 | Q2 | ~$3,300 | Hybrid |
| HESS | hydrology-and-earth-system-sciences | 蓝 #3b82f6 | 5.8 | Q1 | €1,800 | Gold OA |
| J. Hydrodynamics | journal-of-hydrodynamics | 蓝 | 3.5 | Q1 | ¥600/页 | Hybrid |

## 共享资源（优先复用，勿再整页内嵌 CSS）

| 文件 | 用途 |
|------|------|
| `theme.css` | 深色/浅色主题变量与组件适配 |
| `journals.css` | 详情页公共布局（topnav/hero/sidebar/section/table） |
| `theme-toggle.js` | 主题切换按钮 |
| `checklist.js` | 投稿清单可勾选 + localStorage |
| `related.js` | 详情页「相似期刊」推荐（维护 RELATED 表） |
| `feedback.js` | 列表页反馈浮窗 |

新详情页只需：
1. `<link>` theme.css + journals.css
2. 内嵌 `<style>` 只写 `:root` 主题色（含 `--pri` / `--pri2` / `--pri-rgb` / `--border`）
3. 正文 HTML 按现有模板填 10 个板块
4. 末尾 `<script src="checklist.js"></script>` + `<script src="related.js"></script>` + `<script src="theme-toggle.js"></script>`
5. 在 `related.js` 的 `META` 与 `RELATED` 中登记新刊及 3–4 本相似刊

## 步骤

### 1. 提取期刊数据
从用户提供的 PDF 中提取（PDF 优先，网页抓取备选）：
- 全称、出版商、ISSN、创刊年
- IF、JCR 分区、审稿周期、APC、OA 类型（Hybrid/Gold/订阅）
- 审稿制度（单盲/双盲）
- 收稿范围 + 不接受类型
- **适合什么稿 / 常见拒稿点**（本刊专属，见 `id="fit"` 区块）
- 文章类型及字数限制
- 引用格式（编号制 / 作者-年份 / APA）
- 投稿步骤、Cover Letter 要点
- 图表规范、数据政策、伦理政策
- 官方链接

**PDF 提取**：`pymupdf`（fitz）

```powershell
$env:MIMO_PYTHON -c "import fitz; d=fitz.open(r'path.pdf'); print('\n'.join(p.get_text() for p in d))"
```

### 2. 创建期刊详情页
`journals/<slug>.html`：
- slug：小写英文连字符
- 复制任一标准详情页作骨架（勿复制 hydrodynamics，结构不同）
- 内嵌 style 只保留 `:root` 主题色
- 面包屑：`<a href="/journals/">期刊投稿</a> / XXX`
- Hero 6 项：IF、分区、审稿周期、APC、审稿制度、OA 类型
- 侧栏与正文须含 `id="fit"`「适合什么稿」：适合 3–5 条 + 拒稿/不匹配 3–5 条
- 页脚写「资料整理于 YYYY-MM-DD · 费用与审稿周期请以官网为准」

### 3. 更新列表页 `journals/index.html`
在 `journals` 数组追加对象（字段齐全，筛选与对比依赖它们）：

```js
{
  slug: 'xxx',
  name: 'Journal Name',
  icon: '🌊',
  publisher: 'Elsevier',
  publisherKey: 'elsevier', // elsevier | springer | wiley | other
  issn: '0000-0000',
  partition: 'Q1',          // Q1 | Q2
  oa: 'hybrid',             // gold | hybrid | subscription
  apc: '$3,000',
  reviewType: '单盲',       // 单盲 | 双盲 | 公开评审
  badges: ['SCI Q1', 'Elsevier'],
  badgesClass: ['jbadge-q1', 'jbadge-pub'],
  stats: { if: '6.4', partition: 'JCR Q1', review: '2–4 月' },
  keywords: '...'
}
```

### 4. Commit & Push
```powershell
cd "E:\MIMO\网页运行开发\workspace\Citation-tracker"
# remote 已带 token（见 CREDENTIALS.local.md）
git add journals/
git commit -m "feat: 添加 XXX 期刊投稿指南"
git push origin main
```

推送走代理 `http://127.0.0.1:9567`（仓库 config 已配）。

### 5. 验证
- 等 Vercel 部署 1–2 分钟
- 检查 `citeglow.com/journals/` 卡片、筛选、对比
- 详情页深浅色、checklist 勾选

## 注意事项
1. **Gold OA ≠ 免费** — 标签用 "Gold OA"，不要写“免费”
2. **不要想当然套 Elsevier 通用模板** — KeAi 等格式可能不同
3. **双盲** — 正文无作者信息，标题页单独文件
4. **APC 只出现一处** — Hero 与概览必须一致；列表 `apc` 字段同步
5. **ScienceDirect 403** — 用 LetPub 等替代，页面标注待确认
6. **禁止整页内嵌大 CSS** — 用 journals.css，只写 :root 色

## 配色主题
| 主题 | `--pri` | `--pri-rgb` | 适合 |
|------|---------|-------------|------|
| 蓝色 | `#3b82f6` | `59,130,246` | 水文、海洋、大气 |
| 琥珀 | `#d97706` | `217,119,6` | 土壤、地质、地貌 |
| 绿色 | `#059669` | `5,150,105` | 生态、环境、农业 |
| 紫色 | `#7c3aed` | `124,58,237` | 综合、地球科学 |
| 青色 | `#0891b2` | `8,145,178` | 遥感、GIS |
| 红色 | `#dc2626` | `220,38,38` | 灾害、风险 |
