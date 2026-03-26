# ADD_JOURNAL.md — 添加新期刊操作指南

> 本文件记录了在 CiteGlow 期刊投稿板块中添加新期刊的完整流程。
> 下次用户要求添加新期刊时，严格按此流程执行。

## 前置条件
- 用户提供新期刊的 PDF（Guide for Authors）或仅告诉期刊名
- 需要 GitHub PAT token 才能 push（每次用户需提供，用完清除）

## 当前已收录期刊（6 个）
| 期刊 | slug | 配色 | IF | 审稿 | 引用格式 |
|------|------|------|-----|------|---------|
| Journal of Hydrology | journal-of-hydrology | 蓝 #3b82f6 | 6.4 | 单盲 | 编号制 |
| CATENA | catena | 琥珀 #d97706 | 5.4 | 单盲 | 作者-年份 |
| Water Research | water-research | 蓝 #3b82f6 | 12.8 | 单盲 | 编号制 |
| Env. Modelling & Software | environmental-modelling-software | 绿 #059669 | 5.5 | 单盲 | 作者-年份 |
| Agric. Water Management | agricultural-water-management | 琥珀 #d97706 | 6.6 | 单盲 | 作者-年份 |
| ISWCR | international-soil-and-water-conservation-research | 绿 #16a34a | 7.3 | 双盲 | APA 第五版 |

## 步骤

### 1. 提取期刊数据
从用户提供的 PDF 中提取以下信息（优先使用 PDF，网页抓取为备选）：
- 期刊全称、出版商、ISSN、创刊年份
- 影响因子、JCR 分区
- 审稿周期、OA 费用、OA 类型（Hybrid/Gold）
- 审稿制度（单盲/双盲）
- 收稿范围（Aims & Scope）+ 不接受的稿件类型
- 文章类型及字数限制
- 引用格式（编号制 / 作者-年份 / APA）
- 投稿步骤、Cover Letter 要点
- 文件格式、文章结构（各 Section）、特殊格式要求
- 图表规范、数据政策
- 参考文献格式 + 示例
- 伦理政策（利益冲突、AI 声明）
- 实用链接（期刊主页、投稿系统、Guide for Authors）

**PDF 提取工具**: `pymupdf`（fitz），已安装
```bash
python3 -c "
import fitz
doc = fitz.open('/path/to/file.pdf')
for page in doc:
    print(page.get_text())
"
```

### 2. 创建期刊详情页
在 `journals/` 目录下创建 `期刊slug.html`：
- slug 格式：小写英文，用连字符，如 `water-research.html`
- 复制现有模板（任意一个已有的详情页）
- 修改 10 个板块的内容
- 选择配色主题：
  - `--pri` / `--pri2` — 主色调
  - 蓝 #3b82f6（水文）、琥珀 #d97706（土壤）、绿 #059669（生态/环境）、紫 #7c3aed（综合）、青 #0891b2（遥感）、红 #dc2626（灾害）
- 所有页面引用 `theme.css` 和 `theme-toggle.js`（共享文件，不用改）

**页面格式标准**：
- 侧边栏 4 个分组（期刊信息/审稿与投稿/稿件要求/其他）
- Hero 6 项元信息（IF、分区、审稿周期、OA费用、审稿制度、OA类型）
- 节标题 emoji 在 icon span 里，h2 纯文字
- 面包屑格式：`<a href="/journals/">期刊投稿</a> / XXX`

### 3. 更新期刊列表页
编辑 `journals/index.html`，在 `journals` 数组中添加对象：
```js
{
  slug: 'water-research',
  name: 'Water Research',
  icon: '💧',
  publisher: 'Elsevier · IWA',
  issn: '0043-1354',
  badges: ['SCI Q1', 'Elsevier'],
  badgesClass: ['jbadge-q1', 'jbadge-pub'],
  stats: { if: '12.8', partition: 'JCR Q1', review: '2–3 月' },
  keywords: 'water treatment wastewater drinking water ...'
}
```
badge 类型：`jbadge-q1`（SCI Q1）、`jbadge-pub`（Elsevier）、`jbadge-oa`（Gold OA）

### 4. Commit & Push
```bash
cd /root/.openclaw/workspace/Citation-tracker

# 配置 git（如未配置）
git config user.name "DMing1001"
git config user.email "citeglow@users.noreply.github.com"

# 配置远程（需要用户提供的 PAT token）
git remote set-url origin https://DMing1001:TOKEN@github.com/DMing1001/Citation-tracker.git

# 服务器网络优化（必须，否则 push 会超时）
git config http.postBuffer 524288000
git config http.version HTTP/1.1

# 提交推送
git add -A
git commit -m "feat: 添加 XXX 期刊投稿指南"
git push origin main

# ⚠️ 推送完成后立即清除 token
git remote set-url origin https://github.com/DMing1001/Citation-tracker.git
```

### 5. 验证
- 等待 Vercel 自动部署（通常 1-2 分钟）
- 检查 `citeglow.com/journals/` 是否出现新卡片
- 检查详情页链接是否正常
- 检查深色/浅色模式是否都正常

## ⚠️ 注意事项
1. **Gold OA ≠ 免费** — 有些 Gold OA 期刊收 APC，标签用 "Gold OA" 不用 "免费"
2. **不要想当然套 Elsevier 通用模板** — 有些期刊由 KeAi 等出版商出版，格式可能不同（如 APA）
3. **双盲审稿** — 稿件正文中不能含作者信息，作者信息在单独标题页文件中
4. **引用格式要确认** — 编号制 / 作者-年份 / APA 差异很大
5. **ScienceDirect 会 403** — 如果 PDF 下载不了 Guide for Authors，用 LetPub 等替代，但页面要标注待确认项

## 配色主题参考
| 主题变量 | 色值 | 适合 |
|---------|------|------|
| 蓝色 | `--pri:#3b82f6` | 水文、海洋、大气 |
| 琥珀 | `--pri:#d97706` | 土壤、地质、地貌 |
| 绿色 | `--pri:#059669` | 生态、环境、农业 |
| 紫色 | `--pri:#7c3aed` | 综合、地球科学 |
| 青色 | `--pri:#0891b2` | 遥感、GIS |
| 红色 | `--pri:#dc2626` | 灾害、风险 |
