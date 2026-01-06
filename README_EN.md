# GitHub Readme Stats - EdgeOne Pages Edition

English | [简体中文](README.md)

This project is based on the core code of [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats), adapted for deployment on [Tencent EdgeOne Pages](https://pages.edgeone.ai).

The original project is deployed on Vercel. This version is specifically optimized for EdgeOne Pages Node Functions environment, providing the same API interfaces and features.

## Features

- **Dynamic Statistics Cards**: Display GitHub data (commits, PRs, stars, etc.)
- **Multiple Themes**: Support for custom colors and layouts
- **EdgeOne Pages Optimized**: Perfectly adapted for EdgeOne Pages deployment environment
- **Original API Compatible**: Maintains the same query parameters and usage as the original project

## Quick Start

### One-Click Deploy

You can deploy via [Tencent EdgeOne Pages](https://pages.edgeone.ai/en) with one click.

Click the button below to deploy:

[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?repository-url=https%3A%2F%2Fgithub.com%2FMintimate%2Fgithub-readme-stats-eo)

See [Tencent EdgeOne Pages Documentation](https://pages.edgeone.ai/en/document/product-introduction) for more details.

> **Note**: You need to set the `PAT_1` environment variable. See [Environment Variables](#environment-variables). After changing environment variables, you need to trigger a new deployment for the changes to take effect.

### Manual Deployment

1. **Fork this repository**
2. **Configure environment variables** (see [Environment Variables](#environment-variables) below)
3. **Deploy to EdgeOne Pages**:
   - Follow the detailed deployment steps below

## Environment Variables

This project requires the following environment variables to be configured in EdgeOne Pages:

### Required Variables

- **`PAT_1`**: GitHub Personal Access Token
  - Used to call GitHub API to fetch user statistics
  - See [Get GitHub Token](#get-github-token-classic) below for how to obtain
  - Supports multiple tokens (`PAT_1`, `PAT_2`, `PAT_3`, etc.) to increase rate limits

### Optional Variables

- **`PREFERRED_ORIGIN`**: Custom domain prefix
  - Used for API example URLs displayed on the homepage
  - Example: `https://github-readme-stats.mintimate.cn`
  - If not set, will automatically use the current access domain
- Other environment variables from the original project: [Original Project Documentation](https://github.com/anuraghazra/github-readme-stats#customization)

> **Note**: EdgeOne Pages loads environment variables after deployment. After changing environment variables, you need to trigger a new deployment for the changes to take effect.

## Known Limitations

EdgeOne Pages entry nodes do not support per-request caching, and card API requests will go directly to the origin by default. It is recommended to add another layer of CDN (such as EdgeOne CDN / Cloudflare) in front of your custom domain to cache static responses, reducing GitHub API rate pressure (and request count limits).

For example: I use EdgeOne site acceleration with EdgeOne Pages to achieve caching:

![Configure origin site as EdgeOne Pages](./docs/static/CdnOriginToCdnConfig.webp)

Corresponding cache rules:

![Configured origin rules](./docs/static/OriginRulesConfig.webp)

## Get GitHub Token (Classic)

1. Go to [Account -> Settings -> Developer Settings -> Personal access tokens -> Tokens (classic)](https://github.com/settings/tokens)
2. Click `Generate new token -> Generate new token (classic)`
3. Check the required permissions:
   - `repo`
   - `read:user`
4. Generate and copy the token (set `PAT_1` equal to this token value in EdgeOne Pages environment variables)

## Deploy to EdgeOne Pages

1. Log in to Tencent EdgeOne console and create a new Pages project
2. Select GitHub as the code source and link this repository; or directly download the repository and manually upload to EdgeOne Pages (will automatically trigger deployment)
3. Set `PAT_1` to the GitHub Token obtained in the previous step in the project's environment variables
4. (Optional) Set `PREFERRED_ORIGIN` environment variable to customize the URL prefix displayed on the homepage
5. Since EdgeOne Pages loads environment variables after deployment, you need to trigger another deployment after configuration for the variables to take effect

## Usage

After deployment, visit your EdgeOne Pages domain to see the usage documentation. The API interfaces are fully compatible with the original project.

### Available Endpoints

- `/api` - GitHub Stats Card
- `/api/top-langs` - Top Languages Card
- `/api/pin` - Repository Pin Card
- `/api/gist` - Gist Card
- `/api/wakatime` - WakaTime Stats Card

For detailed parameters, please refer to the [original project documentation](https://github.com/anuraghazra/github-readme-stats/blob/master/readme.md).

## Example Cards

Copy the following code to your README file (replace with your domain and username):

```md
![GitHub Stats](https://your-project.pages.dev/api?username=yourusername&show_icons=true)
![Top Languages](https://your-project.pages.dev/api/top-langs?username=yourusername&layout=compact)
```

For more styling and parameter configurations (environment variables), please refer to the [original project documentation](https://github.com/anuraghazra/github-readme-stats#customization).

## Related Links

- [Original Repository](https://github.com/anuraghazra/github-readme-stats) - anuraghazra/github-readme-stats
- [EdgeOne Pages Documentation](https://pages.edgeone.ai/en/document/product-introduction)
- [EdgeOne Pages Console](https://console.cloud.tencent.com/edgeone/pages)

## License

This project is open-sourced under the MIT license based on the original project. See [LICENSE](LICENSE) file for details.
