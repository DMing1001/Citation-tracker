# CiteGlow · Supabase 登录配置步骤

个人用最小流程，大约 10 分钟。

## 1. 创建 Supabase 项目

1. 打开 https://supabase.com 并用 GitHub 登录  
2. New Project → 填名称（如 `citeglow`）→ 选区域（可选 Singapore）→ 设数据库密码  
3. 等待项目就绪

## 2. 执行建表 SQL

1. 左侧 **SQL Editor** → New query  
2. 粘贴并运行本目录下 `schema.sql` 全部内容  
3. 应看到 `Success`

## 3. 打开 GitHub 登录

1. 左侧 **Authentication → Providers → GitHub** → Enable  
2. 另开 https://github.com/settings/developers → **New OAuth App**  
   - Homepage URL: `https://citeglow.com`  
   - Authorization callback URL:  
     `https://YOUR_PROJECT.supabase.co/auth/v1/callback`  
     （在 Supabase GitHub 设置页也会显示同一地址，复制即可）  
3. 把 GitHub 的 Client ID / Client Secret 填回 Supabase 并保存  

本地预览时，把 Homepage 与 callback 的域名也加上：

- Homepage: `http://localhost:5500`（或你实际本地端口）  
- Callback 仍指向 Supabase  

并在 Supabase → **Authentication → URL Configuration**：

- Site URL: `https://citeglow.com`  
- Redirect URLs: 追加 `https://citeglow.com/`、`http://localhost:5500/`

## 4. 把两串配置写进网站

Supabase → **Project Settings → API**：

- Project URL：`https://vbrvfpoqgklezvykmzvn.supabase.co`（若看到 `/rest/v1/` 结尾，去掉路径只留域名）
- Publishable key（前端用）：`sb_publishable_...`  
  **不要**把 `sb_secret_...` 写进网页

编辑 `index.html` 中：

```js
const SUPABASE_URL = 'https://vbrvfpoqgklezvykmzvn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_HUsypDUn_0t3kyVhQZ5nrw_ESfLMZ3P';
```

> publishable / anon key 可公开进前端；secret 切勿写入网页或提交到仓库。

## 5. 使用方式

| 角色 | 行为 |
|---|---|
| 未登录 | 仍用浏览器 localStorage（和现在一样） |
| 点「登录」→ GitHub | 云端保存/读取论文列表 |
| 登录后 | 本地与云端自动合并（按 DOI 去重） |

推送主站后，强刷 https://citeglow.com/ 即可。
