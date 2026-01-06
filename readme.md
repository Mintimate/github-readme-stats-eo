# GitHub Readme Stats - EdgeOne Pages 版本

GitHub Readme Stats 是一个动态生成 GitHub 统计卡片的工具，现已优化为支持 [腾讯云 EdgeOne Pages](https://pages.edgeone.ai) 部署。

## 项目简介

- **动态统计卡片**：展示 GitHub 数据（如提交次数、PR、Star 等）
- **多种主题**：支持自定义颜色和布局
- **轻松部署**：通过 EdgeOne Pages 快速上线

## 快速开始

### 一键部署

您可以通过 [腾讯云 EdgeOne Pages](https://pages.edgeone.ai/zh) 一键部署。

直接点击此按钮一键部署：

[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?repository-url=https%3A%2F%2Fgithub.com%2FMintimate%2Fgithub-readme-stats-eo)

查看 [腾讯云 EdgeOne Pages 文档](https://pages.edgeone.ai/zh/document/product-introduction) 了解更多详情。

> 注意: 需要设置[环境变量](#获取-github-tokenclassic)，之后再触发部署一次以使变量生效。

### 手动部署

1. **Fork 本仓库**
2. **配置环境变量**：
   - `GITHUB_TOKEN`：GitHub 的个人访问令牌（PAT），获取方式见下方
3. **部署到 EdgeOne Pages**：
   - 参考下方的详细部署步骤

## 当前已知限制

- EdgeOne Pages 入口节点不支持按请求缓存，卡片接口默认会直接回源。建议在自定义域名前再套一层 CDN（如 EdgeOne CDN / Cloudflare）对静态响应做缓存，缓解 GitHub API 速率压力（还有请求次数的限制）。

## 获取 GitHub Token（Classic）

1. 进入 [Account -> Settings -> Developer Settings -> Personal access tokens -> Tokens (classic)](https://github.com/settings/tokens)
2. 点击 `Generate new token -> Generate new token (classic)`
3. 勾选权限：
   - `repo`
   - `read:user`
4. 生成并复制 token（在 EdgeOne Pages 的环境变量中设置 `PAT_1` 等于这个 token 值）

## 部署到 EdgeOne Pages

1. 登录腾讯云 EdgeOne 控制台，创建新的 Pages 项目
2. 选择 GitHub 作为代码源并关联本仓库；或直接下载仓库后在 EdgeOne Pages 手动上传（会自动触发部署）
3. 在项目的环境变量中设置 `PAT_1` 为上一步获取的令牌
4. 由于 EO 会在部署后加载环境变量，设置完成后需要再次触发部署一次以使变量生效

## 示例卡片

将以下代码复制到你的 README 文件中：

```md
![GitHub Stats](https://your-project.edgeone.run/api?username=yourusername)
```
